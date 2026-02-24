// ============================================================
// ENKRIPSI DATA
// ============================================================

const ENCRYPTION_CONFIG = {
  // 1. Data at Rest (data tersimpan)
  atRest: {
    algorithm: 'AES-256-GCM',
    encryptedFields: [
      'students.nisn',              // Data pribadi siswa
      'students.parentPhone',
      'users.phone',
      'exam_room_students.token',   // Token ujian
    ],
    databaseEncryption: 'TDE',      // Transparent Data Encryption PostgreSQL
  },

  // 2. Data in Transit (data bergerak)
  inTransit: {
    tlsVersion: '1.3',             // Minimum TLS 1.3
    certificatePinning: true,       // Untuk desktop app
    hsts: true,
  },

  // 3. Soal Encryption
  examEncryption: {
    // Soal dienkripsi saat dikirim ke client
    // Decrypt hanya saat proktor memulai ujian
    algorithm: 'AES-256-CBC',
    keyDerivation: 'PBKDF2',
    keyRotation: 'per-session',     // Key berbeda tiap sesi
  },

  // 4. Backup Encryption
  backupEncryption: {
    algorithm: 'AES-256-GCM',
    keyManagement: 'envelope',       // Envelope encryption
  },
};