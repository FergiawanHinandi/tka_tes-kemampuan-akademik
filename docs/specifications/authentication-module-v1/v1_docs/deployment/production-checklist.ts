// ============================================================
// PRODUCTION READINESS CHECKLIST
// ============================================================

const PRODUCTION_CHECKLIST = {

  // 🔒 SECURITY
  security: [
    '☐ Semua .env variables sudah diset dengan nilai production',
    '☐ RSA keys sudah di-generate ulang (bukan yang dev)',
    '☐ Database password kuat (min 32 karakter random)',
    '☐ Redis password kuat',
    '☐ MinIO password kuat',
    '☐ CORS hanya allow domain production',
    '☐ Rate limiting sudah dikonfigurasi',
    '☐ Helmet security headers aktif',
    '☐ HTTPS/TLS 1.3 aktif',
    '☐ CSP (Content Security Policy) dikonfigurasi',
    '☐ SQL injection test PASSED',
    '☐ XSS test PASSED',
    '☐ CSRF protection aktif',
    '☐ Tidak ada console.log di production code',
    '☐ Tidak ada credential hardcoded',
    '☐ 2FA aktif untuk semua admin',
    '☐ Brute force protection aktif',
    '☐ File upload validation aktif',
  ],

  // 🗄️ DATABASE
  database: [
    '☐ Migration sudah dijalankan di production',
    '☐ Indexes sudah optimal',
    '☐ Connection pooling (PgBouncer) aktif',
    '☐ Read replica sudah dikonfigurasi',
    '☐ Backup otomatis sudah berjalan',
    '☐ Test restore dari backup BERHASIL',
    '☐ Row Level Security aktif',
    '☐ Slow query logging aktif',
  ],

  // 🚀 PERFORMANCE
  performance: [
    '☐ API response time < 200ms (p95)',
    '☐ Page load time < 3 detik',
    '☐ Redis caching aktif',
    '☐ CDN untuk static assets aktif',
    '☐ Image compression aktif',
    '☐ Gzip compression aktif',
    '☐ Load test 5000 concurrent users PASSED',
    '☐ Memory leak test PASSED',
  ],

  // 📊 MONITORING
  monitoring: [
    '☐ Grafana dashboard aktif',
    '☐ Prometheus metrics aktif',
    '☐ Sentry error tracking aktif',
    '☐ Health check endpoints aktif',
    '☐ Alert rules dikonfigurasi',
    '☐ Alert channel (email/WA/Telegram) aktif',
    '☐ Log rotation aktif',
    '☐ Uptime monitoring (UptimeRobot/Pingdom) aktif',
  ],

  // 🔄 CI/CD
  cicd: [
    '☐ CI pipeline berjalan & PASSED',
    '☐ CD pipeline ke staging berjalan',
    '☐ CD pipeline ke production memerlukan approval',
    '☐ Rollback procedure sudah ditest',
    '☐ Blue-green / canary deployment siap',
  ],

  // 📝 DOCUMENTATION
  documentation: [
    '☐ API documentation lengkap & up-to-date',
    '☐ User manual untuk setiap role',
    '☐ Deployment guide',
    '☐ Disaster recovery playbook',
    '☐ Troubleshooting guide',
    '☐ CHANGELOG up-to-date',
  ],

  // ⚖️ LEGAL & COMPLIANCE
  legal: [
    '☐ Privacy policy halaman ada',
    '☐ Terms of service halaman ada',
    '☐ Consent form untuk data siswa',
    '☐ UU PDP compliance review',
    '☐ Data retention policy terdokumentasi',
  ],
};