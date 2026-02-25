const { io } = require('socket.io-client');
const { ipcRenderer } = require('electron');
const Dexie = require('dexie');
const {
  computeIsOnline,
  computeRemainingTimeAfterRestore,
  resolveSyncBadge,
} = require('./offline-mode.logic');

const STUDENT_ID = 'STUDENT-001';
const EXAM_SESSION_ID = 'SESSION-001';
const EXAM_STATE_KEY = `${STUDENT_ID}:${EXAM_SESSION_ID}:state`;
const EXAM_STATE_FALLBACK_KEY = `${EXAM_STATE_KEY}:fallback`;
const EXAM_DURATION_SECONDS = 2 * 60 * 60;
const TIMER_SNAPSHOT_INTERVAL_SECONDS = 5;
const SYNC_POLL_INTERVAL_MS = 5000;

const fallbackQuestions = [
  {
    id: '1',
    number: '01',
    text: 'Siapakah penemu lampu pijar?',
    options: ['Thomas Alva Edison', 'Nikola Tesla', 'Albert Einstein', 'Isaac Newton'],
  },
  {
    id: '2',
    number: '02',
    text: 'Berapakah hasil dari 15 x 4?',
    options: ['45', '60', '75', '90'],
  },
  {
    id: '3',
    number: '03',
    text: 'Ibu kota negara Indonesia adalah?',
    options: ['Bandung', 'Surabaya', 'Jakarta', 'Medan'],
  },
];

const db = new Dexie('ExamDB');
db.version(2).stores({
  answers: 'questionId,studentId,sessionId,synced,updatedAt,[studentId+sessionId]',
  syncQueue: '++id,answerId,questionId,sessionId,nextRetryAt,retryCount,[studentId+sessionId]',
  examState: '&key,updatedAt',
  questionCache: '&id,sessionId,updatedAt',
});

let questions = [];
let currentQuestionIndex = 0;
let studentAnswers = {};
let isOnline = false;
let isSocketConnected = false;
let syncInProgress = false;
let heartbeatTimer = null;
let lastSyncAt = null;
let remainingTimeSeconds = EXAM_DURATION_SECONDS;
let timerTick = null;
let syncPollTimer = null;

const questionNumberEl = document.getElementById('questionNumber');
const questionTextEl = document.getElementById('questionText');
const optionsContainerEl = document.getElementById('optionsContainer');
const questionNavEl = document.getElementById('questionNav');
const studentNameEl = document.getElementById('studentName');
const timerEl = document.getElementById('timer');
const connectionStatusEl = document.getElementById('connectionStatus');
const syncStatusEl = document.getElementById('syncStatus');
const syncStatusBadgeEl = document.getElementById('syncStatusBadge');
const offlineBannerEl = document.getElementById('offlineBanner');
const manualSyncBtn = document.getElementById('manualSyncBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

const socket = io('http://localhost:3000/exam', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 8000,
  timeout: 10000,
});

window.socket = socket;

function now() {
  return Date.now();
}

function formatDuration(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = Math.floor(safeSeconds % 60);
  const pad = (value) => String(value).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function renderTimer() {
  if (!timerEl) {
    return;
  }

  timerEl.textContent = `SISA WAKTU: ${formatDuration(remainingTimeSeconds)}`;

  if (remainingTimeSeconds <= 300) {
    timerEl.classList.remove('text-orange-500');
    timerEl.classList.add('text-red-500');
    return;
  }

  timerEl.classList.remove('text-red-500');
  timerEl.classList.add('text-orange-500');
}

function stopExamTimer() {
  if (!timerTick) {
    return;
  }

  clearInterval(timerTick);
  timerTick = null;
}

function startExamTimer() {
  stopExamTimer();
  renderTimer();

  timerTick = setInterval(() => {
    if (remainingTimeSeconds <= 0) {
      stopExamTimer();
      return;
    }

    remainingTimeSeconds = Math.max(0, remainingTimeSeconds - 1);
    renderTimer();

    if (
      remainingTimeSeconds === 0 ||
      remainingTimeSeconds % TIMER_SNAPSHOT_INTERVAL_SECONDS === 0
    ) {
      void persistExamState();
    }
  }, 1000);
}

function setSyncBadge(label, tone) {
  if (!syncStatusBadgeEl) {
    return;
  }

  const toneClass = {
    success: 'text-emerald-200 bg-emerald-500/20 border-emerald-500/50',
    warning: 'text-amber-200 bg-amber-500/20 border-amber-500/50',
    processing: 'text-blue-200 bg-blue-500/20 border-blue-500/50',
  };

  syncStatusBadgeEl.textContent = label;
  syncStatusBadgeEl.className = `px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider ${
    toneClass[tone] || toneClass.warning
  }`;
}

function updateOfflineBanner() {
  if (!offlineBannerEl) {
    return;
  }

  if (isOnline) {
    offlineBannerEl.classList.add('hidden');
    offlineBannerEl.classList.remove('flex');
    return;
  }

  offlineBannerEl.classList.remove('hidden');
  offlineBannerEl.classList.add('flex');
}

function createNotifContainer() {
  const container = document.createElement('div');
  container.id = 'notifContainer';
  container.className = 'fixed top-24 right-8 w-96 z-[100] flex flex-col pointer-events-none';
  document.body.appendChild(container);
  return container;
}

function createNotificationCard(data) {
  const notif = document.createElement('div');
  const bgColor =
    data.type === 'URGENT'
      ? 'bg-red-600'
      : data.type === 'WARNING'
      ? 'bg-orange-500'
      : 'bg-blue-600';

  notif.className = `${bgColor} text-white p-6 rounded-2xl shadow-2xl mb-4 animate-in slide-in-from-right-full duration-500 flex items-start gap-4 border border-white/20 pointer-events-auto`;
  notif.innerHTML = `
    <div class="p-2 bg-white/20 rounded-xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
    </div>
    <div class="flex-1">
      <p class="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">PENGUMUMAN ${data.type || 'INFO'}</p>
      <p class="text-sm font-bold leading-relaxed">${data.message}</p>
    </div>
    <button class="p-1 hover:bg-white/10 rounded-lg transition-colors" onclick="this.parentElement.remove()">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  `;

  return notif;
}

async function cacheQuestions(questionList) {
  const cachePayload = questionList.map((item) => ({
    id: `${EXAM_SESSION_ID}:${item.id}`,
    sessionId: EXAM_SESSION_ID,
    payload: item,
    updatedAt: now(),
  }));

  await db.questionCache.bulkPut(cachePayload);
}

async function loadQuestions() {
  const cachedQuestions = await db.questionCache
    .where('sessionId')
    .equals(EXAM_SESSION_ID)
    .toArray();

  if (cachedQuestions.length > 0) {
    questions = cachedQuestions
      .map((item) => item.payload)
      .sort((a, b) => Number(a.number) - Number(b.number));
    return;
  }

  questions = [...fallbackQuestions];
  await cacheQuestions(questions);
}

async function restoreExamState() {
  const state = await db.examState.get(EXAM_STATE_KEY);
  let stateValue = state?.value || null;

  if (!stateValue) {
    const fallbackState = localStorage.getItem(EXAM_STATE_FALLBACK_KEY);
    if (fallbackState) {
      try {
        stateValue = JSON.parse(fallbackState);
      } catch (error) {
        console.warn('Gagal membaca fallback exam state dari localStorage:', error);
      }
    }
  }

  if (!stateValue) {
    renderTimer();
    return;
  }

  const persistedIndex = Number(stateValue.currentQuestionIndex || 0);
  currentQuestionIndex = Number.isNaN(persistedIndex)
    ? 0
    : Math.min(Math.max(persistedIndex, 0), Math.max(questions.length - 1, 0));
  lastSyncAt = stateValue.lastSyncAt || null;

  const persistedRemainingTime = Number(stateValue.remainingTimeSeconds);
  if (!Number.isNaN(persistedRemainingTime) && persistedRemainingTime >= 0) {
    remainingTimeSeconds = computeRemainingTimeAfterRestore({
      persistedRemainingTime,
      timerSnapshotAt: Number(stateValue.timerSnapshotAt || state?.updatedAt || now()),
      currentTime: now(),
      defaultDurationSeconds: EXAM_DURATION_SECONDS,
    });
  }

  renderTimer();
}

async function persistExamState() {
  const timerSnapshotAt = now();
  const stateValue = {
    currentQuestionIndex,
    answerCount: Object.keys(studentAnswers).length,
    lastSyncAt,
    remainingTimeSeconds,
    timerSnapshotAt,
  };

  await db.examState.put({
    key: EXAM_STATE_KEY,
    value: stateValue,
    updatedAt: timerSnapshotAt,
  });

  localStorage.setItem(EXAM_STATE_FALLBACK_KEY, JSON.stringify(stateValue));
}

async function loadLocalAnswers() {
  const records = await db.answers
    .where('[studentId+sessionId]')
    .equals([STUDENT_ID, EXAM_SESSION_ID])
    .toArray();

  studentAnswers = {};
  records.forEach((record) => {
    studentAnswers[record.questionId] = record.answer;
  });
}

async function queueAnswerForSync(answerRecord) {
  const existingQueueItem = await db.syncQueue
    .where('answerId')
    .equals(answerRecord.questionId)
    .first();
  if (existingQueueItem) {
    await db.syncQueue.update(existingQueueItem.id, {
      answer: answerRecord.answer,
      retryCount: 0,
      nextRetryAt: 0,
      updatedAt: now(),
    });
  } else {
    await db.syncQueue.add({
      answerId: answerRecord.questionId,
      questionId: answerRecord.questionId,
      answer: answerRecord.answer,
      studentId: answerRecord.studentId,
      sessionId: answerRecord.sessionId,
      retryCount: 0,
      nextRetryAt: 0,
      createdAt: now(),
      updatedAt: now(),
    });
  }
}

function emitAnswerWithAck(payload) {
  return new Promise((resolve) => {
    let completed = false;

    const timeout = setTimeout(() => {
      if (!completed) {
        completed = true;
        resolve(false);
      }
    }, 4000);

    socket.timeout(3500).emit(
      'submitAnswer',
      {
        studentId: payload.studentId,
        questionId: payload.questionId,
        answer: payload.answer,
      },
      (err) => {
        if (completed) {
          return;
        }
        clearTimeout(timeout);
        completed = true;
        resolve(!err);
      },
    );
  });
}

async function processSyncQueue({ force = false } = {}) {
  if (!isOnline || syncInProgress) {
    await updateSyncStatus();
    return;
  }

  syncInProgress = true;
  try {
    const queueItems = await db.syncQueue
      .where('[studentId+sessionId]')
      .equals([STUDENT_ID, EXAM_SESSION_ID])
      .sortBy('id');

    const currentTime = now();
    for (const item of queueItems) {
      if (!force && item.nextRetryAt > currentTime) {
        continue;
      }

      const delivered = await emitAnswerWithAck(item);
      if (delivered) {
        await db.answers.update(item.answerId, {
          synced: 1,
          syncedAt: currentTime,
          updatedAt: currentTime,
        });
        await db.syncQueue.delete(item.id);
        lastSyncAt = new Date().toISOString();
      } else {
        const retryCount = (item.retryCount || 0) + 1;
        const delay = Math.min(60000, 1000 * 2 ** retryCount);
        await db.syncQueue.update(item.id, {
          retryCount,
          nextRetryAt: currentTime + delay,
          updatedAt: currentTime,
        });
      }
    }

    await persistExamState();
  } finally {
    syncInProgress = false;
    await updateSyncStatus();
  }
}

function updateConnectionStatus() {
  const pendingText = Object.keys(studentAnswers).length;

  if (isOnline) {
    connectionStatusEl.innerHTML = `<span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> ONLINE | ${pendingText} JAWABAN TERSIMPAN`;
    connectionStatusEl.className =
      'text-[10px] font-black uppercase tracking-tighter text-emerald-500 flex items-center gap-1 justify-end';
    return;
  }

  connectionStatusEl.innerHTML =
    '<span class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span> MODE OFFLINE | CACHE LOKAL AKTIF';
  connectionStatusEl.className =
    'text-[10px] font-black uppercase tracking-tighter text-amber-500 flex items-center gap-1 justify-end';
}

async function updateSyncStatus() {
  const pending = await db.syncQueue
    .where('[studentId+sessionId]')
    .equals([STUDENT_ID, EXAM_SESSION_ID])
    .count();
  const syncText = lastSyncAt
    ? `Sinkron terakhir: ${new Date(lastSyncAt).toLocaleTimeString('id-ID')}`
    : 'Sinkron terakhir: belum pernah';

  if (syncInProgress) {
    const syncBadge = resolveSyncBadge({
      syncInProgress,
      pendingQueue: pending,
    });
    setSyncBadge(syncBadge.label, syncBadge.tone);
    syncStatusEl.textContent = `Sinkronisasi sedang berjalan... ${pending} antrean`;
    return;
  }

  const syncBadge = resolveSyncBadge({
    syncInProgress,
    pendingQueue: pending,
  });
  setSyncBadge(syncBadge.label, syncBadge.tone);

  syncStatusEl.textContent = `${syncText} | Antrean lokal: ${pending}`;
}

function renderQuestionNav() {
  questionNavEl.innerHTML = '';

  questions.forEach((q, index) => {
    const isActive = index === currentQuestionIndex;
    const isAnswered = Boolean(studentAnswers[q.id]);
    const button = document.createElement('button');

    button.className = `h-10 rounded-xl font-black text-xs border transition-all active:scale-95 ${
      isActive
        ? 'bg-blue-600 border-blue-500 text-white'
        : isAnswered
        ? 'bg-emerald-600/20 border-emerald-500/60 text-emerald-300'
        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
    }`;
    button.textContent = q.number;
    button.onclick = async () => {
      currentQuestionIndex = index;
      await persistExamState();
      renderQuestion(currentQuestionIndex);
    };

    questionNavEl.appendChild(button);
  });
}

function renderQuestion(index) {
  if (!questions.length) {
    questionNumberEl.textContent = '-';
    questionTextEl.textContent = 'Soal belum tersedia pada cache lokal.';
    optionsContainerEl.innerHTML = '';
    return;
  }

  const q = questions[index];
  questionNumberEl.textContent = `${q.number}.`;
  questionTextEl.textContent = q.text;

  optionsContainerEl.innerHTML = '';
  q.options.forEach((option, optionIndex) => {
    const label = String.fromCharCode(65 + optionIndex);
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
      <span class="text-lg font-medium ${isSelected ? 'text-white' : 'text-slate-300'}">${option}</span>
    `;

    btn.onclick = () => {
      void selectAnswer(q.id, label);
    };

    optionsContainerEl.appendChild(btn);
  });

  prevBtn.disabled = index === 0;
  nextBtn.innerHTML =
    index === questions.length - 1
      ? 'SELESAI UJIAN <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
      : 'SELANJUTNYA <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

  renderQuestionNav();
}

async function selectAnswer(questionId, answer) {
  studentAnswers[questionId] = answer;

  const record = {
    questionId,
    studentId: STUDENT_ID,
    sessionId: EXAM_SESSION_ID,
    answer,
    synced: 0,
    updatedAt: now(),
  };

  await db.answers.put(record);
  await queueAnswerForSync(record);
  await persistExamState();
  renderQuestion(currentQuestionIndex);
  updateConnectionStatus();
  await updateSyncStatus();

  if (isOnline) {
    await processSyncQueue();
  }
}

function startHeartbeat() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
  }

  heartbeatTimer = setInterval(() => {
    socket.emit('ping');
  }, 10000);
}

function stopHeartbeat() {
  if (!heartbeatTimer) {
    return;
  }

  clearInterval(heartbeatTimer);
  heartbeatTimer = null;
}

function startSyncPolling() {
  if (syncPollTimer) {
    return;
  }

  syncPollTimer = setInterval(() => {
    void processSyncQueue();
  }, SYNC_POLL_INTERVAL_MS);
}

function stopSyncPolling() {
  if (!syncPollTimer) {
    return;
  }

  clearInterval(syncPollTimer);
  syncPollTimer = null;
}

async function refreshConnectivity() {
  isOnline = computeIsOnline({
    navigatorOnline: navigator.onLine,
    socketConnected: isSocketConnected,
  });
  updateConnectionStatus();
  updateOfflineBanner();
  await updateSyncStatus();

  if (isOnline) {
    startSyncPolling();
    await processSyncQueue();
  } else {
    stopSyncPolling();
  }
}

socket.on('connect', async () => {
  isSocketConnected = true;
  socket.emit('joinExam', {
    studentId: STUDENT_ID,
    examSessionId: EXAM_SESSION_ID,
  });
  startHeartbeat();
  await refreshConnectivity();
});

socket.on('disconnect', async () => {
  isSocketConnected = false;
  stopHeartbeat();
  await refreshConnectivity();
});

socket.on('pong', async () => {
  if (!isSocketConnected) {
    isSocketConnected = true;
    await refreshConnectivity();
  }
});

socket.on('announcement', (data) => {
  const notifContainer = document.getElementById('notifContainer') || createNotifContainer();
  const card = createNotificationCard(data);
  notifContainer.appendChild(card);

  if (data.type !== 'URGENT') {
    setTimeout(() => card.remove(), 10000);
  }
});

ipcRenderer.on('security-alert', (event, data) => {
  console.warn('Security Alert:', data.activity);

  const alertDiv = document.createElement('div');
  alertDiv.className =
    'fixed inset-0 bg-red-600/90 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center text-center p-12';
  alertDiv.innerHTML = `
    <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    </div>
    <h1 class="text-4xl font-black mb-4">PELANGGARAN TERDETEKSI</h1>
    <p class="text-xl font-bold text-red-100 max-w-2xl leading-relaxed">${data.activity}</p>
    <p class="mt-8 text-sm font-black uppercase tracking-[0.3em] opacity-50">Aktivitas ini telah dicatat dan dilaporkan ke Proktor</p>
  `;
  document.body.appendChild(alertDiv);

  socket.emit('auditLog', {
    type: data.type,
    activity: data.activity,
    studentId: STUDENT_ID,
  });
});

window.addEventListener('online', () => {
  void refreshConnectivity();
});

window.addEventListener('offline', () => {
  void refreshConnectivity();
});

window.addEventListener('beforeunload', () => {
  stopSyncPolling();
  stopExamTimer();
  stopHeartbeat();
  void persistExamState();
});

nextBtn.onclick = async () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    await persistExamState();
    renderQuestion(currentQuestionIndex);
    return;
  }

  if (confirm('Apakah Anda yakin ingin menyelesaikan ujian?')) {
    await processSyncQueue({ force: true });
    alert('Ujian selesai. Jawaban telah tersimpan.');
  }
};

prevBtn.onclick = async () => {
  if (currentQuestionIndex <= 0) {
    return;
  }

  currentQuestionIndex -= 1;
  await persistExamState();
  renderQuestion(currentQuestionIndex);
};

manualSyncBtn.onclick = () => {
  void processSyncQueue({ force: true });
};

async function initApp() {
  studentNameEl.textContent = 'AHMAD KHAIRUL (NISN: 00928172)';
  await cacheQuestions(fallbackQuestions);
  await loadQuestions();
  await loadLocalAnswers();
  await restoreExamState();
  startExamTimer();
  renderQuestion(currentQuestionIndex);
  await refreshConnectivity();
}

void initApp();
