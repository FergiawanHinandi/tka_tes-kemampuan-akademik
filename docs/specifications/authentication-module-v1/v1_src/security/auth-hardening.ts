// ============================================================
// PENGUATAN AUTHENTICATION
// ============================================================

// 1. JWT dengan Rotation & Blacklist
const JWT_CONFIG = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,     // Minimal 256-bit
    expiresIn: '15m',                           // Sangat pendek
    algorithm: 'RS256',                         // Gunakan RSA, bukan HS256
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '7d',
    rotateOnUse: true,                          // Rotate setiap dipakai
    maxDevices: 3,                              // Maks 3 device per user
  },
};

// 2. Two-Factor Authentication (2FA) untuk Admin
const TWO_FACTOR_CONFIG = {
  enabledFor: ['SUPER_ADMIN', 'ADMIN_DISDIK', 'ADMIN_FKKG'],
  method: 'TOTP',          // Google Authenticator / Authy
  backupCodes: 10,          // 10 backup codes
  recoveryEmail: true,
};

// 3. Password Policy
const PASSWORD_POLICY = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  preventReuse: 5,          // Tidak boleh 5 password terakhir
  maxAge: 90,               // Wajib ganti setiap 90 hari
  lockAfterAttempts: 5,     // Lock setelah 5x salah
  lockDuration: 30,         // Lock 30 menit
};

// 4. Session Management
const SESSION_CONFIG = {
  absoluteTimeout: '8h',    // Maks 8 jam per sesi
  idleTimeout: '30m',       // Timeout jika idle 30 menit
  concurrentSessions: 1,    // 1 sesi aktif per role per user
  bindToIP: false,          // Opsional: bind session ke IP
  bindToDevice: true,       // Bind ke device fingerprint
};