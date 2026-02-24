// ============================================================
// FAULT TOLERANCE PATTERNS
// ============================================================

// 1. Circuit Breaker Pattern
const CIRCUIT_BREAKER = {
  // Jika service gagal 5x berturut-turut, buka circuit
  failureThreshold: 5,
  // Coba lagi setelah 30 detik
  resetTimeout: 30_000,
  // Monitor setiap 10 detik
  monitorInterval: 10_000,

  // Terapkan pada:
  services: [
    'database',
    'redis',
    'minio',
    'emailService',
    'websocket',
  ],
};

// 2. Retry Pattern
const RETRY_CONFIG = {
  maxRetries: 3,
  backoff: 'EXPONENTIAL',           // 1s, 2s, 4s
  maxBackoff: 30_000,
  retryableErrors: [
    'ECONNREFUSED',
    'ETIMEDOUT',
    'ECONNRESET',
    'DATABASE_UNAVAILABLE',
  ],
};

// 3. Graceful Degradation
const DEGRADATION_RULES = {
  // Jika Redis down:
  redisDown: {
    cache: 'SKIP',                   // Lewati cache, query langsung ke DB
    session: 'FALLBACK_JWT',         // Gunakan JWT stateless
    queue: 'SYNC_PROCESSING',        // Proses secara sinkron
  },
  // Jika MinIO down:
  minioDown: {
    upload: 'QUEUE_FOR_LATER',       // Simpan di local disk sementara
    download: 'SERVE_CACHED',        // Serve dari CDN cache
  },
  // Jika 1 API server down:
  apiServerDown: {
    action: 'ROUTE_TO_HEALTHY',      // Load balancer otomatis
    healthCheck: '/health',
    interval: 5_000,
  },
};

// 4. Bulkhead Pattern (Isolasi resource)
const BULKHEAD = {
  examEngine: {
    maxConcurrent: 5000,             // Maks 5000 siswa concurrent
    maxQueue: 1000,
    timeout: 30_000,
  },
  reportGeneration: {
    maxConcurrent: 10,               // Maks 10 report generation sekaligus
    maxQueue: 50,
  },
  fileUpload: {
    maxConcurrent: 20,
    maxQueue: 30,
  },
};