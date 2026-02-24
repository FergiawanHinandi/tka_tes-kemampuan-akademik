// ============================================================
// ANTI-CHEAT SYSTEM (CLIENT SISWA)
// ============================================================

const ANTI_CHEAT_CONFIG = {
  // Level 1: Lockdown Mode Dasar
  basicLockdown: {
    fullscreenEnforcement: true,
    blockAltTab: true,
    blockAltF4: true,
    blockCtrlAltDel: false,          // OS-level, perlu driver khusus
    blockTaskManager: true,
    blockWindowsKey: true,
    blockCopyPaste: true,
    blockPrintScreen: true,
    blockContextMenu: true,
    blockDragDrop: true,
    blockNewWindow: true,
    blockDevTools: true,
    disableClipboard: true,
  },

  // Level 2: Environment Detection
  environmentCheck: {
    detectVirtualMachine: true,      // Block VM (VirtualBox, VMware)
    detectRemoteDesktop: true,       // Block TeamViewer, AnyDesk, RDP
    detectMultiMonitor: true,        // Block multi monitor
    detectScreenRecording: true,     // Block OBS, screen recorders
    detectSuspiciousProcesses: [     // Block proses mencurigakan
      'discord', 'telegram', 'whatsapp',
      'obs', 'bandicam', 'camtasia',
      'teamviewer', 'anydesk', 'rustdesk',
      'autohotkey', 'cheatengine',
    ],
    verifyProcessIntegrity: true,
  },

  // Level 3: Behavioral Analysis
  behaviorAnalysis: {
    tabSwitchDetection: true,
    focusLossTracking: true,
    mouseMovementPattern: true,      // Deteksi pola mouse tidak wajar
    typingPattern: true,             // Deteksi copy-paste via typing speed
    answerTimeAnalysis: true,        // Deteksi jawaban terlalu cepat
    maxFocusLossCount: 3,            // Maks 3x kehilangan focus
    autoSubmitOnExceed: true,        // Auto submit jika melebihi batas
  },

  // Level 4: Network Security
  networkSecurity: {
    allowedDomains: [                // Whitelist domain
      'api.tka-ujian.id',
      'cdn.tka-ujian.id',
    ],
    blockOtherNetwork: true,         // Block akses ke domain lain
    detectProxyVPN: true,            // Deteksi proxy/VPN
    certificatePinning: true,        // Pastikan koneksi ke server asli
  },

  // Level 5: Forensic Logging
  forensicLogging: {
    screenshotPeriodic: false,       // Opsional: screenshot berkala
    webcamMonitoring: false,         // Opsional: webcam proctoring
    keystrokeLogging: false,         // JANGAN: privacy concern
    allEventsLogged: true,           // Semua event dicatat
    logRetention: '1y',              // Simpan log 1 tahun
  },
};

// ============================================================
// ANTI-FRAUD SOAL (SERVER SIDE)
// ============================================================

const ANTI_FRAUD_EXAM = {
  // Soal di-shuffle per siswa (urutan berbeda)
  shuffleQuestions: true,
  shuffleOptions: true,

  // Soal dikirim bertahap (bukan sekaligus)
  questionDelivery: 'PROGRESSIVE', // Kirim soal 1 per 1, atau batch kecil

  // Prevent answer sharing
  questionPooling: true,
  // Dari 100 soal di bank, pilih random 50 per siswa
  // Setiap siswa dapat set soal berbeda

  // Time-based answer validation
  minAnswerTime: 3,                 // Min 3 detik per soal (anti bot)
  maxIdleTime: 300,                 // Maks 5 menit idle

  // Answer integrity
  answerHashing: true,              // Hash jawaban untuk deteksi manipulasi
  serverSideTimestamp: true,        // Timestamp dari server, bukan client
};