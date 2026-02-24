const { io } = require('socket.io-client');

// Mock Data
const mockStudents = Array.from({ length: 20 }, (_, i) => ({
  id: `STUDENT-${i + 1}`,
  name: `Siswa Ke-${i + 1}`,
  nisn: `0092817${i}`,
  status: Math.random() > 0.1 ? 'ONLINE' : 'OFFLINE',
  progress: Math.floor(Math.random() * 100)
}));

const studentGrid = document.getElementById('studentGrid');
const alertContainer = document.getElementById('alertContainer');
const broadcastBtn = document.getElementById('broadcastBtn');

// Initialize Socket.io
const socket = io('http://localhost:3000/exam');

socket.on('connect', () => {
  console.log('Proctor connected to server');
});

// Listen for security alerts from students
socket.on('proctorAlert', (data) => {
  console.log('Alert received:', data);
  showToast(data);
});

function renderGrid() {
  studentGrid.innerHTML = '';
  mockStudents.forEach(student => {
    const card = document.createElement('div');
    card.className = `bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden`;
    card.innerHTML = `
      <div class="flex items-start justify-between mb-4">
        <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <span class="text-[10px] font-black px-2 py-1 rounded-lg ${student.status === 'ONLINE' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}">
          ${student.status}
        </span>
      </div>
      <h3 class="font-black text-sm text-slate-800 truncate">${student.name}</h3>
      <p class="text-[10px] font-bold text-slate-400 mb-4">${student.nisn}</p>
      
      <div class="space-y-2">
        <div class="flex justify-between text-[10px] font-black">
          <span class="text-slate-400">PROGRESS</span>
          <span class="text-slate-900">${student.progress}%</span>
        </div>
        <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-orange-500 rounded-full" style="width: ${student.progress}%"></div>
        </div>
      </div>
    `;
    studentGrid.appendChild(card);
  });
}

function showToast(data) {
  const toast = document.createElement('div');
  toast.className = 'bg-red-600 text-white p-5 rounded-2xl shadow-2xl flex items-start gap-4 border border-white/10 animate-in slide-in-from-right-full duration-300';
  toast.innerHTML = `
    <div class="p-2 bg-white/20 rounded-xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    </div>
    <div class="flex-1">
      <p class="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">SECURITY ALERT - ${data.studentId}</p>
      <p class="text-xs font-bold leading-relaxed">${data.activity}</p>
    </div>
    <button class="p-1 hover:bg-white/10 rounded-lg transition-colors" onclick="this.parentElement.remove()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  `;
  alertContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 15000);
}

broadcastBtn.onclick = () => {
  const msg = prompt('Masukkan pesan untuk seluruh siswa:');
  if (msg) {
    socket.emit('broadcastAnnouncement', {
      sessionId: 'SESSION-001',
      message: msg,
      type: 'INFO'
    });
    alert('Pesan telah disiarkan.');
  }
};

renderGrid();
setInterval(renderGrid, 10000); // Re-render simulation every 10s
