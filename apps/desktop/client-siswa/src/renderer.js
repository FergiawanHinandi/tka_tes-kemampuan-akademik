const { io } = require('socket.io-client');
const { ipcRenderer } = require('electron');
const Dexie = require('dexie');

// Initialize IndexedDB
const db = new Dexie('ExamDB');
db.version(1).stores({
  answers: 'questionId, studentId, answer, synced'
});

// Listen for security alerts from main process
ipcRenderer.on('security-alert', (event, data) => {
  console.warn('Security Alert:', data.activity);
  
  // Show overlay alert to student
  const alertDiv = document.createElement('div');
  alertDiv.className = 'fixed inset-0 bg-red-600/90 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center text-center p-12';
  alertDiv.innerHTML = `
    <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    </div>
    <h1 class="text-4xl font-black mb-4">PELANGGARAN TERDETEKSI</h1>
    <p class="text-xl font-bold text-red-100 max-w-2xl leading-relaxed">${data.activity}</p>
    <p class="mt-8 text-sm font-black uppercase tracking-[0.3em] opacity-50">Aktivitas ini telah dicatat dan dilaporkan ke Proktor</p>
  `;
  document.body.appendChild(alertDiv);

  // Send to server
  socket.emit('auditLog', {
    type: data.type,
    activity: data.activity,
    studentId: 'STUDENT-001' // In production, use real student ID
  });
});

// Listen for Announcements from Proctor
socket.on('announcement', (data) => {
  const notifContainer = document.getElementById('notifContainer') || createNotifContainer();
  const notif = document.createElement('div');
  const bgColor = data.type === 'URGENT' ? 'bg-red-600' : data.type === 'WARNING' ? 'bg-orange-500' : 'bg-blue-600';
  
  notif.className = `${bgColor} text-white p-6 rounded-2xl shadow-2xl mb-4 animate-in slide-in-from-right-full duration-500 flex items-start gap-4 border border-white/20`;
  notif.innerHTML = `
    <div class="p-2 bg-white/20 rounded-xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
    </div>
    <div class="flex-1">
      <p class="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">PENGUMUMAN ${data.type}</p>
      <p class="text-sm font-bold leading-relaxed">${data.message}</p>
    </div>
    <button class="p-1 hover:bg-white/10 rounded-lg transition-colors" onclick="this.parentElement.remove()">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  `;
  notifContainer.appendChild(notif);
  
  // Auto remove after 10 seconds if not urgent
  if (data.type !== 'URGENT') {
    setTimeout(() => notif.remove(), 10000);
  }
});

function createNotifContainer() {
  const container = document.createElement('div');
  container.id = 'notifContainer';
  container.className = 'fixed top-20 right-8 w-96 z-[100] flex flex-col pointer-events-none children:pointer-events-auto';
  document.body.appendChild(container);
  return container;
}

const mockQuestions = [
  { id: '1', number: '01', text: 'Siapakah penemu lampu pijar?', options: ['Thomas Alva Edison', 'Nikola Tesla', 'Albert Einstein', 'Isaac Newton'], answer: 'A' },
  { id: '2', number: '02', text: 'Berapakah hasil dari 15 x 4?', options: ['45', '60', '75', '90'], answer: 'B' },
  { id: '3', number: '03', text: 'Ibu kota negara Indonesia adalah?', options: ['Bandung', 'Surabaya', 'Jakarta', 'Medan'], answer: 'C' }
];

let currentQuestionIndex = 0;
let studentAnswers = {}; // questionId -> answer
let isOnline = true;

// DOM Elements
const questionNumberEl = document.getElementById('questionNumber');
const questionTextEl = document.getElementById('questionText');
const optionsContainerEl = document.getElementById('optionsContainer');
const studentNameEl = document.getElementById('studentName');
const timerEl = document.getElementById('timer');
const connectionStatusEl = document.getElementById('connectionStatus');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Initialize Socket.io
const socket = io('http://localhost:3000/exam', {
  reconnectionAttempts: 5,
  timeout: 10000,
});

window.socket = socket;

// Sync Offline Answers
async function syncOfflineAnswers() {
  const offlineAnswers = await db.answers.where('synced').equals(0).toArray();
  if (offlineAnswers.length > 0) {
    console.log(`Syncing ${offlineAnswers.length} offline answers...`);
    for (const ans of offlineAnswers) {
      socket.emit('submitAnswer', {
        studentId: ans.studentId,
        questionId: ans.questionId,
        answer: ans.answer
      });
      await db.answers.update(ans.questionId, { synced: 1 });
    }
  }
}

socket.on('connect', () => {
  isOnline = true;
  console.log('Connected to server');
  updateConnectionStatus();
  syncOfflineAnswers();
  
  socket.emit('joinExam', { 
    studentId: 'STUDENT-001', 
    examSessionId: 'SESSION-001' 
  });
});

socket.on('disconnect', () => {
  isOnline = false;
  console.warn('Disconnected from server');
  updateConnectionStatus();
});

function updateConnectionStatus() {
  if (isOnline) {
    connectionStatusEl.innerHTML = '<span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> TERHUBUNG KE SERVER';
    connectionStatusEl.className = 'text-[10px] font-black uppercase tracking-tighter text-emerald-500 flex items-center gap-1 justify-end';
  } else {
    connectionStatusEl.innerHTML = '<span class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span> MODE OFFLINE (TERSIPAN LOKAL)';
    connectionStatusEl.className = 'text-[10px] font-black uppercase tracking-tighter text-amber-500 flex items-center gap-1 justify-end';
  }
}

// Rendering Logic
function renderQuestion(index) {
  const q = mockQuestions[index];
  questionNumberEl.textContent = q.number + '.';
  questionTextEl.textContent = q.text;
  
  optionsContainerEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const label = String.fromCharCode(65 + i); // A, B, C, D
    const isSelected = studentAnswers[q.id] === label;
    
    const btn = document.createElement('button');
    btn.className = `w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all active:scale-[0.98] group ${
      isSelected 
        ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' 
        : 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-700'
    }`;
    
    btn.innerHTML = `
      <div class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
        isSelected ? 'bg-white text-blue-600' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'
      }">${label}</div>
      <span class="text-lg font-medium ${isSelected ? 'text-white' : 'text-slate-300'}">${opt}</span>
    `;
    
    btn.onclick = () => selectAnswer(q.id, label);
    optionsContainerEl.appendChild(btn);
  });

  // Update nav buttons
  prevBtn.disabled = index === 0;
  if (index === mockQuestions.length - 1) {
    nextBtn.innerHTML = 'SELESAI UJIAN <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
  } else {
    nextBtn.innerHTML = 'SELANJUTNYA <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
  }
}

async function selectAnswer(questionId, answer) {
  studentAnswers[questionId] = answer;
  renderQuestion(currentQuestionIndex);
  
  // 1. Save to Local Cache (IndexedDB)
  await db.answers.put({
    questionId,
    studentId: 'STUDENT-001',
    answer,
    synced: isOnline ? 1 : 0
  });

  // 2. Real-time Save via WebSocket if online
  if (isOnline) {
    socket.emit('submitAnswer', {
      studentId: 'STUDENT-001',
      questionId: questionId,
      answer: answer
    });
  }
}

// Load local answers on startup
async function loadLocalAnswers() {
  const localAnswers = await db.answers.toArray();
  localAnswers.forEach(ans => {
    studentAnswers[ans.questionId] = ans.answer;
  });
  renderQuestion(0);
}

// Event Listeners
nextBtn.onclick = () => {
  if (currentQuestionIndex < mockQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion(currentQuestionIndex);
  } else {
    if (confirm('Apakah Anda yakin ingin menyelesaikan ujian?')) {
      alert('Ujian Selesai! Terima kasih.');
    }
  }
};

prevBtn.onclick = () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion(currentQuestionIndex);
  }
};

// Initial Load
studentNameEl.textContent = 'AHMAD KHAIRUL (NISN: 00928172)';
loadLocalAnswers();
