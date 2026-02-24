// ============================================================
// OBSERVABILITY STACK
// ============================================================

const OBSERVABILITY = {
  // 1. Structured Logging
  logging: {
    engine: 'Winston',
    format: 'JSON',
    levels: ['error', 'warn', 'info', 'debug'],
    outputs: [
      { type: 'console', level: 'info' },
      { type: 'file', path: '/logs/app.log', level: 'info', rotation: 'daily' },
      { type: 'file', path: '/logs/error.log', level: 'error' },
      { type: 'elasticsearch', level: 'info' },  // Untuk search & analysis
    ],
    // Setiap log entry berisi:
    fields: [
      'timestamp', 'level', 'message', 'service',
      'traceId', 'userId', 'ip', 'method', 'url',
      'statusCode', 'responseTime', 'userAgent',
    ],
    // JANGAN log data sensitif
    redactFields: ['password', 'token', 'nisn', 'phone'],
  },

  // 2. Metrics (Prometheus + Grafana)
  metrics: {
    engine: 'Prometheus',
    dashboard: 'Grafana',
    customMetrics: [
      // Business Metrics
      'tka_active_exams_total',
      'tka_online_students_total',
      'tka_answers_submitted_total',
      'tka_exam_completions_total',

      // Performance Metrics
      'tka_api_request_duration_seconds',
      'tka_db_query_duration_seconds',
      'tka_websocket_connections_total',
      'tka_websocket_messages_total',

      // Error Metrics
      'tka_api_errors_total',
      'tka_auth_failures_total',
      'tka_cheat_detections_total',

      // Infrastructure Metrics
      'tka_cpu_usage_percent',
      'tka_memory_usage_bytes',
      'tka_disk_usage_bytes',
      'tka_db_connections_active',
    ],
  },

  // 3. Distributed Tracing
  tracing: {
    engine: 'OpenTelemetry',
    sampleRate: 0.1,                 // Trace 10% request
    exportTo: 'Jaeger',
  },

  // 4. Error Tracking
  errorTracking: {
    engine: 'Sentry',
    captureUnhandled: true,
    environment: ['staging', 'production'],
    alertOnNew: true,
    // Juga untuk desktop app
    electronIntegration: true,
  },

  // 5. Alerting Rules
  alerts: {
    channels: ['email', 'whatsapp', 'telegram'],
    rules: [
      {
        name: 'HIGH_ERROR_RATE',
        condition: 'error_rate > 5%',
        severity: 'CRITICAL',
        action: 'ALERT_ALL',
      },
      {
        name: 'API_SLOW',
        condition: 'p95_latency > 2s',
        severity: 'WARNING',
        action: 'ALERT_DEVOPS',
      },
      {
        name: 'DB_CONNECTION_HIGH',
        condition: 'db_connections > 80%',
        severity: 'WARNING',
        action: 'ALERT_DEVOPS',
      },
      {
        name: 'DISK_SPACE_LOW',
        condition: 'disk_usage > 85%',
        severity: 'CRITICAL',
        action: 'ALERT_ALL',
      },
      {
        name: 'EXAM_MASS_DISCONNECT',
        condition: 'student_disconnect_rate > 20% within 1m',
        severity: 'CRITICAL',
        action: 'ALERT_ALL + AUTO_PAUSE_EXAM',
      },
      {
        name: 'SECURITY_BREACH_ATTEMPT',
        condition: 'auth_failures > 50 from same IP within 5m',
        severity: 'CRITICAL',
        action: 'BLOCK_IP + ALERT_SECURITY',
      },
      {
        name: 'SSL_CERT_EXPIRING',
        condition: 'ssl_expiry < 14d',
        severity: 'WARNING',
        action: 'ALERT_DEVOPS',
      },
    ],
  },

  // 6. Health Check Endpoints
  healthChecks: {
    '/health':          'Basic health (HTTP 200)',
    '/health/ready':    'Readiness (DB + Redis + MinIO connected)',
    '/health/live':     'Liveness (process alive)',
    '/health/detailed': 'Full status (all dependencies)',
  },
};