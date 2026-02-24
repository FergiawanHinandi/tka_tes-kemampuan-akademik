// ============================================================
// MULTI-LAYER CACHING
// ============================================================

const CACHING_STRATEGY = {
  // Layer 1: CDN (Cloudflare)
  cdn: {
    staticAssets: '30d',             // CSS, JS, images
    apiResponses: false,             // Jangan cache API
  },

  // Layer 2: Application Cache (Redis)
  redis: {
    // Data yang jarang berubah
    schools: { ttl: '1h', invalidateOn: ['school.updated'] },
    subjects: { ttl: '24h', invalidateOn: ['subject.updated'] },
    provinces: { ttl: '7d', invalidateOn: ['province.updated'] },
    cities: { ttl: '7d', invalidateOn: ['city.updated'] },
    districts: { ttl: '7d', invalidateOn: ['district.updated'] },
    appSettings: { ttl: '1h', invalidateOn: ['setting.updated'] },

    // Data yang sering diakses
    userSession: { ttl: '8h' },
    examSession: { ttl: '30m' },
    dashboardStats: { ttl: '5m' },

    // Exam-specific
    questionBank: { ttl: '1h', invalidateOn: ['question.updated'] },
    examResults: { ttl: '10m', invalidateOn: ['result.calculated'] },

    // Real-time (no cache)
    studentAnswers: { ttl: null },   // Selalu fresh
    studentStatus: { ttl: null },
  },

  // Layer 3: Database Query Cache
  queryCache: {
    enabled: true,
    engine: 'Redis',
    defaultTTL: '5m',
    invalidation: 'EVENT_DRIVEN',    // Invalidate saat data berubah
  },

  // Cache Invalidation Pattern
  invalidation: 'PUBLISH_SUBSCRIBE', // Redis Pub/Sub
};