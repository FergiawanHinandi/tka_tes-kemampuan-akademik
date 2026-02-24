// ============================================================
// STANDARDIZED ERROR CODES
// ============================================================
// Format: TKA-{MODULE}-{NUMBER}
// Module codes:
//   AUTH = 01, USER = 02, SCHOOL = 03, STUDENT = 04
//   QUESTION = 05, EXAM = 06, RESULT = 07, SYSTEM = 99

export const ERROR_CODES = {
  // ═══════════════════════════════════════════
  // AUTH ERRORS (TKA-01-xxx)
  // ═══════════════════════════════════════════
  AUTH_INVALID_CREDENTIALS:    { code: 'TKA-01-001', message: 'Username atau password salah', status: 401 },
  AUTH_ACCOUNT_LOCKED:         { code: 'TKA-01-002', message: 'Akun terkunci. Coba lagi setelah 30 menit', status: 423 },
  AUTH_ACCOUNT_DISABLED:       { code: 'TKA-01-003', message: 'Akun dinonaktifkan. Hubungi admin', status: 403 },
  AUTH_TOKEN_EXPIRED:          { code: 'TKA-01-004', message: 'Sesi telah berakhir. Silakan login kembali', status: 401 },
  AUTH_TOKEN_INVALID:          { code: 'TKA-01-005', message: 'Token tidak valid', status: 401 },
  AUTH_REFRESH_TOKEN_EXPIRED:  { code: 'TKA-01-006', message: 'Refresh token kadaluarsa', status: 401 },
  AUTH_INSUFFICIENT_ROLE:      { code: 'TKA-01-007', message: 'Anda tidak memiliki akses untuk ini', status: 403 },
  AUTH_2FA_REQUIRED:           { code: 'TKA-01-008', message: 'Verifikasi 2FA diperlukan', status: 403 },
  AUTH_2FA_INVALID:            { code: 'TKA-01-009', message: 'Kode 2FA tidak valid', status: 401 },
  AUTH_PASSWORD_TOO_WEAK:      { code: 'TKA-01-010', message: 'Password terlalu lemah', status: 400 },
  AUTH_PASSWORD_REUSED:        { code: 'TKA-01-011', message: 'Password sudah pernah digunakan', status: 400 },
  AUTH_SESSION_EXPIRED:        { code: 'TKA-01-012', message: 'Sesi idle terlalu lama', status: 401 },
  AUTH_DEVICE_NOT_TRUSTED:     { code: 'TKA-01-013', message: 'Perangkat tidak dikenali', status: 403 },
  AUTH_MAX_DEVICES_REACHED:    { code: 'TKA-01-014', message: 'Batas perangkat tercapai', status: 403 },
  AUTH_IP_BLOCKED:             { code: 'TKA-01-015', message: 'IP address diblokir', status: 403 },

  // ═══════════════════════════════════════════
  // USER ERRORS (TKA-02-xxx)
  // ═══════════════════════════════════════════
  USER_NOT_FOUND:              { code: 'TKA-02-001', message: 'User tidak ditemukan', status: 404 },
  USER_EMAIL_EXISTS:           { code: 'TKA-02-002', message: 'Email sudah terdaftar', status: 409 },
  USER_USERNAME_EXISTS:        { code: 'TKA-02-003', message: 'Username sudah terdaftar', status: 409 },
  USER_CANNOT_DELETE_SELF:     { code: 'TKA-02-004', message: 'Tidak bisa menghapus akun sendiri', status: 400 },

  // ═══════════════════════════════════════════
  // SCHOOL ERRORS (TKA-03-xxx)
  // ═══════════════════════════════════════════
  SCHOOL_NOT_FOUND:            { code: 'TKA-03-001', message: 'Sekolah tidak ditemukan', status: 404 },
  SCHOOL_NPSN_EXISTS:          { code: 'TKA-03-002', message: 'NPSN sudah terdaftar', status: 409 },
  SCHOOL_ACCESS_DENIED:        { code: 'TKA-03-003', message: 'Anda tidak memiliki akses ke sekolah ini', status: 403 },

  // ═══════════════════════════════════════════
  // STUDENT ERRORS (TKA-04-xxx)
  // ═══════════════════════════════════════════
  STUDENT_NOT_FOUND:           { code: 'TKA-04-001', message: 'Siswa tidak ditemukan', status: 404 },
  STUDENT_NISN_EXISTS:         { code: 'TKA-04-002', message: 'NISN sudah terdaftar', status: 409 },
  STUDENT_IMPORT_FAILED:       { code: 'TKA-04-003', message: 'Gagal import data siswa', status: 400 },
  STUDENT_IMPORT_INVALID_FILE: { code: 'TKA-04-004', message: 'Format file tidak valid', status: 400 },

  // ═══════════════════════════════════════════
  // QUESTION ERRORS (TKA-05-xxx)
  // ═══════════════════════════════════════════
  QUESTION_BANK_NOT_FOUND:     { code: 'TKA-05-001', message: 'Bank soal tidak ditemukan', status: 404 },
  QUESTION_NOT_FOUND:          { code: 'TKA-05-002', message: 'Soal tidak ditemukan', status: 404 },
  QUESTION_BANK_PUBLISHED:     { code: 'TKA-05-003', message: 'Bank soal sudah dipublish, tidak bisa diubah', status: 400 },
  QUESTION_BANK_IN_USE:        { code: 'TKA-05-004', message: 'Bank soal sedang digunakan untuk ujian aktif', status: 400 },
  QUESTION_NO_CORRECT_ANSWER:  { code: 'TKA-05-005', message: 'Soal PG harus memiliki 1 jawaban benar', status: 400 },
  QUESTION_IMPORT_FAILED:      { code: 'TKA-05-006', message: 'Gagal import soal', status: 400 },

  // ═══════════════════════════════════════════
  // EXAM ERRORS (TKA-06-xxx)
  // ═══════════════════════════════════════════
  EXAM_NOT_FOUND:              { code: 'TKA-06-001', message: 'Ujian tidak ditemukan', status: 404 },
  EXAM_NOT_DRAFT:              { code: 'TKA-06-002', message: 'Ujian hanya bisa diubah saat status DRAFT', status: 400 },
  EXAM_ALREADY_ACTIVE:         { code: 'TKA-06-003', message: 'Ujian sudah berjalan', status: 400 },
  EXAM_SESSION_NOT_FOUND:      { code: 'TKA-06-004', message: 'Sesi ujian tidak ditemukan', status: 404 },
  EXAM_SESSION_FULL:           { code: 'TKA-06-005', message: 'Sesi ujian sudah penuh', status: 400 },
  EXAM_ROOM_NOT_FOUND:         { code: 'TKA-06-006', message: 'Ruang ujian tidak ditemukan', status: 404 },
  EXAM_ROOM_FULL:              { code: 'TKA-06-007', message: 'Ruang ujian sudah penuh', status: 400 },
  EXAM_STUDENT_NOT_ASSIGNED:   { code: 'TKA-06-008', message: 'Siswa belum di-assign ke sesi ujian', status: 400 },
  EXAM_TOKEN_INVALID:          { code: 'TKA-06-009', message: 'Token ujian tidak valid', status: 401 },
  EXAM_NOT_STARTED:            { code: 'TKA-06-010', message: 'Ujian belum dimulai oleh proktor', status: 400 },
  EXAM_ALREADY_SUBMITTED:      { code: 'TKA-06-011', message: 'Ujian sudah disubmit', status: 400 },
  EXAM_TIME_EXPIRED:           { code: 'TKA-06-012', message: 'Waktu ujian sudah habis', status: 400 },
  EXAM_STUDENT_KICKED:         { code: 'TKA-06-013', message: 'Anda dikeluarkan dari ujian', status: 403 },
  EXAM_CHEATING_DETECTED:      { code: 'TKA-06-014', message: 'Pelanggaran terdeteksi', status: 403 },
  EXAM_WAVE_NOT_FOUND:         { code: 'TKA-06-015', message: 'Gelombang ujian tidak ditemukan', status: 404 },

  // ═══════════════════════════════════════════
  // RESULT ERRORS (TKA-07-xxx)
  // ═══════════════════════════════════════════
  RESULT_NOT_FOUND:            { code: 'TKA-07-001', message: 'Hasil ujian tidak ditemukan', status: 404 },
  RESULT_NOT_CALCULATED:       { code: 'TKA-07-002', message: 'Hasil ujian belum dihitung', status: 400 },
  RESULT_ESSAY_PENDING:        { code: 'TKA-07-003', message: 'Masih ada essay yang belum dikoreksi', status: 400 },
  GRADING_ALREADY_DONE:        { code: 'TKA-07-004', message: 'Jawaban sudah dikoreksi', status: 400 },

  // ═══════════════════════════════════════════
  // SYSTEM ERRORS (TKA-99-xxx)
  // ═══════════════════════════════════════════
  SYSTEM_INTERNAL_ERROR:       { code: 'TKA-99-001', message: 'Terjadi kesalahan sistem', status: 500 },
  SYSTEM_DATABASE_ERROR:       { code: 'TKA-99-002', message: 'Kesalahan database', status: 500 },
  SYSTEM_REDIS_ERROR:          { code: 'TKA-99-003', message: 'Kesalahan cache server', status: 500 },
  SYSTEM_STORAGE_ERROR:        { code: 'TKA-99-004', message: 'Kesalahan penyimpanan file', status: 500 },
  SYSTEM_RATE_LIMITED:         { code: 'TKA-99-005', message: 'Terlalu banyak request. Coba lagi nanti', status: 429 },
  SYSTEM_MAINTENANCE:          { code: 'TKA-99-006', message: 'Sistem sedang dalam pemeliharaan', status: 503 },
  SYSTEM_VALIDATION_ERROR:     { code: 'TKA-99-007', message: 'Data tidak valid', status: 400 },
  SYSTEM_FILE_TOO_LARGE:       { code: 'TKA-99-008', message: 'Ukuran file terlalu besar', status: 413 },
  SYSTEM_UNSUPPORTED_FILE:     { code: 'TKA-99-009', message: 'Tipe file tidak didukung', status: 415 },
} as const;