// ============================================================
// DISASTER RECOVERY PLAN
// ============================================================

const DISASTER_RECOVERY = {
  // 1. Recovery Objectives
  objectives: {
    RPO: '1h',    // Recovery Point Objective: max 1 jam data loss
    RTO: '4h',    // Recovery Time Objective: max 4 jam downtime
  },

  // 2. Backup Tiers
  backupTiers: {
    tier1_realtime: {
      type: 'DATABASE_REPLICATION',
      target: 'SLAVE_SERVER',
      lag: '<1s',
    },
    tier2_hourly: {
      type: 'INCREMENTAL_BACKUP',
      target: 'LOCAL_STORAGE',
      retention: '7d',
    },
    tier3_daily: {
      type: 'FULL_BACKUP',
      target: 'CLOUD_S3',
      retention: '90d',
      encryption: 'AES-256',
    },
    tier4_weekly: {
      type: 'FULL_BACKUP',
      target: 'OFFSITE_DIFFERENT_PROVIDER',
      retention: '1y',
    },
  },

  // 3. Failover Scenarios
  failoverScenarios: {
    masterDBDown: {
      action: 'PROMOTE_SLAVE_TO_MASTER',
      automated: true,
      estimatedTime: '30s',
      tool: 'Patroni / repmgr',
    },
    apiServerDown: {
      action: 'LOAD_BALANCER_REROUTE',
      automated: true,
      estimatedTime: '5s',
    },
    entireDatacenterDown: {
      action: 'SWITCH_TO_DR_SITE',
      automated: false,
      estimatedTime: '2h',
      procedure: 'DR_PLAYBOOK_001',
    },
    ransomwareAttack: {
      action: 'RESTORE_FROM_IMMUTABLE_BACKUP',
      automated: false,
      estimatedTime: '4h',
    },
  },

  // 4. Regular DR Drills
  drills: {
    frequency: 'QUARTERLY',
    scenarios: [
      'Restore dari backup',
      'Failover database',
      'Simulate datacenter outage',
      'Data corruption recovery',
    ],
    reportTo: 'MANAGEMENT',
  },

  // 5. Exam-Specific Recovery
  examRecovery: {
    // Jika server down saat ujian berlangsung:
    procedure: [
      '1. Client app tetap berjalan (offline mode)',
      '2. Jawaban tersimpan di local SQLite',
      '3. Timer tetap berjalan di client',
      '4. Saat server kembali, auto-sync jawaban',
      '5. Proktor bisa extend waktu jika perlu',
      '6. Tidak ada jawaban yang hilang',
    ],
  },
};