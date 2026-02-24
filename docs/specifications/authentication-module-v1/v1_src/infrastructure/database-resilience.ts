// ============================================================
// DATABASE RESILIENCE CONFIG
// ============================================================

const DATABASE_RESILIENCE = {
  // 1. Replication (Master-Slave)
  replication: {
    master: 1,                       // 1 master (write)
    slaves: 2,                       // 2 slave (read)
    syncMode: 'ASYNC',              // Async replication
    failoverAutomatic: true,         // Auto failover jika master down
    promotionPolicy: 'LEAST_LAG',   // Promosikan slave dengan lag terkecil
  },

  // 2. Connection Pooling
  connectionPool: {
    engine: 'PgBouncer',
    maxConnections: 200,
    idleTimeout: 30,
    connectionTimeout: 10,
    mode: 'TRANSACTION',            // Transaction pooling mode
  },

  // 3. Backup Strategy (3-2-1 Rule)
  backup: {
    // 3 salinan data
    fullBackup: {
      frequency: 'DAILY',
      time: '02:00',                // Jam 2 pagi
      retention: '30d',             // Simpan 30 hari
    },
    incrementalBackup: {
      frequency: 'HOURLY',
      retention: '7d',
    },
    walArchiving: {
      enabled: true,                 // Point-in-time recovery
      retention: '14d',
    },
    // 2 media berbeda
    storage: ['LOCAL_DISK', 'S3_CLOUD'],
    // 1 off-site
    offsite: 'AWS_S3_DIFFERENT_REGION',
    encryption: 'AES-256-GCM',
    testRestore: 'MONTHLY',         // Test restore setiap bulan
  },

  // 4. Data Integrity
  integrity: {
    checksums: true,                 // PostgreSQL data checksums
    walLevel: 'REPLICA',
    fsync: true,
    fullPageWrites: true,
  },
};