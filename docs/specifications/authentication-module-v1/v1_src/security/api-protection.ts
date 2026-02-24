// ============================================================
// MULTI-LAYER API PROTECTION
// ============================================================

// Layer 1: Rate Limiting (berlapis)
const RATE_LIMITS = {
  global: {
    windowMs: 60_000,       // 1 menit
    max: 100,               // 100 req/menit per IP
  },
  auth: {
    windowMs: 900_000,      // 15 menit
    max: 10,                // 10 attempt login per 15 menit
  },
  examSubmit: {
    windowMs: 60_000,
    max: 5,                 // Mencegah spam submit
  },
  fileUpload: {
    windowMs: 3_600_000,    // 1 jam
    max: 50,                // 50 upload per jam
  },
  apiKeyEndpoints: {
    windowMs: 1_000,        // 1 detik
    max: 10,                // 10 req/detik untuk API key
  },
};

// Layer 2: Request Validation & Sanitization
const SECURITY_MIDDLEWARE = {
  helmet: true,                     // HTTP security headers
  cors: {
    origin: ['https://tka-ujian.id', 'https://admin.tka-ujian.id'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  contentSecurityPolicy: true,      // CSP headers
  xssProtection: true,              // Anti XSS
  sqlInjectionFilter: true,         // Anti SQL Injection
  noSniff: true,                    // X-Content-Type-Options
  referrerPolicy: 'strict-origin-when-cross-origin',
  hsts: {
    maxAge: 31536000,               // 1 tahun
    includeSubDomains: true,
    preload: true,
  },
};

// Layer 3: Input Validation (semua input WAJIB divalidasi)
const VALIDATION_RULES = {
  sanitizeHTML: true,               // Strip malicious HTML
  maxBodySize: '10mb',              // Batas ukuran body
  maxFileSize: '50mb',              // Batas ukuran file
  allowedFileTypes: [
    'image/jpeg', 'image/png', 'image/webp',
    'audio/mpeg', 'audio/wav',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  parameterPollution: true,         // Anti HTTP Parameter Pollution
};

// Layer 4: Request Signing (untuk desktop app)
const REQUEST_SIGNING = {
  enabled: true,
  algorithm: 'HMAC-SHA256',
  // Setiap request dari Proktor/Client harus di-sign
  // Mencegah request dari tools seperti Postman/curl
  headers: ['X-App-Signature', 'X-App-Timestamp', 'X-App-Nonce'],
  maxTimeDrift: 30,                 // Toleransi 30 detik
};