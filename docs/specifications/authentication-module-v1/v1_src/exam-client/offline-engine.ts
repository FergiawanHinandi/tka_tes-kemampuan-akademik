// ============================================================
// OFFLINE-FIRST ENGINE UNTUK CLIENT SISWA
// ============================================================

const OFFLINE_ENGINE = {
  // 1. Pre-download soal sebelum ujian
  preExamSync: {
    // Saat siswa login, soal langsung di-download & simpan lokal
    downloadQuestions: true,
    downloadMedia: true,             // Gambar & audio soal
    encryptLocal: true,              // Enkripsi data lokal
    verifyChecksum: true,            // Verifikasi integritas
  },

  // 2. Local Database (better-sqlite3)
  localStorage: {
    engine: 'better-sqlite3',
    tables: [
      'local_questions',            // Soal ter-cache
      'local_answers',              // Jawaban siswa (utama!)
      'local_events',               // Event log
      'sync_queue',                 // Antrian sync
    ],
    encryption: 'AES-256',
    autoVacuum: true,
  },

  // 3. Answer Sync Strategy
  answerSync: {
    // Primary: simpan ke server via API
    // Fallback: simpan ke local SQLite
    strategy: 'LOCAL_FIRST',

    // Sync ke server setiap:
    syncInterval: 10_000,            // 10 detik
    syncOnAnswer: true,              // Setiap jawab soal
    syncOnSubmit: true,              // Saat submit
    syncOnReconnect: true,           // Saat koneksi kembali

    // Conflict Resolution
    conflictResolution: 'LAST_WRITE_WINS',
    // Jika ada konflik, jawaban terakhir yang menang
    // Semua versi tetap disimpan di log

    // Retry
    maxRetries: 'UNLIMITED',
    retryBackoff: 'EXPONENTIAL',
  },

  // 4. Connection Monitor
  connectionMonitor: {
    heartbeatInterval: 5_000,        // Ping setiap 5 detik
    offlineThreshold: 15_000,        // Offline jika 3x gagal
    onOffline: [
      'SHOW_OFFLINE_INDICATOR',
      'SWITCH_TO_LOCAL_STORAGE',
      'QUEUE_ALL_SYNCS',
    ],
    onOnline: [
      'SHOW_ONLINE_INDICATOR',
      'FLUSH_SYNC_QUEUE',
      'VERIFY_DATA_INTEGRITY',
    ],
  },

  // 5. Data Integrity Guarantee
  integrityGuarantee: {
    // JAWABAN SISWA TIDAK BOLEH HILANG
    answerWriteStrategy: 'WRITE_AHEAD_LOG',
    walEnabled: true,
    doubleWrite: true,               // Tulis ke memory + disk
    checksumVerification: true,
    // Saat submit:
    submitVerification: {
      verifyAllAnswersSaved: true,
      compareLocalVsServer: true,
      generateSubmitReceipt: true,   // Bukti submit (hash)
    },
  },
};