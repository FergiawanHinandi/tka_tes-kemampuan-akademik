// ============================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================

const PERFORMANCE_CONFIG = {
  // 1. Database Optimization
  database: {
    // Indexing Strategy (sudah ada di schema, tambahan:)
    partialIndexes: [
      // Index hanya untuk data aktif
      'CREATE INDEX idx_active_students ON students(school_id) WHERE is_active = true',
      'CREATE INDEX idx_active_exams ON exams(school_id) WHERE status != \'CANCELLED\'',
    ],
    // Materialized View untuk dashboard
    materializedViews: [
      'mv_school_statistics',        // Statistik per sekolah
      'mv_exam_summary',             // Ringkasan ujian
      'mv_city_ranking',             // Ranking per kota
    ],
    refreshInterval: '5m',           // Refresh setiap 5 menit
    // Query Optimization
    queryTimeout: 30_000,            // Maks 30 detik per query
    slowQueryLog: 1_000,             // Log query > 1 detik
  },

  // 2. API Response Optimization
  api: {
    compression: 'gzip',             // Compress response
    pagination: {
      defaultPerPage: 20,
      maxPerPage: 100,
    },
    fieldSelection: true,            // ?fields=id,name,email
    lazyLoading: true,               // Include relations hanya jika diminta
    etagSupport: true,               // HTTP ETag untuk caching
  },

  // 3. File Optimization
  files: {
    imageCompression: true,
    maxImageSize: '5MB',
    thumbnailGeneration: true,       // Generate thumbnail otomatis
    lazyLoadImages: true,
    webpConversion: true,            // Convert ke WebP
  },

  // 4. WebSocket Optimization
  websocket: {
    maxConnectionsPerServer: 10_000,
    heartbeatInterval: 10_000,
    reconnectAttempts: 10,
    batchEvents: true,               // Batch events kirim per 1 detik
    compressionEnabled: true,
  },

  // 5. Background Jobs
  backgroundJobs: {
    engine: 'BullMQ',
    concurrency: 5,
    jobs: [
      'calculateExamResults',        // Hitung nilai
      'generateReport',              // Generate PDF/Excel
      'sendNotification',            // Kirim notifikasi
      'cleanupExpiredSessions',      // Bersihkan sesi expired
      'refreshMaterializedViews',    // Refresh MV
      'processImportFile',           // Import Excel
      'archiveOldData',              // Arsip data lama
    ],
  },
};