// ============================================================
// COMPLIANCE & DATA PROTECTION
// ============================================================

const COMPLIANCE = {
  // 1. UU PDP Indonesia (UU No. 27 Tahun 2022)
  dataProtection: {
    // Data Pribadi Siswa yang dilindungi:
    protectedData: [
      'NISN', 'Nama Lengkap', 'Tanggal Lahir',
      'Nama Orang Tua', 'Nomor HP Orang Tua',
      'Alamat', 'Foto',
    ],
    // Prinsip:
    principles: [
      'CONSENT',          // Persetujuan dari orang tua/wali
      'PURPOSE_LIMITATION', // Data hanya untuk TKA
      'DATA_MINIMIZATION',  // Hanya kumpulkan yang diperlukan
      'ACCURACY',           // Data harus akurat
      'STORAGE_LIMITATION', // Simpan seperlunya
      'INTEGRITY',          // Jaga keamanan data
      'ACCOUNTABILITY',     // Bertanggung jawab
    ],
    // Implementasi:
    implementation: {
      consentForm: true,              // Form persetujuan digital
      dataRetention: '5y',            // Simpan maks 5 tahun
      dataAnonymization: true,        // Anonimisasi data lama
      dataDeletion: 'ON_REQUEST',     // Hapus jika diminta
      dataPortability: true,          // Export data siswa
      privacyPolicy: true,            // Halaman kebijakan privasi
      dpo: true,                      // Data Protection Officer
    },
  },

  // 2. Audit Trail
  auditTrail: {
    logAllDataAccess: true,           // Log siapa akses data apa
    logAllModifications: true,        // Log semua perubahan
    immutableLogs: true,              // Log tidak bisa dihapus/diubah
    retention: '7y',                  // Simpan log 7 tahun
    tamperProof: 'HASH_CHAIN',       // Chain hash untuk anti-tamper
  },

  // 3. Access Control
  accessControl: {
    principleOfLeastPrivilege: true,
    // Setiap role HANYA bisa akses data yang relevan
    // Admin Sekolah A tidak bisa lihat data Sekolah B
    dataIsolation: 'ROW_LEVEL_SECURITY',
    // PostgreSQL Row Level Security policies
  },
};