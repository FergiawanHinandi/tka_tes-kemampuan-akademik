# Copilot Chat Conversation Export: API specification for authentication module

**User:** @FergiawanHinandi
**Thread URL:** https://github.com/copilot/c/76fd1b11-ae75-4185-80ce-02cbf765c7cd

## @FergiawanHinandi

1. Ide (idea) Saya punya ide untuk membuat sebuah website untuk tes kemampuan akademik siswa sekolah dasar, sekolah menengah pertama, sekolah menengah atas dan sekolah menengah kejuruan. Di website itu yg bisa login adalah:
1. Admin pemilik website
2.  orang disdik kota/kabupaten(memantau semua sekolah SD sampai SMP.melihat hasil dan lain-lain.)
3. Orang fkkg kita/kabupaten(mengapload soal, memeriksa jawaban siswa persekolah, memantau hasil ujian dan lain2
4. Akun admin sekolah yang sudah terdaftar(memanajemen data siswa dan mengatur perencanaan ruang ujian, sesi, gelombang dan lainnya untuk keperluan ujian TKA sekolahnya
Di dalam website admin sekolah d sanalah nantinya admin akan mendownload aplikasi proktor Exam dan dan aplikasi client siswa . 
Admin sekolah login d proktor yg sudah d download untuk mengatur jalannya ujian dan d client siswa akan ujian. 

2. Planning (Perencanaan) bantu saya
3. Design (Desain) bantu saya
4. Scripting (Pemrograman) bantu saya
5. Testing (Uji Coba)
6. Promotion (Promosi)
7. Maintenance (Pemeliharaan)

berikan task listnya untuk project saya dengan lengkap. Karena ini project bukan main2 dan bisa d gunakan untuk semua sekolah 

Dan simpan baik'2 percakapan ini untuk kita bahas lebih lanjut hingga semua selesai

## Copilot

# 📋 Master Task List: Website Tes Kemampuan Akademik (TKA)

Saya sudah menganalisis ide Anda secara menyeluruh. Ini adalah project skala besar yang serius, jadi saya akan berikan task list yang **sangat komprehensif** untuk setiap fase.

---

## 🔷 FASE 1: IDE & ANALISIS KEBUTUHAN

### 1.1 Analisis Stakeholder & Peran (Roles)

| No | Role | Hak Akses |
|----|------|-----------|
| 1 | **Super Admin (Pemilik)** | Full control seluruh sistem |
| 2 | **Admin Disdik Kota/Kabupaten** | Monitoring semua sekolah SD–SMK, melihat hasil, laporan, statistik |
| 3 | **Admin FKKG Kota/Kabupaten** | Upload soal, periksa jawaban, pantau hasil ujian per sekolah |
| 4 | **Admin Sekolah** | Manajemen data siswa, atur ruang ujian, sesi, gelombang, download Proktor & Client |
| 5 | **Proktor (Pengawas)** | Mengatur & mengawasi jalannya ujian secara real-time |
| 6 | **Siswa (via Client App)** | Mengerjakan ujian |

### 1.2 Analisis Modul Sistem

```
📦 ARSITEKTUR SISTEM TKA
├── 🌐 WEB PLATFORM (Cloud/Server)
│   ├── Portal Super Admin
│   ├── Portal Disdik
│   ├── Portal FKKG
│   └── Portal Admin Sekolah
├── 🖥️ DESKTOP APP - PROKTOR EXAM
│   └── Aplikasi pengawas ujian (download dari web)
├── 💻 DESKTOP/WEB APP - CLIENT SISWA
│   └── Aplikasi ujian siswa (download dari web)
└── 🔗 API SERVER (Backend)
    └── Penghubung semua komponen
```

---

## 🔷 FASE 2: PERENCANAAN (PLANNING)

### 2.1 Task List Perencanaan

| No | Task | Detail | Prioritas |
|----|------|--------|-----------|
| 2.1.1 | Dokumen SRS (Software Requirement Specification) | Dokumentasi semua kebutuhan fungsional & non-fungsional | 🔴 Tinggi |
| 2.1.2 | Pemilihan Tech Stack | Frontend, Backend, Database, Desktop Framework | 🔴 Tinggi |
| 2.1.3 | Arsitektur Sistem | Diagram arsitektur, API design, data flow | 🔴 Tinggi |
| 2.1.4 | Timeline & Milestone | Gantt chart, sprint planning | 🔴 Tinggi |
| 2.1.5 | Estimasi Biaya | Server, domain, SSL, tools, SDM | 🟡 Sedang |
| 2.1.6 | Pembentukan Tim | Developer, QA, UI/UX, DevOps | 🟡 Sedang |
| 2.1.7 | Risk Assessment | Identifikasi risiko & mitigasi | 🟡 Sedang |

### 2.2 Rekomendasi Tech Stack

```
┌─────────────────────────────────────────────────────┐
│                 TECH STACK REKOMENDASI               │
├─────────────────┬───────────────────────────────────┤
│ Frontend Web    │ React.js / Next.js + Tailwind CSS │
│ Backend/API     │ Node.js (Express/NestJS) atau     │
│                 │ Laravel (PHP)                     │
│ Database        │ PostgreSQL (utama) + Redis (cache)│
│ Desktop Proktor │ Electron.js                       │
│ Client Siswa    │ Electron.js / Progressive Web App │
│ Authentication  │ JWT + Role-Based Access Control   │
│ File Storage    │ MinIO / AWS S3                    │
│ Real-time       │ WebSocket (Socket.io)             │
│ Server/Hosting  │ VPS / AWS / Google Cloud          │
│ CI/CD           │ GitHub Actions                    │
│ Monitoring      │ Grafana + Prometheus              │
└─────────────────┴───────────────────────────────────┘
```

### 2.3 Database Schema Planning (Entity Utama)

```
📊 ENTITY UTAMA
├── users (semua pengguna + role)
├── provinces, cities, districts
├── schools (data sekolah)
├── school_levels (SD, SMP, SMA, SMK)
├── students (data siswa)
├── subjects (mata pelajaran)
├── question_banks (bank soal)
├── questions (soal per item)
├── question_options (pilihan jawaban)
├── exams (ujian yang dijadwalkan)
├── exam_sessions (sesi ujian)
├── exam_waves (gelombang ujian)
├── exam_rooms (ruang ujian)
├── exam_room_students (mapping siswa-ruang)
├── student_answers (jawaban siswa)
├── exam_results (hasil ujian)
├── exam_logs (log aktivitas ujian)
├── proctor_sessions (sesi proktor)
├── notifications
├── audit_logs (jejak audit)
└── app_settings (konfigurasi sistem)
```

---

## 🔷 FASE 3: DESAIN (DESIGN)

### 3.1 UI/UX Design Tasks

| No | Task | Detail |
|----|------|--------|
| 3.1.1 | **Wireframe - Super Admin** | Dashboard, manajemen user, settings, laporan global |
| 3.1.2 | **Wireframe - Portal Disdik** | Dashboard monitoring, daftar sekolah, hasil ujian, statistik, grafik perbandingan |
| 3.1.3 | **Wireframe - Portal FKKG** | Upload soal, editor soal, review jawaban, monitoring ujian per sekolah |
| 3.1.4 | **Wireframe - Portal Admin Sekolah** | Data siswa, pengaturan ruang/sesi/gelombang, download center, laporan sekolah |
| 3.1.5 | **Wireframe - Proktor Exam App** | Login, kontrol ujian, monitoring siswa real-time, pause/resume, force submit |
| 3.1.6 | **Wireframe - Client Siswa App** | Login, halaman ujian, navigasi soal, timer, submit, review |
| 3.1.7 | **Design System** | Color palette, typography, komponen reusable, icon set |
| 3.1.8 | **High-Fidelity Mockup** | Semua halaman dalam pixel-perfect design |
| 3.1.9 | **Interactive Prototype** | Clickable prototype untuk testing flow |

### 3.2 Desain Halaman Detail Per Portal

#### 🔐 Super Admin Portal
```
📄 Halaman:
├── Login Page
├── Dashboard (statistik global, jumlah sekolah, siswa, ujian aktif)
├── Manajemen User
│   ├── List User
│   ├── Tambah/Edit User
│   └── Assign Role & Wilayah
├── Manajemen Sekolah
│   ├── List Sekolah
│   ├── Tambah/Edit Sekolah
│   └── Detail Sekolah
├── Manajemen Wilayah (Provinsi/Kota/Kecamatan)
├── System Settings
│   ├── Konfigurasi Umum
│   ├── Email/SMTP Settings
│   └── App Version Management (Proktor & Client)
├── Audit Log
├── Laporan Global
└── Profil & Ubah Password
```

#### 📊 Portal Disdik
```
📄 Halaman:
├── Login Page
├── Dashboard Monitoring
│   ├── Jumlah sekolah per jenjang (SD/SMP/SMA/SMK)
│   ├── Statistik ujian aktif / selesai
│   ├── Grafik nilai rata-rata per wilayah
│   └── Peta sebaran sekolah
├── Daftar Sekolah
│   ├── Filter per jenjang, kecamatan
│   └── Detail per sekolah
├── Hasil Ujian
│   ├── Per sekolah
│   ├── Per mata pelajaran
│   ├── Per jenjang
│   └── Perbandingan antar sekolah
├── Laporan & Export
│   ├── Export PDF / Excel
│   └── Laporan periodik
└── Profil
```

#### 📝 Portal FKKG
```
📄 Halaman:
├── Login Page
├── Dashboard
│   ├── Total soal per mapel
│   ├── Status upload soal
│   └── Jadwal ujian
├── Bank Soal
│   ├── List Bank Soal per Jenjang & Mapel
│   ├── Tambah Bank Soal Baru
│   ├── Editor Soal (WYSIWYG)
│   │   ├── Pilihan Ganda
│   │   ├── Essay
│   │   ├── Upload Gambar/Audio di soal
│   │   └── Set kunci jawaban & bobot nilai
│   ├── Import Soal (Excel/CSV)
│   └── Preview Soal
├── Pemeriksaan Jawaban
│   ├── Per Sekolah
│   ├── Per Siswa
│   ├── Koreksi Essay Manual
│   └── Validasi Jawaban
├── Monitoring Ujian
│   ├── Ujian Aktif
│   ├── Status per Sekolah
│   └── Real-time Progress
├── Hasil & Analisis
│   ├── Nilai per sekolah
│   ├── Analisis butir soal
│   ├── Daya pembeda & tingkat kesukaran
│   └── Export laporan
└── Profil
```

#### 🏫 Portal Admin Sekolah
```
📄 Halaman:
├── Login Page
├── Dashboard Sekolah
│   ├── Info sekolah
│   ├── Jumlah siswa
│   ├── Ujian mendatang
│   └── Notifikasi
├── Manajemen Siswa
│   ├── List Siswa
│   ├── Tambah/Edit Siswa
│   ├── Import Siswa (Excel)
│   ├── Assign Siswa ke Kelas
│   └── Cetak Kartu Ujian
├── Pengaturan Ujian
│   ├── Ruang Ujian
│   │   ├── Tambah/Edit Ruang
│   │   └── Kapasitas per ruang
│   ├── Sesi Ujian
│   │   ├── Atur jadwal sesi
│   │   └── Durasi per sesi
│   ├── Gelombang Ujian
│   │   ├── Buat gelombang
│   │   └── Assign siswa ke gelombang
│   └── Mapping Siswa-Ruang-Sesi
├── Download Center
│   ├── Download Proktor Exam App
│   ├── Download Client Siswa App
│   ├── Panduan Instalasi
│   └── System Requirements
├── Hasil Ujian Sekolah
│   ├── Rekap per kelas
│   ├── Rekap per siswa
│   ├── Export nilai
│   └── Cetak laporan
└── Profil Sekolah
```

#### 🖥️ Proktor Exam App (Desktop)
```
📄 Halaman:
├── Login (dengan kode sekolah + kredensial)
├── Pilih Sesi Ujian
├── Dashboard Pengawasan
│   ├── Daftar siswa di ruangan
│   ├── Status koneksi siswa (online/offline)
│   ├── Progress pengerjaan real-time
│   ├── Sisa waktu ujian
│   └── Alert (kecurangan terdeteksi)
├── Kontrol Ujian
│   ├── Mulai Ujian
│   ├── Pause / Resume
│   ├── Tambah Waktu
│   ├── Force Submit Siswa
│   ├── Kick Siswa
│   └── Akhiri Ujian
├── Log Aktivitas
└── Sinkronisasi Data
```

#### 💻 Client Siswa App (Desktop)
```
📄 Halaman:
├── Login Siswa (token/kredensial)
├── Halaman Tunggu (menunggu proktor mulai)
├── Halaman Ujian
│   ├── Header: Info siswa, mapel, sisa waktu
│   ├── Navigasi soal (nomor soal)
│   ├── Area soal (teks, gambar, audio)
│   ├── Area jawaban (radio button / textarea)
│   ├── Tandai ragu-ragu
│   ├── Previous / Next
│   └── Submit ujian
├── Halaman Review (sebelum submit final)
├── Halaman Selesai / Terima Kasih
└── LOCKDOWN MODE:
    ├── Fullscreen mandatory
    ├── Block Alt+Tab, Alt+F4, Task Manager
    ├── Block Copy-Paste
    ├── Block Print Screen
    ├── Deteksi multi-monitor
    └── Auto-submit jika melanggar
```

---

## 🔷 FASE 4: PEMROGRAMAN (SCRIPTING/DEVELOPMENT)

### 4.1 Backend Development

| No | Task | Estimasi | Prioritas |
|----|------|----------|-----------|
| 4.1.1 | Setup project & boilerplate | 2 hari | 🔴 |
| 4.1.2 | Database migration & seeding | 3 hari | 🔴 |
| 4.1.3 | Authentication & Authorization (JWT + RBAC) | 5 hari | 🔴 |
| 4.1.4 | API - Manajemen User & Role | 3 hari | 🔴 |
| 4.1.5 | API - Manajemen Wilayah | 2 hari | 🔴 |
| 4.1.6 | API - Manajemen Sekolah | 3 hari | 🔴 |
| 4.1.7 | API - Manajemen Siswa + Import Excel | 4 hari | 🔴 |
| 4.1.8 | API - Bank Soal & Editor Soal | 7 hari | 🔴 |
| 4.1.9 | API - Import Soal (Excel/CSV) | 3 hari | 🟡 |
| 4.1.10 | API - Pengaturan Ujian (Ruang, Sesi, Gelombang) | 5 hari | 🔴 |
| 4.1.11 | API - Mapping Siswa-Ruang-Sesi | 3 hari | 🔴 |
| 4.1.12 | API - Engine Ujian (start, submit, auto-save) | 7 hari | 🔴 |
| 4.1.13 | API - Penilaian Otomatis (PG) | 3 hari | 🔴 |
| 4.1.14 | API - Koreksi Manual (Essay) | 4 hari | 🟡 |
| 4.1.15 | API - Hasil & Statistik | 5 hari | 🔴 |
| 4.1.16 | API - Analisis Butir Soal | 4 hari | 🟡 |
| 4.1.17 | API - Laporan & Export (PDF/Excel) | 5 hari | 🟡 |
| 4.1.18 | API - Notifikasi | 3 hari | 🟡 |
| 4.1.19 | API - Audit Log | 2 hari | 🟡 |
| 4.1.20 | WebSocket - Real-time monitoring | 5 hari | 🔴 |
| 4.1.21 | API - Download Center (versioning app) | 3 hari | 🟡 |
| 4.1.22 | API - Cetak Kartu Ujian | 2 hari | 🟢 |
| 4.1.23 | Rate Limiting & Security Hardening | 3 hari | 🔴 |
| 4.1.24 | API Documentation (Swagger/OpenAPI) | 2 hari | 🟡 |

### 4.2 Frontend Web Development

| No | Task | Estimasi | Prioritas |
|----|------|----------|-----------|
| 4.2.1 | Setup project & design system | 3 hari | 🔴 |
| 4.2.2 | Komponen UI reusable | 5 hari | 🔴 |
| 4.2.3 | Halaman Login & Auth Flow | 3 hari | 🔴 |
| 4.2.4 | Portal Super Admin (semua halaman) | 10 hari | 🔴 |
| 4.2.5 | Portal Disdik (semua halaman) | 8 hari | 🔴 |
| 4.2.6 | Portal FKKG (semua halaman) | 10 hari | 🔴 |
| 4.2.7 | Portal Admin Sekolah (semua halaman) | 10 hari | 🔴 |
| 4.2.8 | WYSIWYG Editor Soal | 5 hari | 🔴 |
| 4.2.9 | Dashboard Charts & Grafik | 4 hari | 🟡 |
| 4.2.10 | Peta Sebaran Sekolah | 3 hari | 🟢 |
| 4.2.11 | File Upload Handler | 2 hari | 🔴 |
| 4.2.12 | Responsive Design | 4 hari | 🟡 |
| 4.2.13 | Error Handling & Loading States | 2 hari | 🔴 |
| 4.2.14 | Internationalization (i18n) jika perlu | 2 hari | 🟢 |

### 4.3 Desktop App - Proktor Exam (Electron.js)

| No | Task | Estimasi | Prioritas |
|----|------|----------|-----------|
| 4.3.1 | Setup Electron project | 2 hari | 🔴 |
| 4.3.2 | Login & sinkronisasi dengan server | 3 hari | 🔴 |
| 4.3.3 | Dashboard pengawasan real-time | 5 hari | 🔴 |
| 4.3.4 | Kontrol ujian (start, pause, stop) | 4 hari | 🔴 |
| 4.3.5 | Monitoring status siswa (WebSocket) | 4 hari | 🔴 |
| 4.3.6 | Alert & notifikasi kecurangan | 3 hari | 🟡 |
| 4.3.7 | Offline mode & data sync | 5 hari | 🟡 |
| 4.3.8 | Auto-update mechanism | 3 hari | 🟡 |
| 4.3.9 | Logging & troubleshooting | 2 hari | 🟡 |
| 4.3.10 | Build & packaging (Windows/Mac/Linux) | 2 hari | 🔴 |

### 4.4 Desktop App - Client Siswa (Electron.js)

| No | Task | Estimasi | Prioritas |
|----|------|----------|-----------|
| 4.4.1 | Setup Electron project | 2 hari | 🔴 |
| 4.4.2 | Login siswa & waiting room | 3 hari | 🔴 |
| 4.4.3 | Halaman ujian (soal, jawaban, navigasi) | 7 hari | 🔴 |
| 4.4.4 | Timer countdown | 2 hari | 🔴 |
| 4.4.5 | Auto-save jawaban (lokal + server) | 3 hari | 🔴 |
| 4.4.6 | Review & submit final | 3 hari | 🔴 |
| 4.4.7 | **LOCKDOWN MODE** | 7 hari | 🔴 |
| 4.4.8 | ↳ Fullscreen enforcement | - | 🔴 |
| 4.4.9 | ↳ Block keyboard shortcuts | - | 🔴 |
| 4.4.10 | ↳ Block copy-paste & print screen | - | 🔴 |
| 4.4.11 | ↳ Multi-monitor detection | - | 🟡 |
| 4.4.12 | ↳ Process monitoring (block cheating apps) | - | 🟡 |
| 4.4.13 | Offline mode & local cache | 4 hari | 🟡 |
| 4.4.14 | Sinkronisasi jawaban saat reconnect | 3 hari | 🔴 |
| 4.4.15 | Auto-update mechanism | 2 hari | 🟡 |
| 4.4.16 | Build & packaging | 2 hari | 🔴 |

### 4.5 DevOps & Infrastructure

| No | Task | Estimasi |
|----|------|----------|
| 4.5.1 | Setup server (staging & production) | 2 hari |
| 4.5.2 | Docker containerization | 3 hari |
| 4.5.3 | CI/CD pipeline (GitHub Actions) | 3 hari |
| 4.5.4 | SSL certificate & domain setup | 1 hari |
| 4.5.5 | Database backup automation | 2 hari |
| 4.5.6 | Monitoring & alerting (Grafana) | 2 hari |
| 4.5.7 | CDN setup untuk static assets | 1 hari |
| 4.5.8 | Load balancing (jika diperlukan) | 2 hari |

---

## 🔷 FASE 5: TESTING (UJI COBA)

### 5.1 Task List Testing

| No | Task | Detail |
|----|------|--------|
| 5.1.1 | **Unit Testing** | Test setiap fungsi/method di backend |
| 5.1.2 | **Integration Testing** | Test integrasi antar modul API |
| 5.1.3 | **E2E Testing** | Test alur lengkap per role (Cypress/Playwright) |
| 5.1.4 | **UAT (User Acceptance Test)** | Testing oleh perwakilan Disdik, FKKG, Admin Sekolah |
| 5.1.5 | **Load Testing** | Simulasi 1000+ siswa ujian bersamaan (k6/JMeter) |
| 5.1.6 | **Stress Testing** | Test batas maksimal server |
| 5.1.7 | **Security Testing** | Penetration test, SQL injection, XSS, CSRF |
| 5.1.8 | **Compatibility Testing** | Test di berbagai OS, browser, resolusi |
| 5.1.9 | **Offline/Network Testing** | Test skenario putus koneksi saat ujian |
| 5.1.10 | **Lockdown Testing** | Test anti-cheat di berbagai perangkat |
| 5.1.11 | **Data Integrity Testing** | Pastikan jawaban siswa tidak hilang |
| 5.1.12 | **Pilot Testing** | Uji coba di 2-3 sekolah pilot |
| 5.1.13 | **Performance Benchmarking** | Response time < 200ms, uptime 99.9% |
| 5.1.14 | **Regression Testing** | Test ulang setelah setiap perbaikan bug |

### 5.2 Kriteria Kelulusan Testing

```
✅ PASS CRITERIA:
├── Zero critical bugs
├── Response time API < 200ms (95th percentile)
├── Concurrent users: minimal 5.000 siswa simultan
├── Data loss: 0% (jawaban siswa tidak boleh hilang)
├── Uptime: 99.9%
├── Lockdown mode: 100% efektif di Windows 10/11
├── Auto-save berfungsi saat koneksi terputus
└── Semua role bisa menjalankan fungsi utamanya
```

---

## 🔷 FASE 6: PROMOSI (PROMOTION/LAUNCH)

### 6.1 Task List Promosi

| No | Task | Detail |
|----|------|--------|
| 6.1.1 | **Landing Page** | Website promosi dengan fitur, benefit, testimonial |
| 6.1.2 | **Video Demo** | Tutorial penggunaan per role |
| 6.1.3 | **Dokumentasi User** | Buku panduan untuk setiap role |
| 6.1.4 | **Sosialisasi Disdik** | Presentasi ke pejabat Disdik kota/kabupaten |
| 6.1.5 | **Pelatihan FKKG** | Workshop penggunaan untuk tim FKKG |
| 6.1.6 | **Pelatihan Admin Sekolah** | Training ke setiap sekolah terdaftar |
| 6.1.7 | **Soft Launch** | Launch terbatas di beberapa sekolah |
| 6.1.8 | **Grand Launch** | Peluncuran resmi untuk seluruh wilayah |
| 6.1.9 | **Media Sosial** | Branding di Instagram, Facebook, YouTube |
| 6.1.10 | **Kerjasama Dinas** | MoU dengan Disdik |
| 6.1.11 | **FAQ & Knowledge Base** | Artikel bantuan online |
| 6.1.12 | **Helpdesk/Support Center** | WhatsApp, email, ticketing |

### 6.2 Strategi Launch

```
📅 LAUNCH STRATEGY:
├── Bulan 1-2: Alpha Testing internal
├── Bulan 3: Beta Testing (3-5 sekolah pilot)
├── Bulan 4: Perbaikan dari feedback beta
├── Bulan 5: Soft Launch (10-20 sekolah)
├── Bulan 6: Grand Launch (semua sekolah terdaftar)
└── Bulan 7+: Ekspansi ke kota/kabupaten lain
```

---

## 🔷 FASE 7: PEMELIHARAAN (MAINTENANCE)

### 7.1 Task List Pemeliharaan

| No | Task | Frekuensi |
|----|------|-----------|
| 7.1.1 | **Server Monitoring** | 24/7 real-time |
| 7.1.2 | **Database Backup** | Harian (otomatis) |
| 7.1.3 | **Security Patch** | Bulanan / saat ada vulnerability |
| 7.1.4 | **Bug Fixing** | Ongoing (berdasarkan laporan) |
| 7.1.5 | **Performance Optimization** | Bulanan |
| 7.1.6 | **SSL Certificate Renewal** | Tahunan |
| 7.1.7 | **Server Scaling** | Sesuai kebutuhan (saat jumlah user naik) |
| 7.1.8 | **App Update (Proktor & Client)** | Per semester / sesuai kebutuhan |
| 7.1.9 | **Database Cleanup** | Bulanan |
| 7.1.10 | **User Support** | Ongoing |
| 7.1.11 | **Feature Enhancement** | Per kuartal |
| 7.1.12 | **Compliance Review** | Tahunan (regulasi data siswa) |
| 7.1.13 | **Disaster Recovery Drill** | Per semester |
| 7.1.14 | **Dokumentasi Update** | Setiap ada perubahan fitur |
| 7.1.15 | **SLA Review** | Per kuartal |

### 7.2 SLA Target

```
📊 SERVICE LEVEL AGREEMENT:
├── Uptime: 99.9% (max downtime ~8.7 jam/tahun)
├── Response Time: < 200ms (API), < 3 detik (page load)
├── Bug Fix Critical: < 4 jam
├── Bug Fix Major: < 24 jam
├── Bug Fix Minor: < 1 minggu
├── Data Recovery: RPO < 1 jam, RTO < 4 jam
└── Support Response: < 1 jam (jam kerja)
```

---

## 📊 RINGKASAN ESTIMASI KESELURUHAN

| Fase | Estimasi Waktu |
|------|---------------|
| 1. Ide & Analisis | 1-2 minggu |
| 2. Perencanaan | 2-3 minggu |
| 3. Desain UI/UX | 3-4 minggu |
| 4. Development | 4-6 bulan |
| 5. Testing | 1-2 bulan |
| 6. Launch & Promosi | 1-2 bulan |
| 7. Maintenance | Ongoing |
| **TOTAL hingga Launch** | **~8-12 bulan** |

---

## ⚠️ CATATAN PENTING

> 1. **Keamanan Data Siswa** — Wajib comply dengan regulasi perlindungan data pribadi (UU PDP Indonesia)
> 2. **Skalabilitas** — Arsitektur harus mampu melayani ratusan sekolah dan ribuan siswa simultan
> 3. **Offline Capability** — Ujian harus tetap bisa berjalan meski koneksi internet terputus sementara
> 4. **Anti-Cheat** — Lockdown mode di client siswa adalah fitur kritis
> 5. **Data Integrity** — Jawaban siswa TIDAK BOLEH hilang dalam kondisi apapun

---

Ini adalah **master task list** lengkap untuk project TKA Anda. Setiap fase bisa kita bahas secara mendalam satu per satu. 

**Langkah selanjutnya yang saya rekomendasikan:**
1. Finalisasi tech stack
2. Mulai dari desain database schema secara detail
3. Buat API specification

Mau mulai membahas fase mana lebih dulu? Saya siap membantu Anda dari awal hingga project ini benar-benar jadi! 🚀

## @FergiawanHinandi

Mari kita bahas satu persatu untuk menuntaskan satu persatu dan jangan berikan pertanyaan lain kecuali dari 3 . tapi kalau sudah tuntas boleh anda berikan saran
Finalisasi tech stack
Mulai dari desain database schema secara detail
Buat API specification

## Copilot



# 🔷 LANGKAH 1: FINALISASI TECH STACK

Berdasarkan kebutuhan project TKA Anda yang membutuhkan **skalabilitas tinggi, real-time monitoring, desktop app, dan keamanan ketat**, berikut finalisasi tech stack yang paling optimal:

---

## ✅ TECH STACK FINAL

```
┌─────────────────────────────────────────────────────────────────────┐
│                    🏗️ FINAL TECH STACK TKA                         │
├─────────────────────┬───────────────────────────────────────────────┤
│                     │                                               │
│  🎨 FRONTEND WEB    │  Next.js 14+ (React Framework)               │
│                     │  TypeScript                                   │
│                     │  Tailwind CSS + shadcn/ui                     │
│                     │  TanStack Query (data fetching)               │
│                     │  Zustand (state management)                   │
│                     │  React Hook Form + Zod (form & validation)   │
│                     │  Recharts (grafik & chart)                    │
│                     │  Tiptap (WYSIWYG editor soal)                │
│                     │  Leaflet.js (peta sebaran sekolah)           │
│                     │  SheetJS (import/export Excel)               │
│                     │                                               │
├─────────────────────┼───────────────────────────────────────────────┤
│                     │                                               │
│  ⚙️ BACKEND / API   │  Node.js + NestJS (TypeScript)               │
│                     │  Prisma ORM                                   │
│                     │  Passport.js + JWT (authentication)          │
│                     │  CASL (role-based authorization)             │
│                     │  Socket.io (real-time WebSocket)             │
│                     │  Bull + Redis (job queue & background tasks) │
│                     │  Multer + Sharp (file upload & image proc)   │
│                     │  PDFKit (generate PDF laporan)               │
│                     │  ExcelJS (generate Excel laporan)            │
│                     │  Swagger/OpenAPI (API documentation)         │
│                     │  class-validator + class-transformer          │
│                     │  Helmet + CORS + Rate Limiter                │
│                     │                                               │
├─────────────────────┼───────────────────────────────────────────────┤
│                     │                                               │
│  🗄️ DATABASE        │  PostgreSQL 16 (database utama)              │
│                     │  Redis 7 (cache, session, queue)             │
│                     │  MinIO (object storage - soal gambar/audio)  │
│                     │                                               │
├─────────────────────┼───────────────────────────────────────────────┤
│                     │                                               │
│  🖥️ DESKTOP APPS    │  Electron.js 28+ (Proktor & Client)          │
│  (Proktor & Client) │  React (UI dalam Electron)                   │
│                     │  electron-builder (packaging)                │
│                     │  electron-updater (auto-update)              │
│                     │  better-sqlite3 (local DB untuk offline)     │
│                     │  electron-store (local config)               │
│                     │                                               │
├─────────────────────┼───────────────────────────────────────────────┤
│                     │                                               │
│  🚀 DEVOPS          │  Docker + Docker Compose                     │
│                     │  GitHub Actions (CI/CD)                      │
│                     │  Nginx (reverse proxy & load balancer)       │
│                     │  Certbot (SSL Let's Encrypt)                 │
│                     │  VPS (Hetzner / DigitalOcean / AWS EC2)      │
│                     │                                               │
├─────────────────────┼───────────────────────────────────────────────┤
│                     │                                               │
│  📊 MONITORING      │  Grafana + Prometheus (server monitoring)    │
│                     │  Sentry (error tracking)                     │
│                     │  Winston + Morgan (logging)                  │
│                     │                                               │
├─────────────────────┼───────────────────────────────────────────────┤
│                     │                                               │
│  🧪 TESTING         │  Jest (unit & integration test)              │
│                     │  Playwright (E2E testing web)                │
│                     │  Spectron (E2E testing Electron)             │
│                     │  k6 (load & stress testing)                  │
│                     │  Faker.js (generate data dummy)              │
│                     │                                               │
└─────────────────────┴───────────────────────────────────────────────┘
```

### 🎯 Alasan Pemilihan Setiap Teknologi

```
MENGAPA NESTJS (bukan Express biasa)?
├── ✅ Arsitektur modular → cocok untuk project besar multi-modul
├── ✅ Built-in support untuk WebSocket, Queue, CRON
├── ✅ Dependency Injection → kode lebih testable & maintainable
├── ✅ TypeScript native → mengurangi bug di production
└── ✅ Swagger auto-generate dari decorator

MENGAPA POSTGRESQL (bukan MySQL)?
├── ✅ JSONB support → fleksibel untuk menyimpan opsi soal
├── ✅ Better concurrent read/write → penting saat ribuan siswa ujian
├── ✅ Full-text search bawaan
├── ✅ Row-level security
└── ✅ Lebih baik untuk complex query & reporting

MENGAPA ELECTRON (bukan web-based untuk ujian)?
├── ✅ LOCKDOWN MODE hanya bisa dilakukan di desktop app
├── ✅ Bisa block Alt+Tab, Task Manager, PrintScreen
├── ✅ Offline capability dengan local SQLite
├── ✅ Akses ke hardware (webcam untuk monitoring jika perlu)
└── ✅ Auto-update built-in

MENGAPA NEXT.JS (bukan React biasa)?
├── ✅ SSR/SSG → SEO friendly untuk landing page
├── ✅ API Routes → bisa jadi BFF (Backend for Frontend)
├── ✅ Built-in routing
├── ✅ Image optimization
└── ✅ Middleware untuk auth check
```

---

**✅ Tech Stack sudah FINAL.**

---

# 🔷 LANGKAH 2: DESAIN DATABASE SCHEMA DETAIL

## 📐 Entity Relationship Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                     DATABASE SCHEMA TKA                              │
│                                                                      │
│  ┌─────────┐    ┌──────────┐    ┌──────────┐    ┌───────────────┐   │
│  │ WILAYAH │───→│ SEKOLAH  │───→│  SISWA   │───→│STUDENT_ANSWERS│   │
│  └─────────┘    └──────────┘    └──────────┘    └───────────────┘   │
│       │              │               │                   ↑          │
│       ↓              ↓               ↓                   │          │
│  ┌─────────┐    ┌──────────┐    ┌──────────┐    ┌───────────────┐   │
│  │  USERS  │    │EXAM_ROOMS│───→│ROOM_MAP  │    │  QUESTIONS    │   │
│  └─────────┘    └──────────┘    └──────────┘    └───────────────┘   │
│       │              ↑                                   ↑          │
│       ↓              │                                   │          │
│  ┌─────────┐    ┌──────────┐    ┌──────────┐    ┌───────────────┐   │
│  │  ROLES  │    │  EXAMS   │───→│EX_SESSION│    │ QUESTION_BANK │   │
│  └─────────┘    └──────────┘    └──────────┘    └───────────────┘   │
│                      │                                   ↑          │
│                      ↓                                   │          │
│                 ┌──────────┐                     ┌───────────────┐   │
│                 │EX_WAVES  │                     │   SUBJECTS    │   │
│                 └──────────┘                     └───────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

## 📋 Schema Detail Lengkap (Prisma ORM Format)

```prisma name=prisma/schema.prisma
// ============================================================================
// TKA DATABASE SCHEMA - COMPLETE
// Database: PostgreSQL 16
// ORM: Prisma
// ============================================================================

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================================
// 1. ENUMS
// ============================================================================

enum UserRole {
  SUPER_ADMIN
  ADMIN_DISDIK
  ADMIN_FKKG
  ADMIN_SEKOLAH
  PROKTOR
}

enum SchoolLevel {
  SD
  SMP
  SMA
  SMK
}

enum QuestionType {
  PILIHAN_GANDA
  ESSAY
  ISIAN_SINGKAT
  BENAR_SALAH
}

enum ExamStatus {
  DRAFT
  SCHEDULED
  ACTIVE
  PAUSED
  COMPLETED
  CANCELLED
}

enum SessionStatus {
  WAITING
  ACTIVE
  PAUSED
  COMPLETED
}

enum StudentExamStatus {
  NOT_STARTED
  IN_PROGRESS
  SUBMITTED
  FORCE_SUBMITTED
  DISCONNECTED
  TIMED_OUT
}

enum Gender {
  LAKI_LAKI
  PEREMPUAN
}

enum DifficultyLevel {
  MUDAH
  SEDANG
  SULIT
}

enum AppType {
  PROKTOR
  CLIENT_SISWA
}

enum AppPlatform {
  WINDOWS
  MACOS
  LINUX
}

enum NotificationType {
  INFO
  WARNING
  EXAM_SCHEDULED
  EXAM_STARTED
  EXAM_COMPLETED
  SYSTEM
}

enum AuditAction {
  CREATE
  UPDATE
  DELETE
  LOGIN
  LOGOUT
  EXAM_START
  EXAM_SUBMIT
  EXAM_FORCE_SUBMIT
  UPLOAD_SOAL
  DOWNLOAD_APP
  EXPORT_DATA
}

// ============================================================================
// 2. WILAYAH (REGIONAL)
// ============================================================================

model Province {
  id        String   @id @default(cuid())
  code      String   @unique // Kode BPS provinsi
  name      String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  cities City[]

  @@map("provinces")
}

model City {
  id         String   @id @default(cuid())
  code       String   @unique // Kode BPS kota/kabupaten
  name       String
  provinceId String   @map("province_id")
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")

  province  Province   @relation(fields: [provinceId], references: [id])
  districts District[]
  schools   School[]
  users     User[]

  @@map("cities")
}

model District {
  id        String   @id @default(cuid())
  code      String   @unique // Kode BPS kecamatan
  name      String
  cityId    String   @map("city_id")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  city    City     @relation(fields: [cityId], references: [id])
  schools School[]

  @@map("districts")
}

// ============================================================================
// 3. USER & AUTHENTICATION
// ============================================================================

model User {
  id             String    @id @default(cuid())
  email          String    @unique
  username       String    @unique
  password       String    // bcrypt hashed
  fullName       String    @map("full_name")
  phone          String?
  role           UserRole
  cityId         String?   @map("city_id") // Untuk Disdik & FKKG
  schoolId       String?   @map("school_id") // Untuk Admin Sekolah & Proktor
  avatar         String?
  isActive       Boolean   @default(true) @map("is_active")
  lastLoginAt    DateTime? @map("last_login_at")
  emailVerifiedAt DateTime? @map("email_verified_at")
  createdAt      DateTime  @default(now()) @map("created_at")
  updatedAt      DateTime  @updatedAt @map("updated_at")

  city              City?              @relation(fields: [cityId], references: [id])
  school            School?            @relation(fields: [schoolId], references: [id])
  refreshTokens     RefreshToken[]
  auditLogs         AuditLog[]
  notifications     Notification[]
  proctorSessions   ProctorSession[]
  questionBanks     QuestionBank[]     // Soal yang dibuat oleh FKKG
  essayGradings     EssayGrading[]     // Essay yang dikoreksi

  @@index([role])
  @@index([cityId])
  @@index([schoolId])
  @@map("users")
}

model RefreshToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String   @map("user_id")
  expiresAt DateTime @map("expires_at")
  isRevoked Boolean  @default(false) @map("is_revoked")
  userAgent String?  @map("user_agent")
  ipAddress String?  @map("ip_address")
  createdAt DateTime @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("refresh_tokens")
}

// ============================================================================
// 4. SEKOLAH & SISWA
// ============================================================================

model School {
  id          String      @id @default(cuid())
  npsn        String      @unique // Nomor Pokok Sekolah Nasional
  name        String
  level       SchoolLevel
  address     String
  cityId      String      @map("city_id")
  districtId  String      @map("district_id")
  phone       String?
  email       String?
  principalName String?   @map("principal_name") // Nama kepala sekolah
  logo        String?
  isActive    Boolean     @default(true) @map("is_active")
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")

  city      City     @relation(fields: [cityId], references: [id])
  district  District @relation(fields: [districtId], references: [id])
  users     User[]
  students  Student[]
  examRooms ExamRoom[]
  exams     Exam[]

  @@index([level])
  @@index([cityId])
  @@index([districtId])
  @@map("schools")
}

model Student {
  id          String   @id @default(cuid())
  nisn        String   @unique // Nomor Induk Siswa Nasional
  nis         String?  // Nomor Induk Siswa (lokal sekolah)
  fullName    String   @map("full_name")
  gender      Gender
  birthPlace  String?  @map("birth_place")
  birthDate   DateTime? @map("birth_date") @db.Date
  className   String   @map("class_name") // Contoh: "6A", "9B", "12 IPA 1"
  classYear   Int      @map("class_year") // Tahun ajaran masuk
  schoolId    String   @map("school_id")
  parentName  String?  @map("parent_name")
  parentPhone String?  @map("parent_phone")
  photo       String?
  isActive    Boolean  @default(true) @map("is_active")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  school             School              @relation(fields: [schoolId], references: [id])
  examRoomStudents   ExamRoomStudent[]
  studentAnswers     StudentAnswer[]
  examResults        ExamResult[]
  studentExamLogs    StudentExamLog[]

  @@index([schoolId])
  @@index([className])
  @@map("students")
}

// ============================================================================
// 5. MATA PELAJARAN & BANK SOAL
// ============================================================================

model Subject {
  id        String        @id @default(cuid())
  code      String        @unique // Contoh: "MTK", "IPA", "BIN"
  name      String        // Contoh: "Matematika", "IPA", "Bahasa Indonesia"
  levels    SchoolLevel[] // Jenjang yang menggunakan mapel ini
  isActive  Boolean       @default(true) @map("is_active")
  createdAt DateTime      @default(now()) @map("created_at")
  updatedAt DateTime      @updatedAt @map("updated_at")

  questionBanks QuestionBank[]

  @@map("subjects")
}

model QuestionBank {
  id          String      @id @default(cuid())
  title       String      // Contoh: "Bank Soal MTK SD Semester 1 2026"
  subjectId   String      @map("subject_id")
  level       SchoolLevel
  grade       Int         // Kelas: 1-6 (SD), 7-9 (SMP), 10-12 (SMA/SMK)
  semester    Int?        // 1 atau 2
  academicYear String     @map("academic_year") // "2025/2026"
  description String?
  createdById String      @map("created_by_id") // User FKKG
  isPublished Boolean     @default(false) @map("is_published")
  totalQuestions Int      @default(0) @map("total_questions")
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")

  subject   Subject    @relation(fields: [subjectId], references: [id])
  createdBy User       @relation(fields: [createdById], references: [id])
  questions Question[]
  exams     Exam[]

  @@index([subjectId])
  @@index([level, grade])
  @@index([createdById])
  @@map("question_banks")
}

model Question {
  id              String          @id @default(cuid())
  questionBankId  String          @map("question_bank_id")
  orderNumber     Int             @map("order_number")
  type            QuestionType
  content         String          // Konten soal (HTML/rich text)
  contentImages   String[]        @map("content_images") // URL gambar dalam soal
  contentAudio    String?         @map("content_audio") // URL audio (jika ada)
  difficulty      DifficultyLevel @default(SEDANG)
  points          Float           @default(1) // Bobot nilai
  explanation     String?         // Pembahasan soal
  createdAt       DateTime        @default(now()) @map("created_at")
  updatedAt       DateTime        @updatedAt @map("updated_at")

  questionBank    QuestionBank      @relation(fields: [questionBankId], references: [id], onDelete: Cascade)
  options         QuestionOption[]
  studentAnswers  StudentAnswer[]

  @@unique([questionBankId, orderNumber])
  @@index([questionBankId])
  @@index([type])
  @@map("questions")
}

model QuestionOption {
  id         String  @id @default(cuid())
  questionId String  @map("question_id")
  label      String  // "A", "B", "C", "D", "E"
  content    String  // Isi pilihan jawaban (HTML)
  image      String? // URL gambar pilihan (jika ada)
  isCorrect  Boolean @default(false) @map("is_correct")
  orderNumber Int    @map("order_number")

  question Question @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@index([questionId])
  @@map("question_options")
}

// ============================================================================
// 6. UJIAN (EXAM)
// ============================================================================

model Exam {
  id              String     @id @default(cuid())
  title           String     // "TKA Matematika SD Kelas 6 Gelombang 1"
  schoolId        String     @map("school_id")
  questionBankId  String     @map("question_bank_id")
  status          ExamStatus @default(DRAFT)
  duration        Int        // Durasi dalam menit
  totalQuestions  Int        @map("total_questions")
  passingScore    Float?     @map("passing_score") // Nilai KKM
  shuffleQuestions Boolean   @default(true) @map("shuffle_questions")
  shuffleOptions  Boolean    @default(true) @map("shuffle_options")
  showResult      Boolean    @default(false) @map("show_result") // Tampilkan hasil ke siswa?
  scheduledStartAt DateTime? @map("scheduled_start_at")
  scheduledEndAt   DateTime? @map("scheduled_end_at")
  instructions    String?    // Petunjuk ujian
  createdAt       DateTime   @default(now()) @map("created_at")
  updatedAt       DateTime   @updatedAt @map("updated_at")

  school        School        @relation(fields: [schoolId], references: [id])
  questionBank  QuestionBank  @relation(fields: [questionBankId], references: [id])
  examWaves     ExamWave[]
  examSessions  ExamSession[]
  examResults   ExamResult[]

  @@index([schoolId])
  @@index([status])
  @@index([scheduledStartAt])
  @@map("exams")
}

model ExamWave {
  id        String   @id @default(cuid())
  examId    String   @map("exam_id")
  name      String   // "Gelombang 1", "Gelombang 2"
  waveNumber Int     @map("wave_number")
  startDate DateTime @map("start_date") @db.Date
  endDate   DateTime @map("end_date") @db.Date
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  exam     Exam          @relation(fields: [examId], references: [id], onDelete: Cascade)
  sessions ExamSession[]

  @@unique([examId, waveNumber])
  @@index([examId])
  @@map("exam_waves")
}

model ExamSession {
  id          String        @id @default(cuid())
  examId      String        @map("exam_id")
  waveId      String?       @map("wave_id")
  name        String        // "Sesi 1 - Pagi", "Sesi 2 - Siang"
  sessionNumber Int         @map("session_number")
  startTime   DateTime      @map("start_time")
  endTime     DateTime      @map("end_time")
  status      SessionStatus @default(WAITING)
  createdAt   DateTime      @default(now()) @map("created_at")
  updatedAt   DateTime      @updatedAt @map("updated_at")

  exam            Exam              @relation(fields: [examId], references: [id], onDelete: Cascade)
  wave            ExamWave?         @relation(fields: [waveId], references: [id])
  examRoomStudents ExamRoomStudent[]
  proctorSessions ProctorSession[]

  @@unique([examId, sessionNumber, waveId])
  @@index([examId])
  @@index([status])
  @@map("exam_sessions")
}

model ExamRoom {
  id        String   @id @default(cuid())
  schoolId  String   @map("school_id")
  name      String   // "Lab Komputer 1", "Ruang 201"
  capacity  Int      // Kapasitas komputer/siswa
  isActive  Boolean  @default(true) @map("is_active")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  school           School            @relation(fields: [schoolId], references: [id])
  examRoomStudents ExamRoomStudent[]

  @@index([schoolId])
  @@map("exam_rooms")
}

model ExamRoomStudent {
  id          String            @id @default(cuid())
  sessionId   String            @map("session_id")
  roomId      String            @map("room_id")
  studentId   String            @map("student_id")
  seatNumber  Int?              @map("seat_number") // Nomor kursi/komputer
  status      StudentExamStatus @default(NOT_STARTED)
  token       String?           @unique // Token login untuk client siswa
  startedAt   DateTime?         @map("started_at")
  submittedAt DateTime?         @map("submitted_at")
  ipAddress   String?           @map("ip_address")
  clientInfo  String?           @map("client_info") // Info perangkat siswa
  createdAt   DateTime          @default(now()) @map("created_at")
  updatedAt   DateTime          @updatedAt @map("updated_at")

  session  ExamSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  room     ExamRoom    @relation(fields: [roomId], references: [id])
  student  Student     @relation(fields: [studentId], references: [id])

  @@unique([sessionId, studentId])
  @@index([sessionId])
  @@index([roomId])
  @@index([studentId])
  @@index([token])
  @@map("exam_room_students")
}

// ============================================================================
// 7. JAWABAN & HASIL
// ============================================================================

model StudentAnswer {
  id              String   @id @default(cuid())
  studentId       String   @map("student_id")
  questionId      String   @map("question_id")
  examSessionId   String   @map("exam_session_id")
  selectedOptionId String? @map("selected_option_id") // Untuk PG
  answerText      String?  @map("answer_text") // Untuk Essay/Isian
  isMarked        Boolean  @default(false) @map("is_marked") // Ditandai ragu-ragu
  answeredAt      DateTime? @map("answered_at")
  isCorrect       Boolean? @map("is_correct") // null = belum dinilai (essay)
  score           Float?   // Nilai per soal
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  student  Student  @relation(fields: [studentId], references: [id])
  question Question @relation(fields: [questionId], references: [id])

  essayGrading EssayGrading?

  @@unique([studentId, questionId, examSessionId])
  @@index([studentId, examSessionId])
  @@index([questionId])
  @@map("student_answers")
}

model EssayGrading {
  id              String   @id @default(cuid())
  studentAnswerId String   @unique @map("student_answer_id")
  gradedById      String   @map("graded_by_id") // User FKKG yang mengoreksi
  score           Float
  feedback        String?
  gradedAt        DateTime @default(now()) @map("graded_at")

  studentAnswer StudentAnswer @relation(fields: [studentAnswerId], references: [id])
  gradedBy      User          @relation(fields: [gradedById], references: [id])

  @@map("essay_gradings")
}

model ExamResult {
  id              String   @id @default(cuid())
  studentId       String   @map("student_id")
  examId          String   @map("exam_id")
  totalCorrect    Int      @map("total_correct")
  totalWrong      Int      @map("total_wrong")
  totalUnanswered Int      @map("total_unanswered")
  totalScore      Float    @map("total_score")
  maxScore        Float    @map("max_score")
  percentage      Float    // Persentase nilai
  isPassed        Boolean? @map("is_passed") // Lulus KKM?
  rank            Int?     // Peringkat di sekolah
  duration        Int?     // Durasi pengerjaan dalam detik
  calculatedAt    DateTime @default(now()) @map("calculated_at")
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  student Student @relation(fields: [studentId], references: [id])
  exam    Exam    @relation(fields: [examId], references: [id])

  @@unique([studentId, examId])
  @@index([examId])
  @@index([studentId])
  @@index([percentage])
  @@map("exam_results")
}

// ============================================================================
// 8. PROKTOR & MONITORING
// ============================================================================

model ProctorSession {
  id            String   @id @default(cuid())
  userId        String   @map("user_id") // User proktor
  examSessionId String   @map("exam_session_id")
  startedAt     DateTime @default(now()) @map("started_at")
  endedAt       DateTime? @map("ended_at")
  ipAddress     String?  @map("ip_address")
  deviceInfo    String?  @map("device_info")

  user        User        @relation(fields: [userId], references: [id])
  examSession ExamSession @relation(fields: [examSessionId], references: [id])

  @@index([userId])
  @@index([examSessionId])
  @@map("proctor_sessions")
}

model StudentExamLog {
  id          String   @id @default(cuid())
  studentId   String   @map("student_id")
  sessionId   String   @map("session_id")
  eventType   String   @map("event_type")
  // Event types: CONNECTED, DISCONNECTED, FOCUS_LOST, FOCUS_GAINED,
  //              FULLSCREEN_EXIT, BLOCKED_KEY, SUSPICIOUS_PROCESS,
  //              ANSWER_SAVED, EXAM_SUBMITTED
  eventData   Json?    @map("event_data")
  ipAddress   String?  @map("ip_address")
  occurredAt  DateTime @default(now()) @map("occurred_at")

  student Student @relation(fields: [studentId], references: [id])

  @@index([studentId, sessionId])
  @@index([eventType])
  @@index([occurredAt])
  @@map("student_exam_logs")
}

// ============================================================================
// 9. NOTIFIKASI & AUDIT
// ============================================================================

model Notification {
  id        String           @id @default(cuid())
  userId    String           @map("user_id")
  type      NotificationType
  title     String
  message   String
  data      Json?            // Data tambahan (link, reference ID, dll)
  isRead    Boolean          @default(false) @map("is_read")
  readAt    DateTime?        @map("read_at")
  createdAt DateTime         @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, isRead])
  @@index([createdAt])
  @@map("notifications")
}

model AuditLog {
  id         String      @id @default(cuid())
  userId     String?     @map("user_id")
  action     AuditAction
  entity     String      // Nama tabel/model yang diubah
  entityId   String?     @map("entity_id")
  oldData    Json?       @map("old_data")
  newData    Json?       @map("new_data")
  ipAddress  String?     @map("ip_address")
  userAgent  String?     @map("user_agent")
  occurredAt DateTime    @default(now()) @map("occurred_at")

  user User? @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([action])
  @@index([entity, entityId])
  @@index([occurredAt])
  @@map("audit_logs")
}

// ============================================================================
// 10. SYSTEM & KONFIGURASI
// ============================================================================

model AppSetting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String
  group     String   // "general", "email", "exam", "security"
  description String?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@index([group])
  @@map("app_settings")
}

model AppRelease {
  id          String      @id @default(cuid())
  appType     AppType     @map("app_type")
  platform    AppPlatform
  version     String      // Semantic versioning: "1.0.0"
  downloadUrl String      @map("download_url")
  fileSize    BigInt      @map("file_size") // Dalam bytes
  checksum    String      // SHA256 hash untuk verifikasi
  releaseNotes String?    @map("release_notes")
  isLatest    Boolean     @default(false) @map("is_latest")
  isMandatory Boolean     @default(false) @map("is_mandatory") // Wajib update?
  publishedAt DateTime    @default(now()) @map("published_at")
  createdAt   DateTime    @default(now()) @map("created_at")

  @@unique([appType, platform, version])
  @@index([appType, platform, isLatest])
  @@map("app_releases")
}

model AcademicYear {
  id        String   @id @default(cuid())
  name      String   @unique // "2025/2026"
  startDate DateTime @map("start_date") @db.Date
  endDate   DateTime @map("end_date") @db.Date
  isCurrent Boolean  @default(false) @map("is_current")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("academic_years")
}
```

### 📊 Statistik Database

```
┌──────────────────────────────────────┐
│        DATABASE STATISTICS           │
├──────────────────────┬───────────────┤
│ Total Tabel          │ 24 tabel      │
│ Total Enum           │ 12 enum       │
│ Total Index          │ 35+ index     │
│ Unique Constraints   │ 18+           │
│ Foreign Keys         │ 30+           │
│ Cascade Deletes      │ 7             │
└──────────────────────┴───────────────┘
```

---

**✅ Database Schema sudah FINAL & DETAIL.**

---

# 🔷 LANGKAH 3: API SPECIFICATION

## 📡 API Design (RESTful + WebSocket)

### Base Configuration

```
Base URL     : https://api.tka-ujian.id/v1
Auth         : Bearer JWT Token
Content-Type : application/json
Rate Limit   : 100 req/min (general), 30 req/min (auth)
```

### Response Format Standard

```typescript name=src/common/types/api-response.ts
// Sukses
{
  "success": true,
  "statusCode": 200,
  "message": "Data retrieved successfully",
  "data": { ... },
  "meta": {                    // Untuk list/pagination
    "page": 1,
    "perPage": 20,
    "totalItems": 150,
    "totalPages": 8
  }
}

// Error
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is already taken"
    }
  ]
}
```

---

## 📋 COMPLETE API ENDPOINT LIST

### 🔐 Module 1: Authentication

```yaml name=docs/api/01-authentication.yaml
# ============================================================
# AUTHENTICATION ENDPOINTS
# ============================================================

POST   /auth/login
  # Body: { username, password }
  # Response: { accessToken, refreshToken, user }
  # Access: Public

POST   /auth/refresh
  # Body: { refreshToken }
  # Response: { accessToken, refreshToken }
  # Access: Public

POST   /auth/logout
  # Header: Authorization Bearer
  # Response: { message }
  # Access: All authenticated

POST   /auth/forgot-password
  # Body: { email }
  # Response: { message }
  # Access: Public

POST   /auth/reset-password
  # Body: { token, newPassword }
  # Response: { message }
  # Access: Public

PUT    /auth/change-password
  # Body: { currentPassword, newPassword }
  # Response: { message }
  # Access: All authenticated

GET    /auth/me
  # Response: { user profile data }
  # Access: All authenticated

PUT    /auth/profile
  # Body: { fullName, phone, avatar }
  # Response: { updated user }
  # Access: All authenticated

# --- PROKTOR & CLIENT AUTH ---

POST   /auth/proctor/login
  # Body: { schoolCode, username, password }
  # Response: { accessToken, proctorSession }
  # Access: PROKTOR

POST   /auth/student/login
  # Body: { token } (token dari kartu ujian)
  # Response: { accessToken, studentInfo, examInfo }
  # Access: Siswa (via Client App)
```

### 👥 Module 2: User Management

```yaml name=docs/api/02-users.yaml
# ============================================================
# USER MANAGEMENT ENDPOINTS
# Access: SUPER_ADMIN (full), ADMIN_DISDIK (read users in city)
# ============================================================

GET    /users
  # Query: ?page=1&perPage=20&role=ADMIN_SEKOLAH&cityId=xxx&search=xxx
  # Response: paginated list of users

POST   /users
  # Body: { email, username, password, fullName, phone, role, cityId?, schoolId? }
  # Access: SUPER_ADMIN

GET    /users/:id
  # Response: user detail

PUT    /users/:id
  # Body: { fullName, phone, role, isActive, cityId?, schoolId? }
  # Access: SUPER_ADMIN

DELETE /users/:id
  # Soft delete (set isActive = false)
  # Access: SUPER_ADMIN

PUT    /users/:id/toggle-status
  # Toggle isActive
  # Access: SUPER_ADMIN

POST   /users/:id/reset-password
  # Reset password by admin
  # Access: SUPER_ADMIN
```

### 🌍 Module 3: Regional (Wilayah)

```yaml name=docs/api/03-regional.yaml
# ============================================================
# REGIONAL ENDPOINTS
# Access: SUPER_ADMIN (CUD), All authenticated (Read)
# ============================================================

# --- Provinces ---
GET    /provinces
  # Query: ?search=xxx
GET    /provinces/:id
POST   /provinces
  # Body: { code, name }
PUT    /provinces/:id
DELETE /provinces/:id

# --- Cities ---
GET    /cities
  # Query: ?provinceId=xxx&search=xxx
GET    /cities/:id
POST   /cities
  # Body: { code, name, provinceId }
PUT    /cities/:id
DELETE /cities/:id

# --- Districts ---
GET    /districts
  # Query: ?cityId=xxx&search=xxx
GET    /districts/:id
POST   /districts
  # Body: { code, name, cityId }
PUT    /districts/:id
DELETE /districts/:id
```

### 🏫 Module 4: School Management

```yaml name=docs/api/04-schools.yaml
# ============================================================
# SCHOOL MANAGEMENT ENDPOINTS
# Access: SUPER_ADMIN (full), ADMIN_DISDIK (read in city),
#         ADMIN_SEKOLAH (read own)
# ============================================================

GET    /schools
  # Query: ?page=1&perPage=20&level=SD&cityId=xxx&districtId=xxx
  #        &search=xxx&isActive=true
  # Access: SUPER_ADMIN, ADMIN_DISDIK

POST   /schools
  # Body: { npsn, name, level, address, cityId, districtId,
  #         phone?, email?, principalName?, logo? }
  # Access: SUPER_ADMIN

GET    /schools/:id
  # Response: school detail + statistics

PUT    /schools/:id
  # Access: SUPER_ADMIN

DELETE /schools/:id
  # Soft delete
  # Access: SUPER_ADMIN

GET    /schools/:id/statistics
  # Response: { totalStudents, totalExams, avgScore, ... }
  # Access: SUPER_ADMIN, ADMIN_DISDIK, ADMIN_SEKOLAH (own)

GET    /schools/:id/students
  # Shortcut to get students of a school

GET    /schools/:id/exams
  # Shortcut to get exams of a school
```

### 👨‍🎓 Module 5: Student Management

```yaml name=docs/api/05-students.yaml
# ============================================================
# STUDENT MANAGEMENT ENDPOINTS
# Access: ADMIN_SEKOLAH (own school), SUPER_ADMIN (all)
# ============================================================

GET    /students
  # Query: ?page=1&perPage=20&schoolId=xxx&className=6A
  #        &search=xxx&isActive=true

POST   /students
  # Body: { nisn, nis?, fullName, gender, birthPlace?, birthDate?,
  #         className, classYear, schoolId, parentName?, parentPhone?, photo? }

GET    /students/:id

PUT    /students/:id

DELETE /students/:id
  # Soft delete

POST   /students/import
  # Body: multipart/form-data { file: Excel/CSV }
  # Response: { imported: 45, skipped: 3, errors: [...] }

GET    /students/import/template
  # Download template Excel untuk import

POST   /students/:id/exam-card
  # Generate & download kartu ujian siswa (PDF)

POST   /students/exam-cards/batch
  # Body: { studentIds: [...] } atau { className: "6A" }
  # Generate kartu ujian batch (PDF)
```

### 📝 Module 6: Question Bank & Questions

```yaml name=docs/api/06-questions.yaml
# ============================================================
# QUESTION BANK & QUESTIONS ENDPOINTS
# Access: ADMIN_FKKG (full), SUPER_ADMIN (read)
# ============================================================

# --- Question Banks ---
GET    /question-banks
  # Query: ?page=1&perPage=20&subjectId=xxx&level=SD&grade=6
  #        &isPublished=true&search=xxx

POST   /question-banks
  # Body: { title, subjectId, level, grade, semester?, academicYear,
  #         description? }

GET    /question-banks/:id
  # Response: bank detail + questions summary

PUT    /question-banks/:id

DELETE /question-banks/:id

PUT    /question-banks/:id/publish
  # Publish bank soal (lock dari editing)

PUT    /question-banks/:id/unpublish
  # Unpublish untuk editing ulang

POST   /question-banks/:id/duplicate
  # Duplikasi bank soal beserta semua soal

# --- Questions (within a bank) ---
GET    /question-banks/:bankId/questions
  # Query: ?type=PILIHAN_GANDA&difficulty=MUDAH

POST   /question-banks/:bankId/questions
  # Body: { orderNumber, type, content, contentImages?, contentAudio?,
  #         difficulty, points, explanation?,
  #         options?: [{ label, content, image?, isCorrect }] }

GET    /question-banks/:bankId/questions/:id

PUT    /question-banks/:bankId/questions/:id

DELETE /question-banks/:bankId/questions/:id

PUT    /question-banks/:bankId/questions/reorder
  # Body: { orders: [{ id: "xxx", orderNumber: 1 }, ...] }

POST   /question-banks/:bankId/questions/import
  # Body: multipart/form-data { file: Excel/CSV }
  # Import soal dari file

GET    /question-banks/:bankId/questions/import/template
  # Download template import soal

POST   /question-banks/:bankId/questions/:id/upload-media
  # Body: multipart/form-data { file: image/audio }
  # Upload gambar/audio untuk soal

# --- Question Analysis ---
GET    /question-banks/:bankId/analysis
  # Response: analisis butir soal (daya pembeda, tingkat kesukaran, dll)
  # Available setelah ujian selesai
```

### 📋 Module 7: Exam Management

```yaml name=docs/api/07-exams.yaml
# ============================================================
# EXAM MANAGEMENT ENDPOINTS
# Access: ADMIN_SEKOLAH (own school), ADMIN_FKKG (monitoring),
#         ADMIN_DISDIK (read), SUPER_ADMIN (all)
# ============================================================

# --- Exams ---
GET    /exams
  # Query: ?page=1&perPage=20&schoolId=xxx&status=SCHEDULED
  #        &questionBankId=xxx&search=xxx

POST   /exams
  # Body: { title, schoolId, questionBankId, duration, totalQuestions,
  #         passingScore?, shuffleQuestions?, shuffleOptions?,
  #         showResult?, scheduledStartAt?, scheduledEndAt?,
  #         instructions? }
  # Access: ADMIN_SEKOLAH

GET    /exams/:id
  # Response: exam detail + waves + sessions + rooms stats

PUT    /exams/:id
  # Only when status = DRAFT
  # Access: ADMIN_SEKOLAH

DELETE /exams/:id
  # Only when status = DRAFT
  # Access: ADMIN_SEKOLAH

PUT    /exams/:id/status
  # Body: { status: "SCHEDULED" | "CANCELLED" }
  # Access: ADMIN_SEKOLAH

# --- Exam Waves ---
GET    /exams/:examId/waves

POST   /exams/:examId/waves
  # Body: { name, waveNumber, startDate, endDate }

PUT    /exams/:examId/waves/:id

DELETE /exams/:examId/waves/:id

# --- Exam Sessions ---
GET    /exams/:examId/sessions
  # Query: ?waveId=xxx&status=WAITING

POST   /exams/:examId/sessions
  # Body: { name, sessionNumber, waveId?, startTime, endTime }

PUT    /exams/:examId/sessions/:id

DELETE /exams/:examId/sessions/:id

# --- Exam Rooms ---
GET    /exam-rooms
  # Query: ?schoolId=xxx

POST   /exam-rooms
  # Body: { schoolId, name, capacity }

PUT    /exam-rooms/:id

DELETE /exam-rooms/:id

# --- Student-Room-Session Mapping ---
GET    /exams/:examId/sessions/:sessionId/students
  # Daftar siswa di sesi ini beserta ruangannya

POST   /exams/:examId/sessions/:sessionId/assign-students
  # Body: { assignments: [{ studentId, roomId, seatNumber? }] }

POST   /exams/:examId/sessions/:sessionId/auto-assign
  # Auto-assign siswa ke ruangan berdasarkan kapasitas
  # Body: { studentIds: [...], roomIds: [...] }

DELETE /exams/:examId/sessions/:sessionId/students/:studentId
  # Remove siswa dari sesi

POST   /exams/:examId/sessions/:sessionId/generate-tokens
  # Generate token login untuk semua siswa di sesi ini
  # Response: { tokens: [{ studentId, token, studentName }] }
```

### 🖥️ Module 8: Proctor (Pengawas Ujian)

```yaml name=docs/api/08-proctor.yaml
# ============================================================
# PROCTOR ENDPOINTS
# Access: PROKTOR (own sessions)
# ============================================================

GET    /proctor/sessions
  # List sesi ujian yang di-assign ke proktor ini

GET    /proctor/sessions/:sessionId
  # Detail sesi + daftar siswa + status real-time

POST   /proctor/sessions/:sessionId/start
  # Mulai ujian di sesi ini
  # Broadcast ke semua client siswa via WebSocket

POST   /proctor/sessions/:sessionId/pause
  # Pause ujian (timer berhenti)

POST   /proctor/sessions/:sessionId/resume
  # Resume ujian

POST   /proctor/sessions/:sessionId/end
  # Akhiri ujian (force submit semua siswa)

POST   /proctor/sessions/:sessionId/extend-time
  # Body: { additionalMinutes: 15 }
  # Tambah waktu ujian

POST   /proctor/sessions/:sessionId/students/:studentId/force-submit
  # Force submit jawaban siswa tertentu

POST   /proctor/sessions/:sessionId/students/:studentId/kick
  # Kick siswa dari ujian (misal: kecurangan)
  # Body: { reason: "..." }

GET    /proctor/sessions/:sessionId/logs
  # Activity log sesi ujian
  # Query: ?studentId=xxx&eventType=FOCUS_LOST

GET    /proctor/sessions/:sessionId/statistics
  # Statistik real-time: progress pengerjaan, rata-rata, dll
```

### 💻 Module 9: Student Exam (Client Siswa)

```yaml name=docs/api/09-student-exam.yaml
# ============================================================
# STUDENT EXAM ENDPOINTS (diakses dari Client App)
# Access: Authenticated Student (via token)
# ============================================================

GET    /student-exam/info
  # Info ujian: nama ujian, durasi, jumlah soal, instruksi
  # Response: { exam, session, student, status }

GET    /student-exam/status
  # Status: WAITING / ACTIVE / SUBMITTED
  # Cek apakah proktor sudah mulai ujian

GET    /student-exam/questions
  # Ambil semua soal (setelah ujian dimulai)
  # Response: soal dalam urutan yang sudah di-shuffle
  # Kunci jawaban TIDAK disertakan

GET    /student-exam/questions/:questionId
  # Detail 1 soal + jawaban siswa saat ini

POST   /student-exam/questions/:questionId/answer
  # Body: { selectedOptionId? } atau { answerText? }
  # Auto-save jawaban siswa

PUT    /student-exam/questions/:questionId/mark
  # Body: { isMarked: true/false }
  # Tandai soal ragu-ragu

GET    /student-exam/progress
  # Response: { answered: 35, unanswered: 15, marked: 5, total: 50 }

POST   /student-exam/submit
  # Submit ujian final
  # Response: { message, submittedAt }

GET    /student-exam/time-remaining
  # Sisa waktu dalam detik

# --- Sync (untuk offline mode) ---
POST   /student-exam/sync
  # Body: { answers: [{ questionId, selectedOptionId?, answerText?, answeredAt }] }
  # Sync jawaban yang disimpan secara lokal saat offline
```

### 📊 Module 10: Results & Reports

```yaml name=docs/api/10-results.yaml
# ============================================================
# RESULTS & REPORTS ENDPOINTS
# Access: varies by role
# ============================================================

# --- Exam Results ---
GET    /results/exams/:examId
  # Hasil ujian per exam (semua siswa)
  # Query: ?page=1&perPage=20&sortBy=percentage&order=desc
  # Access: ADMIN_SEKOLAH, ADMIN_FKKG, ADMIN_DISDIK, SUPER_ADMIN

GET    /results/exams/:examId/summary
  # Ringkasan: rata-rata, median, tertinggi, terendah, distribusi nilai
  # Access: All admin roles

GET    /results/exams/:examId/students/:studentId
  # Detail hasil per siswa (jawaban per soal)
  # Access: ADMIN_SEKOLAH, ADMIN_FKKG

GET    /results/schools/:schoolId
  # Semua hasil ujian sekolah tertentu
  # Query: ?examId=xxx&className=6A
  # Access: ADMIN_SEKOLAH (own), ADMIN_DISDIK, ADMIN_FKKG

GET    /results/schools/:schoolId/ranking
  # Peringkat siswa di sekolah
  # Query: ?examId=xxx

# --- FKKG: Grading Essay ---
GET    /grading/exams/:examId/essays
  # List jawaban essay yang perlu dikoreksi
  # Query: ?schoolId=xxx&status=ungraded&page=1

POST   /grading/essays/:studentAnswerId
  # Body: { score, feedback? }
  # Koreksi jawaban essay

POST   /grading/exams/:examId/calculate
  # Hitung ulang nilai setelah essay selesai dikoreksi

# --- Reports & Export ---
GET    /reports/exams/:examId/export/pdf
  # Download laporan ujian dalam PDF

GET    /reports/exams/:examId/export/excel
  # Download laporan ujian dalam Excel

GET    /reports/schools/:schoolId/export/pdf
  # Laporan sekolah (semua ujian)

GET    /reports/schools/:schoolId/students/:studentId/transcript
  # Transkrip nilai siswa (semua ujian)
```

### 📈 Module 11: Dashboard & Analytics

```yaml name=docs/api/11-dashboard.yaml
# ============================================================
# DASHBOARD & ANALYTICS ENDPOINTS
# ============================================================

# --- Super Admin Dashboard ---
GET    /dashboard/super-admin
  # Response: {
  #   totalSchools, totalStudents, totalExams,
  #   activeExams, totalQuestionBanks, totalUsers,
  #   recentActivities, systemHealth
  # }

# --- Disdik Dashboard ---
GET    /dashboard/disdik
  # Response: {
  #   schoolsByLevel: { SD: 45, SMP: 30, SMA: 15, SMK: 10 },
  #   totalStudents, activeExams,
  #   avgScoreByLevel, avgScoreBySubject,
  #   topSchools, bottomSchools,
  #   examCompletion, trendData
  # }

GET    /dashboard/disdik/schools-map
  # Data untuk peta sebaran sekolah
  # Response: [{ schoolId, name, lat, lng, level, studentCount }]

GET    /dashboard/disdik/comparison
  # Perbandingan antar sekolah
  # Query: ?schoolIds=id1,id2,id3&examId=xxx

# --- FKKG Dashboard ---
GET    /dashboard/fkkg
  # Response: {
  #   totalQuestionBanks, publishedBanks, draftBanks,
  #   totalQuestions, pendingEssayGrading,
  #   upcomingExams, recentExamResults
  # }

# --- Admin Sekolah Dashboard ---
GET    /dashboard/school
  # Response: {
  #   schoolInfo, totalStudents, studentsByClass,
  #   upcomingExams, recentResults,
  #   examRooms, notifications
  # }
```

### 🔔 Module 12: Notifications

```yaml name=docs/api/12-notifications.yaml
# ============================================================
# NOTIFICATION ENDPOINTS
# Access: All authenticated (own notifications)
# ============================================================

GET    /notifications
  # Query: ?page=1&perPage=20&isRead=false&type=EXAM_SCHEDULED

GET    /notifications/unread-count
  # Response: { count: 5 }

PUT    /notifications/:id/read
  # Tandai sudah dibaca

PUT    /notifications/read-all
  # Tandai semua sudah dibaca

DELETE /notifications/:id
```

### ⚙️ Module 13: Settings & System

```yaml name=docs/api/13-settings.yaml
# ============================================================
# SETTINGS & SYSTEM ENDPOINTS
# Access: SUPER_ADMIN
# ============================================================

# --- App Settings ---
GET    /settings
  # Query: ?group=general
GET    /settings/:key
PUT    /settings/:key
  # Body: { value: "..." }

# --- App Releases (Proktor & Client download) ---
GET    /releases
  # Query: ?appType=PROKTOR&platform=WINDOWS
GET    /releases/latest
  # Query: ?appType=CLIENT_SISWA&platform=WINDOWS
  # Untuk auto-update check
POST   /releases
  # Body: multipart/form-data { appType, platform, version,
  #        file, releaseNotes?, isMandatory? }
  # Access: SUPER_ADMIN

# --- Academic Years ---
GET    /academic-years
POST   /academic-years
PUT    /academic-years/:id
PUT    /academic-years/:id/set-current

# --- Subjects ---
GET    /subjects
  # Query: ?level=SD&search=xxx
POST   /subjects
PUT    /subjects/:id
DELETE /subjects/:id

# --- Audit Logs ---
GET    /audit-logs
  # Query: ?userId=xxx&action=LOGIN&entity=exams
  #        &startDate=xxx&endDate=xxx&page=1&perPage=50
```

### 🔌 Module 14: WebSocket Events

```yaml name=docs/api/14-websocket.yaml
# ============================================================
# WEBSOCKET EVENTS (Socket.io)
# Namespace: /exam
# ============================================================

# --- Connection ---
# Client connects with: io("/exam", { auth: { token: "jwt..." } })

# === PROKTOR EVENTS (emit & listen) ===

# Proktor emits:
proctor:join-session        # { sessionId }
proctor:start-exam          # { sessionId }
proctor:pause-exam          # { sessionId }
proctor:resume-exam         # { sessionId }
proctor:end-exam            # { sessionId }
proctor:extend-time         # { sessionId, additionalMinutes }
proctor:force-submit        # { sessionId, studentId }
proctor:kick-student        # { sessionId, studentId, reason }
proctor:send-message        # { sessionId, message } (broadcast ke siswa)

# Proktor listens:
student:connected           # { studentId, name, seatNumber }
student:disconnected        # { studentId, name }
student:progress-update     # { studentId, answered, total }
student:submitted           # { studentId, name, submittedAt }
student:alert               # { studentId, type, message }
                            # types: FOCUS_LOST, FULLSCREEN_EXIT,
                            #        SUSPICIOUS_PROCESS, RECONNECTED
session:statistics          # { online, offline, submitted, progress }

# === STUDENT EVENTS (emit & listen) ===

# Student emits:
student:join-session        # { sessionId, token }
student:heartbeat           # { sessionId } (setiap 10 detik)
student:answer-saved        # { questionId, optionId/answerText }
student:submit-exam         # { sessionId }
student:focus-lost          # { sessionId } (tab switch/minimize)
student:focus-gained        # { sessionId }
student:fullscreen-exit     # { sessionId }

# Student listens:
exam:started                # { startedAt, duration }
exam:paused                 # { pausedAt }
exam:resumed                # { resumedAt, remainingTime }
exam:ended                  # { endedAt, reason }
exam:time-extended          # { additionalMinutes, newEndTime }
exam:force-submitted        # { reason }
exam:kicked                 # { reason }
exam:message                # { from: "Proktor", message }
exam:time-warning           # { remainingMinutes: 5 }
```

---

## 📊 API Summary

```
┌──────────────────────────────────────────────────────────┐
│                   API STATISTICS                         │
├──────────────────────────────┬───────────────────────────┤
│ Total REST Endpoints         │ 95+ endpoints             │
│ Total WebSocket Events       │ 24 

## @FergiawanHinandi

apakah masih ada saran untuk membuat aplikasi semakin kuat dan canggih serta tahan banting dari setiap serangan

*System: User retried message*

## Copilot



# 🛡️ SARAN PENGUATAN SISTEM TKA

Ya, ada **banyak** penguatan yang sangat penting untuk project sekelas ini. Saya akan bahas secara menyeluruh dari semua aspek.

---

## 🔷 1. SECURITY HARDENING (Penguatan Keamanan)

### 1.1 Authentication & Authorization Lanjutan

```
┌─────────────────────────────────────────────────────────────────────┐
│              AUTHENTICATION ENHANCEMENT                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ✅ YANG SUDAH ADA:                                                │
│  └── JWT + RBAC + Refresh Token                                    │
│                                                                     │
│  🆕 TAMBAHAN YANG WAJIB:                                          │
│                                                                     │
│  1. Two-Factor Authentication (2FA)                                

## @FergiawanHinandi

apakah masih ada saran untuk membuat aplikasi semakin kuat dan canggih serta tahan banting dari setiap serangan dari semua sisi

*System: User retried message*

## Copilot



# 🛡️ SARAN PENGUATAN SISTEM TKA — ENTERPRISE GRADE

Saya akan berikan rekomendasi penguatan dari **SEMUA SISI** agar sistem ini benar-benar **production-ready, tahan banting, dan aman dari segala serangan**.

---

## 🔷 1. KEAMANAN (SECURITY HARDENING)

### 1.1 Authentication & Authorization yang Lebih Kuat

```typescript name=src/security/auth-hardening.ts
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
```

### 1.2 API Security Layer

```typescript name=src/security/api-protection.ts
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
```

### 1.3 Data Encryption

```typescript name=src/security/encryption.ts
// ============================================================
// ENKRIPSI DATA
// ============================================================

const ENCRYPTION_CONFIG = {
  // 1. Data at Rest (data tersimpan)
  atRest: {
    algorithm: 'AES-256-GCM',
    encryptedFields: [
      'students.nisn',              // Data pribadi siswa
      'students.parentPhone',
      'users.phone',
      'exam_room_students.token',   // Token ujian
    ],
    databaseEncryption: 'TDE',      // Transparent Data Encryption PostgreSQL
  },

  // 2. Data in Transit (data bergerak)
  inTransit: {
    tlsVersion: '1.3',             // Minimum TLS 1.3
    certificatePinning: true,       // Untuk desktop app
    hsts: true,
  },

  // 3. Soal Encryption
  examEncryption: {
    // Soal dienkripsi saat dikirim ke client
    // Decrypt hanya saat proktor memulai ujian
    algorithm: 'AES-256-CBC',
    keyDerivation: 'PBKDF2',
    keyRotation: 'per-session',     // Key berbeda tiap sesi
  },

  // 4. Backup Encryption
  backupEncryption: {
    algorithm: 'AES-256-GCM',
    keyManagement: 'envelope',       // Envelope encryption
  },
};
```

### 1.4 Anti-Fraud & Anti-Cheat (Exam Integrity)

```typescript name=src/security/anti-cheat.ts
// ============================================================
// ANTI-CHEAT SYSTEM (CLIENT SISWA)
// ============================================================

const ANTI_CHEAT_CONFIG = {
  // Level 1: Lockdown Mode Dasar
  basicLockdown: {
    fullscreenEnforcement: true,
    blockAltTab: true,
    blockAltF4: true,
    blockCtrlAltDel: false,          // OS-level, perlu driver khusus
    blockTaskManager: true,
    blockWindowsKey: true,
    blockCopyPaste: true,
    blockPrintScreen: true,
    blockContextMenu: true,
    blockDragDrop: true,
    blockNewWindow: true,
    blockDevTools: true,
    disableClipboard: true,
  },

  // Level 2: Environment Detection
  environmentCheck: {
    detectVirtualMachine: true,      // Block VM (VirtualBox, VMware)
    detectRemoteDesktop: true,       // Block TeamViewer, AnyDesk, RDP
    detectMultiMonitor: true,        // Block multi monitor
    detectScreenRecording: true,     // Block OBS, screen recorders
    detectSuspiciousProcesses: [     // Block proses mencurigakan
      'discord', 'telegram', 'whatsapp',
      'obs', 'bandicam', 'camtasia',
      'teamviewer', 'anydesk', 'rustdesk',
      'autohotkey', 'cheatengine',
    ],
    verifyProcessIntegrity: true,
  },

  // Level 3: Behavioral Analysis
  behaviorAnalysis: {
    tabSwitchDetection: true,
    focusLossTracking: true,
    mouseMovementPattern: true,      // Deteksi pola mouse tidak wajar
    typingPattern: true,             // Deteksi copy-paste via typing speed
    answerTimeAnalysis: true,        // Deteksi jawaban terlalu cepat
    maxFocusLossCount: 3,            // Maks 3x kehilangan focus
    autoSubmitOnExceed: true,        // Auto submit jika melebihi batas
  },

  // Level 4: Network Security
  networkSecurity: {
    allowedDomains: [                // Whitelist domain
      'api.tka-ujian.id',
      'cdn.tka-ujian.id',
    ],
    blockOtherNetwork: true,         // Block akses ke domain lain
    detectProxyVPN: true,            // Deteksi proxy/VPN
    certificatePinning: true,        // Pastikan koneksi ke server asli
  },

  // Level 5: Forensic Logging
  forensicLogging: {
    screenshotPeriodic: false,       // Opsional: screenshot berkala
    webcamMonitoring: false,         // Opsional: webcam proctoring
    keystrokeLogging: false,         // JANGAN: privacy concern
    allEventsLogged: true,           // Semua event dicatat
    logRetention: '1y',              // Simpan log 1 tahun
  },
};

// ============================================================
// ANTI-FRAUD SOAL (SERVER SIDE)
// ============================================================

const ANTI_FRAUD_EXAM = {
  // Soal di-shuffle per siswa (urutan berbeda)
  shuffleQuestions: true,
  shuffleOptions: true,

  // Soal dikirim bertahap (bukan sekaligus)
  questionDelivery: 'PROGRESSIVE', // Kirim soal 1 per 1, atau batch kecil

  // Prevent answer sharing
  questionPooling: true,
  // Dari 100 soal di bank, pilih random 50 per siswa
  // Setiap siswa dapat set soal berbeda

  // Time-based answer validation
  minAnswerTime: 3,                 // Min 3 detik per soal (anti bot)
  maxIdleTime: 300,                 // Maks 5 menit idle

  // Answer integrity
  answerHashing: true,              // Hash jawaban untuk deteksi manipulasi
  serverSideTimestamp: true,        // Timestamp dari server, bukan client
};
```

---

## 🔷 2. KETAHANAN SISTEM (RESILIENCE & HIGH AVAILABILITY)

### 2.1 Arsitektur High Availability

```
┌──────────────────────────────────────────────────────────────────────┐
│              ARSITEKTUR HIGH AVAILABILITY TKA                       │
│                                                                      │
│  ┌─────────────┐     ┌──────────────────────────┐                   │
│  │   CLOUDFLARE │     │     LOAD BALANCER        │                   │
│  │   (WAF+CDN)  │────→│     (Nginx/HAProxy)      │                   │
│  └─────────────┘     └──────────┬───────────────┘                   │
│                                  │                                    │
│                    ┌─────────────┼─────────────┐                     │
│                    ▼             ▼             ▼                      │
│              ┌──────────┐ ┌──────────┐ ┌──────────┐                 │
│              │ API SRV 1│ │ API SRV 2│ │ API SRV 3│  Auto-scale    │
│              └────┬─────┘ └────┬─────┘ └────┬─────┘                 │
│                   │            │            │                         │
│                   └─────────┬──┴────────────┘                        │
│                             ▼                                        │
│              ┌──────────────────────────────┐                        │
│              │    MESSAGE QUEUE (Redis/     │                        │
│              │    RabbitMQ/BullMQ)          │                        │
│              └──────────────┬───────────────┘                        │
│                             │                                        │
│              ┌──────────────┼─   ─────────────┐                        │
│              ▼              ▼               ▼                        │
│        ┌──────────┐  ┌──────────┐   ┌──────────────┐               │
│        │ PG Master│  │ PG Slave │   │ PG Slave     │               │
│        │ (Write)  │─→│ (Read 1) │   │ (Read 2)     │               │
│        └──────────┘  └──────────┘   └──────────────┘               │
│              │                                                       │
│              ▼                                                       │
│        ┌──────────┐  ┌──────────┐   ┌──────────────┐               │
│        │  Redis   │  │  Redis   │   │   MinIO      │               │
│        │  Primary │─→│  Replica │   │  (Storage)   │               │
│        └──────────┘  └──────────┘   └──────────────┘               │
│                                                                      │
│        ┌──────────────────────────────────────────┐                 │
│        │     BACKUP SERVER (Off-site/Cloud)       │                 │
│        │     Daily automated backup               │                 │
│        └──────────────────────────────────────────┘                 │
└──────────────────────────────────────────────────────────────────────┘
```

### 2.2 Database Resilience

```typescript name=src/infrastructure/database-resilience.ts
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
```

### 2.3 Fault Tolerance & Circuit Breaker

```typescript name=src/infrastructure/fault-tolerance.ts
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
```

---

## 🔷 3. OFFLINE-FIRST & DATA SYNC (CRITICAL untuk ujian)

```typescript name=src/exam-client/offline-engine.ts
// ============================================================
// OFFLINE-FIRST ENGINE UNTUK CLIENT SISWA
// ============================================================

const OFFLINE_ENGINE = {
  // 1. Pre-download soal sebelum ujian
  preExamSync: {
    // Saat siswa login, soal langsung di-download & simpan lokal
    downloadQuestions: true,
    downloadMedia: true,             // Gambar & audio soal
    encryptLocal: true,              // Enkripsi data lokal
    verifyChecksum: true,            // Verifikasi integritas
  },

  // 2. Local Database (better-sqlite3)
  localStorage: {
    engine: 'better-sqlite3',
    tables: [
      'local_questions',            // Soal ter-cache
      'local_answers',              // Jawaban siswa (utama!)
      'local_events',               // Event log
      'sync_queue',                 // Antrian sync
    ],
    encryption: 'AES-256',
    autoVacuum: true,
  },

  // 3. Answer Sync Strategy
  answerSync: {
    // Primary: simpan ke server via API
    // Fallback: simpan ke local SQLite
    strategy: 'LOCAL_FIRST',

    // Sync ke server setiap:
    syncInterval: 10_000,            // 10 detik
    syncOnAnswer: true,              // Setiap jawab soal
    syncOnSubmit: true,              // Saat submit
    syncOnReconnect: true,           // Saat koneksi kembali

    // Conflict Resolution
    conflictResolution: 'LAST_WRITE_WINS',
    // Jika ada konflik, jawaban terakhir yang menang
    // Semua versi tetap disimpan di log

    // Retry
    maxRetries: 'UNLIMITED',
    retryBackoff: 'EXPONENTIAL',
  },

  // 4. Connection Monitor
  connectionMonitor: {
    heartbeatInterval: 5_000,        // Ping setiap 5 detik
    offlineThreshold: 15_000,        // Offline jika 3x gagal
    onOffline: [
      'SHOW_OFFLINE_INDICATOR',
      'SWITCH_TO_LOCAL_STORAGE',
      'QUEUE_ALL_SYNCS',
    ],
    onOnline: [
      'SHOW_ONLINE_INDICATOR',
      'FLUSH_SYNC_QUEUE',
      'VERIFY_DATA_INTEGRITY',
    ],
  },

  // 5. Data Integrity Guarantee
  integrityGuarantee: {
    // JAWABAN SISWA TIDAK BOLEH HILANG
    answerWriteStrategy: 'WRITE_AHEAD_LOG',
    walEnabled: true,
    doubleWrite: true,               // Tulis ke memory + disk
    checksumVerification: true,
    // Saat submit:
    submitVerification: {
      verifyAllAnswersSaved: true,
      compareLocalVsServer: true,
      generateSubmitReceipt: true,   // Bukti submit (hash)
    },
  },
};
```

---

## 🔷 4. PERFORMANCE & SCALABILITY

### 4.1 Caching Strategy

```typescript name=src/infrastructure/caching.ts
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
```

### 4.2 Performance Optimization

```typescript name=src/infrastructure/performance.ts
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
```

---

## 🔷 5. MONITORING, LOGGING & ALERTING

```typescript name=src/infrastructure/observability.ts
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
```

---

## 🔷 6. DISASTER RECOVERY & BUSINESS CONTINUITY

```typescript name=src/infrastructure/disaster-recovery.ts
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
```

---

## 🔷 7. COMPLIANCE & DATA PROTECTION

```typescript name=src/infrastructure/compliance.ts
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
```

---

## 🔷 8. TAMBAHAN FITUR CANGGIH

### 8.1 Schema Database Tambahan

```prisma name=prisma/schema-additions.prisma
// ============================================================
// TAMBAHAN SCHEMA UNTUK FITUR CANGGIH
// ============================================================

// IP Blacklist (Anti brute force)
model IpBlacklist {
  id          String   @id @default(cuid())
  ipAddress   String   @unique @map("ip_address")
  reason      String
  blockedAt   DateTime @default(now()) @map("blocked_at")
  expiresAt   DateTime? @map("expires_at") // null = permanent
  blockedBy   String?  @map("blocked_by")

  @@index([ipAddress])
  @@index([expiresAt])
  @@map("ip_blacklist")
}

// Login Attempt Tracking
model LoginAttempt {
  id        String   @id @default(cuid())
  username  String
  ipAddress String   @map("ip_address")
  userAgent String?  @map("user_agent")
  success   Boolean
  failReason String? @map("fail_reason")
  attemptedAt DateTime @default(now()) @map("attempted_at")

  @@index([username, attemptedAt])
  @@index([ipAddress, attemptedAt])
  @@map("login_attempts")
}

// Device Fingerprint (bind session ke device)
model DeviceFingerprint {
  id          String   @id @default(cuid())
  userId      String   @map("user_id")
  fingerprint String   // Hash dari device info
  deviceName  String?  @map("device_name")
  os          String?
  browser     String?
  isTrusted   Boolean  @default(false) @map("is_trusted")
  lastUsedAt  DateTime @default(now()) @map("last_used_at")
  createdAt   DateTime @default(now()) @map("created_at")

  @@unique([userId, fingerprint])
  @@index([userId])
  @@map("device_fingerprints")
}

// Exam Incident Report (laporan insiden saat ujian)
model ExamIncident {
  id          String   @id @default(cuid())
  sessionId   String   @map("session_id")
  studentId   String?  @map("student_id")
  reportedBy  String   @map("reported_by") // User ID proktor
  type        String   // CHEATING, TECHNICAL, NETWORK, OTHER
  severity    String   // LOW, MEDIUM, HIGH, CRITICAL
  description String
  evidence    String[] // URL screenshots/logs
  action      String?  // Tindakan yang diambil
  resolvedAt  DateTime? @map("resolved_at")
  createdAt   DateTime @default(now()) @map("created_at")

  @@index([sessionId])
  @@index([studentId])
  @@map("exam_incidents")
}

// System Health Log
model SystemHealthLog {
  id          String   @id @default(cuid())
  service     String   // api, database, redis, minio, websocket
  status      String   // healthy, degraded, down
  responseTime Int?    @map("response_time") // ms
  details     Json?
  checkedAt   DateTime @default(now()) @map("checked_at")

  @@index([service, checkedAt])
  @@map("system_health_logs")
}

// Data Export Request (GDPR/UU PDP compliance)
model DataExportRequest {
  id          String   @id @default(cuid())
  requestedBy String   @map("requested_by")
  dataType    String   @map("data_type") // student_data, exam_results, etc
  scope       Json     // { schoolId, studentId, dateRange, etc }
  status      String   // pending, processing, completed, expired
  fileUrl     String?  @map("file_url")
  expiresAt   DateTime? @map("expires_at")
  createdAt   DateTime @default(now()) @map("created_at")
  completedAt DateTime? @map("completed_at")

  @@index([requestedBy])
  @@index([status])
  @@map("data_export_requests")
}
```

### 8.2 API Endpoints Tambahan

```yaml name=docs/api/15-security-endpoints.yaml
# ============================================================
# SECURITY & ADVANCED ENDPOINTS
# ============================================================

# --- IP Management ---
GET    /security/ip-blacklist
POST   /security/ip-blacklist
  # Body: { ipAddress, reason, expiresAt? }
DELETE /security/ip-blacklist/:id

GET    /security/login-attempts
  # Query: ?username=xxx&ipAddress=xxx&startDate=xxx

# --- Device Management ---
GET    /security/devices
  # List trusted devices user
PUT    /security/devices/:id/trust
DELETE /security/devices/:id
  # Revoke device

# --- 2FA ---
POST   /auth/2fa/setup
  # Response: { secret, qrCodeUrl }
POST   /auth/2fa/verify
  # Body: { code }
POST   /auth/2fa/disable
  # Body: { code, password }
GET    /auth/2fa/backup-codes
POST   /auth/2fa/regenerate-backup-codes

# --- Active Sessions ---
GET    /auth/sessions
  # List semua sesi aktif user
DELETE /auth/sessions/:id
  # Terminate sesi tertentu
DELETE /auth/sessions/all
  # Terminate semua sesi (logout everywhere)

# --- System Health ---
GET    /system/health
GET    /system/health/detailed
GET    /system/health/history
  # Query: ?service=database&hours=24

# --- Data Export (Compliance) ---
POST   /data-export/request
  # Body: { dataType, scope }
GET    /data-export/requests
GET    /data-export/requests/:id
GET    /data-export/requests/:id/download

# --- Exam Incidents ---
POST   /incidents
  # Body: { sessionId, studentId?, type, severity, description, evidence? }
GET    /incidents
  # Query: ?sessionId=xxx&type=CHEATING
PUT    /incidents/:id
  # Body: { action, resolvedAt? }
```

---

## 📊 RINGKASAN PENGUATAN

```
┌──────────────────────────────────────────────────────────────┐
│              TOTAL PENGUATAN YANG DITAMBAHKAN                │
├──────────────────────────────────┬───────────────────────────┤
│ Security Layers                  │ 5 layer proteksi          │
│ Anti-Cheat Levels                │ 5 level detection         │
│ Encryption Points                │ 4 (rest, transit,         │
│                                  │    soal, backup)          │
│ Database Resilience              │ Master-Slave + Backup 4   │
│                                  │    tier                   │
│ Caching Layers                   │ 3 layer (CDN, Redis, DB)  │
│ Monitoring Metrics               │ 17+ custom metrics        │
│ Alert Rules                      │ 7 automated alerts        │
│ New Database Tables              │ 6 tabel tambahan          │
│ New API Endpoints                │ 20+ endpoint tambahan     │
│ Compliance Frameworks            │ UU PDP Indonesia          │
│ DR Objectives                    │ RPO: 1h, RTO: 4h         │
│ Failover Scenarios               │ 4 skenario               │
│ Health Check Endpoints           │ 4 endpoint                │
├──────────────────────────────────┼───────────────────────────┤
│ TOTAL API ENDPOINTS              │ 115+ endpoints            │
│ TOTAL DATABASE TABLES            │ 30 tabel                  │
│ TOTAL ENUMS                      │ 12 enum                   │
└──────────────────────────────────┴───────────────────────────┘
```

---

## 🎯 PRIORITAS IMPLEMENTASI PENGUATAN

```
WAJIB (Fase 1 Development):
├── ✅ JWT RS256 + Refresh Token Rotation
├── ✅ RBAC + Row Level Security
├── ✅ Input validation & sanitization
├── ✅ Rate limiting
├── ✅ HTTPS + Security Headers
├── ✅ Offline-first client dengan local SQLite
├── ✅ Anti-cheat lockdown mode dasar
├── ✅ Database backup otomatis
└── ✅ Structured logging

PENTING (Fase 2 - Sebelum Launch):
├── ✅ 2FA untuk admin roles
├── ✅ Circuit breaker & retry pattern
├── ✅ Redis caching
├── ✅ Monitoring (Grafana + Sentry)
├── ✅ Anti-cheat environment detection
├── ✅ Data encryption at rest
├── ✅ IP blacklisting
└── ✅ Health check endpoints

LANJUTAN (Post-Launch Enhancement):
├── ✅ Anti-cheat behavioral analysis
├── ✅ Materialized views untuk dashboard
├── ✅ Distributed tracing (OpenTelemetry)
├── ✅ Database read replicas
├── ✅ Auto-scaling
├── ✅ DR drills
└── ✅ Compliance audit
```

---

Dengan seluruh penguatan ini, sistem TKA Anda akan setara dengan **platform ujian level enterprise** yang siap melayani **ribuan sekolah dan ratusan ribu siswa** dengan tingkat keamanan dan ketahanan yang sangat tinggi.

Ketiga langkah awal sudah **TUNTAS** sekarang:
1. ✅ **Tech Stack** — Final
2. ✅ **Database Schema** — 30 tabel lengkap dengan penguatan
3. ✅ **API Specification** — 115+ endpoints lengkap dengan WebSocket

**Saran saya untuk langkah berikutnya:**
1. **Setup Repository & Project Structure** — Buat folder structure untuk monorepo (backend, frontend web, proktor app, client app)
2. **Implementasi Database Migration** — Jalankan Prisma migrate untuk membuat semua tabel
3. **Mulai coding module Authentication** — Ini fondasi yang harus jadi duluan sebelum module lain

Silakan tentukan langkah mana yang mau kita kerjakan selanjutnya! 🚀

## @FergiawanHinandi

mari kita kerjakan secara bertahap dan berikan saran yang terbaik
Setup Repository & Project Structure — Buat folder structure untuk monorepo (backend, frontend web, proktor app, client app)
Implementasi Database Migration — Jalankan Prisma migrate untuk membuat semua tabel
Mulai coding module Authentication — Ini fondasi yang harus jadi duluan sebelum module lain

## Copilot



# 🔷 LANGKAH 1: SETUP REPOSITORY & PROJECT STRUCTURE

## 📦 Monorepo dengan Turborepo

Kita akan menggunakan **Turborepo** sebagai monorepo manager karena:
- ✅ Shared dependencies (hemat disk & konsisten versi)
- ✅ Parallel builds
- ✅ Cache builds (lebih cepat)
- ✅ Satu repository untuk semua apps

---

### 1.1 Root Structure

```
name=tka-ujian/
tka-ujian/
├── 📄 package.json                  # Root package.json (workspaces)
├── 📄 turbo.json                    # Turborepo config
├── 📄 .gitignore
├── 📄 .env.example
├── 📄 .eslintrc.js
├── 📄 .prettierrc
├── 📄 docker-compose.yml            # PostgreSQL, Redis, MinIO
├── 📄 docker-compose.prod.yml
├── 📄 README.md
│
├── 📁 apps/
│   ├── 📁 api/                      # Backend NestJS
│   ├── 📁 web/                      # Frontend Next.js
│   ├── 📁 proktor/                  # Desktop Electron (Proktor)
│   └── 📁 client-siswa/             # Desktop Electron (Client Siswa)
│
├── 📁 packages/
│   ├── 📁 shared-types/             # TypeScript types (shared)
│   ├── 📁 shared-utils/             # Utility functions (shared)
│   ├── 📁 shared-validators/        # Zod schemas (shared)
│   ├── 📁 ui/                       # Shared UI components
│   ├── 📁 eslint-config/            # Shared ESLint config
│   └── 📁 tsconfig/                 # Shared TypeScript config
│
├── 📁 docs/
│   ├── 📁 api/                      # API documentation
│   ├── 📁 architecture/             # Architecture diagrams
│   ├── 📁 deployment/               # Deployment guides
│   └── 📁 user-manual/              # User manuals per role
│
├── 📁 scripts/
│   ├── 📄 setup.sh                  # Initial setup script
│   ├── 📄 seed.ts                   # Database seeding
│   └── 📄 generate-keys.sh          # Generate RSA keys for JWT
│
└── 📁 .github/
    └── 📁 workflows/
        ├── 📄 ci.yml                # CI pipeline
        ├── 📄 deploy-api.yml        # Deploy backend
        ├── 📄 deploy-web.yml        # Deploy frontend
        └── 📄 build-desktop.yml     # Build Electron apps
```

### 1.2 Root Configuration Files

```json name=package.json
{
  "name": "tka-ujian",
  "version": "1.0.0",
  "private": true,
  "description": "Platform Tes Kemampuan Akademik - Monorepo",
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo dev",
    "dev:api": "turbo dev --filter=@tka/api",
    "dev:web": "turbo dev --filter=@tka/web",
    "dev:proktor": "turbo dev --filter=@tka/proktor",
    "dev:client": "turbo dev --filter=@tka/client-siswa",
    "build": "turbo build",
    "build:api": "turbo build --filter=@tka/api",
    "build:web": "turbo build --filter=@tka/web",
    "build:proktor": "turbo build --filter=@tka/proktor",
    "build:client": "turbo build --filter=@tka/client-siswa",
    "lint": "turbo lint",
    "test": "turbo test",
    "test:e2e": "turbo test:e2e",
    "db:migrate": "turbo db:migrate --filter=@tka/api",
    "db:seed": "turbo db:seed --filter=@tka/api",
    "db:studio": "turbo db:studio --filter=@tka/api",
    "db:reset": "turbo db:reset --filter=@tka/api",
    "clean": "turbo clean",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "setup": "bash scripts/setup.sh",
    "generate:keys": "bash scripts/generate-keys.sh"
  },
  "devDependencies": {
    "turbo": "^2.4.0",
    "prettier": "^3.4.0",
    "husky": "^9.1.0",
    "lint-staged": "^15.3.0",
    "commitlint": "^19.6.0",
    "@commitlint/config-conventional": "^19.6.0"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  },
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

```json name=turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env"],
  "globalEnv": ["NODE_ENV"],
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "out/**"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "test:e2e": {
      "dependsOn": ["^build"],
      "outputs": ["test-results/**"]
    },
    "clean": {
      "cache": false
    },
    "db:migrate": {
      "cache": false
    },
    "db:seed": {
      "cache": false
    },
    "db:studio": {
      "cache": false,
      "persistent": true
    },
    "db:reset": {
      "cache": false
    }
  }
}
```

```yaml name=docker-compose.yml
# ============================================================
# DEVELOPMENT ENVIRONMENT
# ============================================================
version: '3.9'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: tka_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: tka_ujian
      POSTGRES_USER: tka_admin
      POSTGRES_PASSWORD: ${DB_PASSWORD:-tka_secret_2026}
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U tka_admin -d tka_ujian']
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis (Cache, Session, Queue)
  redis:
    image: redis:7-alpine
    container_name: tka_redis
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD:-tka_redis_2026} --maxmemory 256mb --maxmemory-policy allkeys-lru
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    healthcheck:
      test: ['CMD', 'redis-cli', '-a', '${REDIS_PASSWORD:-tka_redis_2026}', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5

  # MinIO (Object Storage - gambar soal, audio, file)
  minio:
    image: minio/minio:latest
    container_name: tka_minio
    restart: unless-stopped
    environment:
      MINIO_ROOT_USER: ${MINIO_USER:-tka_minio}
      MINIO_ROOT_PASSWORD: ${MINIO_PASSWORD:-tka_minio_2026}
    command: server /data --console-address ":9001"
    ports:
      - '9000:9000'   # API
      - '9001:9001'   # Console
    volumes:
      - minio_data:/data
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:9000/minio/health/live']
      interval: 30s
      timeout: 10s
      retries: 3

  # pgAdmin (Database management UI) - opsional
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: tka_pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@tka-ujian.id
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PASSWORD:-admin123}
    ports:
      - '5050:80'
    depends_on:
      - postgres

  # Redis Commander (Redis management UI) - opsional
  redis-commander:
    image: rediscommander/redis-commander:latest
    container_name: tka_redis_commander
    restart: unless-stopped
    environment:
      REDIS_HOSTS: local:redis:6379:0:${REDIS_PASSWORD:-tka_redis_2026}
    ports:
      - '8081:8081'
    depends_on:
      - redis

volumes:
  postgres_data:
  redis_data:
  minio_data:
```

```ini name=.env.example
# ============================================================
# TKA UJIAN - ENVIRONMENT VARIABLES
# Copy this file to .env and fill in the values
# ============================================================

# General
NODE_ENV=development
APP_NAME="TKA Ujian"
APP_URL=http://localhost:3000
API_URL=http://localhost:4000

# Database
DATABASE_URL="postgresql://tka_admin:tka_secret_2026@localhost:5432/tka_ujian?schema=public"
DB_PASSWORD=tka_secret_2026

# Redis
REDIS_URL="redis://:tka_redis_2026@localhost:6379"
REDIS_PASSWORD=tka_redis_2026

# JWT (RS256)
JWT_ACCESS_PRIVATE_KEY_PATH=./keys/access-private.pem
JWT_ACCESS_PUBLIC_KEY_PATH=./keys/access-public.pem
JWT_REFRESH_PRIVATE_KEY_PATH=./keys/refresh-private.pem
JWT_REFRESH_PUBLIC_KEY_PATH=./keys/refresh-public.pem
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# MinIO (Object Storage)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_USER=tka_minio
MINIO_PASSWORD=tka_minio_2026
MINIO_BUCKET=tka-ujian

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM="TKA Ujian <noreply@tka-ujian.id>"

# 2FA
TWO_FACTOR_APP_NAME="TKA Ujian"

# Sentry (Error Tracking)
SENTRY_DSN=

# App Signing Secret (untuk desktop app request signing)
APP_SIGNING_SECRET=your-random-256bit-secret-here

# Encryption Key (untuk data at rest)
ENCRYPTION_KEY=your-random-256bit-encryption-key

# pgAdmin
PGADMIN_PASSWORD=admin123
```

```gitignore name=.gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Build
dist/
.next/
out/
build/
*.tsbuildinfo

# Environment
.env
.env.local
.env.*.local

# Keys (JANGAN commit ke git!)
keys/
*.pem
*.key

# Database
prisma/migrations/**/migration_lock.toml

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
test-results/
playwright-report/

# Logs
logs/
*.log
npm-debug.log*

# Electron
apps/proktor/release/
apps/client-siswa/release/

# Docker
postgres_data/
redis_data/
minio_data/

# Turbo
.turbo/
```

---

### 1.3 Backend (NestJS) Structure

```
name=apps/api/
apps/api/
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 tsconfig.build.json
├── 📄 nest-cli.json
├── 📄 .eslintrc.js
│
├── 📁 keys/                              # RSA keys (gitignored)
│   ├── 📄 access-private.pem
│   ├── 📄 access-public.pem
│   ├── 📄 refresh-private.pem
│   └── 📄 refresh-public.pem
│
├── 📁 prisma/
│   ├── 📄 schema.prisma                  # Database schema
│   ├── 📁 migrations/                    # Migration files
│   └── 📁 seeds/
│       ├── 📄 index.ts                   # Main seed runner
│       ├── 📄 provinces.seed.ts
│       ├── 📄 cities.seed.ts
│       ├── 📄 districts.seed.ts
│       ├── 📄 subjects.seed.ts
│       ├── 📄 users.seed.ts
│       ├── 📄 schools.seed.ts
│       ├── 📄 students.seed.ts
│       └── 📄 academic-years.seed.ts
│
├── 📁 src/
│   ├── 📄 main.ts                        # Entry point
│   ├── 📄 app.module.ts                  # Root module
│   │
│   ├── 📁 common/                        # Shared across all modules
│   │   ├── 📁 constants/
│   │   │   ├── 📄 roles.constant.ts
│   │   │   ├── 📄 pagination.constant.ts
│   │   │   └── 📄 error-codes.constant.ts
│   │   ├── 📁 decorators/
│   │   │   ├── 📄 roles.decorator.ts           # @Roles(Role.ADMIN)
│   │   │   ├── 📄 current-user.decorator.ts    # @CurrentUser()
│   │   │   ├── 📄 public.decorator.ts          # @Public()
│   │   │   └── 📄 api-paginated.decorator.ts
│   │   ├── 📁 dto/
│   │   │   ├── 📄 pagination.dto.ts
│   │   │   └── 📄 api-response.dto.ts
│   │   ├── 📁 exceptions/
│   │   │   ├── 📄 business.exception.ts
│   │   │   └── 📄 all-exceptions.filter.ts
│   │   ├── 📁 guards/
│   │   │   ├── 📄 jwt-auth.guard.ts
│   │   │   ├── 📄 roles.guard.ts
│   │   │   ├── 📄 throttle.guard.ts
│   │   │   └── 📄 app-signature.guard.ts
│   │   ├── 📁 interceptors/
│   │   │   ├── 📄 response-transform.interceptor.ts
│   │   │   ├── 📄 logging.interceptor.ts
│   │   │   └── 📄 timeout.interceptor.ts
│   │   ├── 📁 middleware/
│   │   │   ├── 📄 correlation-id.middleware.ts
│   │   │   └── 📄 security-headers.middleware.ts
│   │   ├── 📁 pipes/
│   │   │   └── 📄 parse-cuid.pipe.ts
│   │   └── 📁 utils/
│   │       ├── 📄 hash.util.ts
│   │       ├── 📄 encryption.util.ts
│   │       ├── 📄 pagination.util.ts
│   │       └── 📄 date.util.ts
│   │
│   ├── 📁 config/                        # Configuration
│   │   ├── 📄 app.config.ts
│   │   ├── 📄 database.config.ts
│   │   ├── 📄 jwt.config.ts
│   │   ├── 📄 redis.config.ts
│   │   ├── 📄 minio.config.ts
│   │   ├── 📄 mail.config.ts
│   │   ├── 📄 throttle.config.ts
│   │   └── 📄 config.module.ts
│   │
│   ├── 📁 database/                      # Database module
│   │   ├── 📄 database.module.ts
│   │   └── 📄 prisma.service.ts
│   │
│   ├── 📁 redis/                         # Redis module
│   │   ├── 📄 redis.module.ts
│   │   └── 📄 redis.service.ts
│   │
│   ├──    storage/                       # MinIO/File storage module
│   │   ├── 📄 storage.module.ts
│   │   ├── 📄 storage.service.ts
│   │   └── 📄 storage.controller.ts
│   │
│   ├── 📁 mail/                          # Email module
│   │   ├── 📄 mail.module.ts
│   │   ├── 📄 mail.service.ts
│   │   └── 📁 templates/
│   │       ├── 📄 welcome.hbs
│   │       ├── 📄 reset-password.hbs
│   │       └── 📄 exam-notification.hbs
│   │
│   ├── 📁 queue/                         # BullMQ job queue
│   │   ├── 📄 queue.module.ts
│   │   └── 📁 processors/
│   │       ├── 📄 email.processor.ts
│   │       ├── 📄 report.processor.ts
│   │       ├── 📄 exam-result.processor.ts
│   │       └── 📄 import.processor.ts
│   │
│   │── 📁 websocket/                     # WebSocket (Socket.io)
│   │   ├── 📄 websocket.module.ts
│   │   ├── 📄 websocket.gateway.ts
│   │   ├── 📄 exam.gateway.ts
│   │   └── 📄 websocket.adapter.ts
│   │
│   │
│   │   # ================================================
│   │   # FEATURE MODULES (Business Logic)
│   │   # ================================================
│   │
│   ├── 📁 modules/
│   │   │
│   │   ├── 📁 auth/                      # 🔐 Authentication
│   │   │   ├── 📄 auth.module.ts
│   │   │   ├── 📄 auth.controller.ts
│   │   │   ├── 📄 auth.service.ts
│   │   │   ├── 📁 dto/
│   │   │   │   ├── 📄 login.dto.ts
│   │   │   │   ├── 📄 refresh-token.dto.ts
│   │   │   │   ├── 📄 change-password.dto.ts
│   │   │   │   ├── 📄 forgot-password.dto.ts
│   │   │   │   ├── 📄 reset-password.dto.ts
│   │   │   │   ├── 📄 proctor-login.dto.ts
│   │   │   │   ├── 📄 student-login.dto.ts
│   │   │   │   └── 📄 setup-2fa.dto.ts
│   │   │   ├── 📁 strategies/
│   │   │   │   ├── 📄 jwt.strategy.ts
│   │   │   │   └── 📄 jwt-refresh.strategy.ts
│   │   │   ├── 📁 guards/
│   │   │   │   └── 📄 two-factor.guard.ts
│   │   │   └── 📁 tests/
│   │   │       ├── 📄 auth.controller.spec.ts
│   │   │       └── 📄 auth.service.spec.ts
│   │   │
│   │   ├── 📁 users/                     # 👥 User Management
│   │   │   ├── 📄 users.module.ts
│   │   │   ├── 📄 users.controller.ts
│   │   │   ├── 📄 users.service.ts
│   │   │   ├── 📁 dto/
│   │   │   │   ├── 📄 create-user.dto.ts
│   │   │   │   ├── 📄 update-user.dto.ts
│   │   │   │   └── 📄 query-user.dto.ts
│   │   │   └── 📁 tests/
│   │   │       ├── 📄 users.controller.spec.ts
│   │   │       └── 📄 users.service.spec.ts
│   │   │
│   │   ├── 📁 regional/                  # 🌍 Wilayah
│   │   │   ├── 📄 regional.module.ts
│   │   │   ├── 📄 provinces.controller.ts
│   │   │   ├── 📄 cities.controller.ts
│   │   │   ├── 📄 districts.controller.ts
│   │   │   ├── 📄 regional.service.ts
│   │   │   ├── 📁 dto/
│   │   │   └── 📁 tests/
│   │   │
│   │   ├── 📁 schools/                   # 🏫 Sekolah
│   │   │   ├── 📄 schools.module.ts
│   │   │   ├── 📄 schools.controller.ts
│   │   │   ├── 📄 schools.service.ts
│   │   │   ├── 📁 dto/
│   │   │   └── 📁 tests/
│   │   │
│   │   ├── 📁 students/                  # 👨‍🎓 Siswa
│   │   │   ├── 📄 students.module.ts
│   │   │   ├── 📄 students.controller.ts
│   │   │   ├── 📄 students.service.ts
│   │   │   ├── 📄 students-import.service.ts
│   │   │   ├── 📄 exam-card.service.ts
│   │   │   ├── 📁 dto/
│   │   │   └── 📁 tests/
│   │   │
│   │   ├── 📁 subjects/                  # 📚 Mata Pelajaran
│   │   │   ├── 📄 subjects.module.ts
│   │   │   ├── 📄 subjects.controller.ts
│   │   │   ├── 📄 subjects.service.ts
│   │   │   ├── 📁 dto/
│   │   │   └── 📁 tests/
│   │   │
│   │   ├── 📁 question-banks/            # 📝 Bank Soal
│   │   │   ├── 📄 question-banks.module.ts
│   │   │   ├── 📄 question-banks.controller.ts
│   │   │   ├── 📄 question-banks.service.ts
│   │   │   ├── 📄 questions.controller.ts
│   │   │   ├── 📄 questions.service.ts
│   │   │   ├── 📄 questions-import.service.ts
│   │   │   ├── 📁 dto/
│   │   │   └── 📁 tests/
│   │   │
│   │   ├── 📁 exams/                     # 📋 Ujian
│   │   │   ├── 📄 exams.module.ts
│   │   │   ├── 📄 exams.controller.ts
│   │   │   ├── 📄 exams.service.ts
│   │   │   ├── 📄 exam-waves.controller.ts
│   │   │   ├── 📄 exam-waves.service.ts
│   │   │   ├── 📄 exam-sessions.controller.ts
│   │   │   ├── 📄 exam-sessions.service.ts
│   │   │   ├── 📄 exam-rooms.controller.ts
│   │   │   ├── 📄 exam-rooms.service.ts
│   │   │   ├── 📄 exam-mapping.controller.ts
│   │   │   ├── 📄 exam-mapping.service.ts
│   │   │   ├── 📁 dto/
│   │   │   └── 📁 tests/
│   │   │
│   │   ├── 📁 proctor/                   # 🖥️ Proktor
│   │   │   ├── 📄 proctor.module.ts
│   │   │   ├── 📄 proctor.controller.ts
│   │   │   ├── 📄 proctor.service.ts
│   │   │   ├── 📁 dto/
│   │   │   └── 📁 tests/
│   │   │
│   │   ├── 📁 student-exam/              # 💻 Ujian Siswa
│   │   │   ├── 📄 student-exam.module.ts
│   │   │   ├── 📄 student-exam.controller.ts
│   │   │   ├──     student-exam.service.ts
│   │   │   ├── 📄 answer-sync.service.ts
│   │   │   ├── 📁 dto/
│   │   │   └── 📁 tests/
│   │   │
│   │   ├── 📁 results/                   # 📊 Hasil & Laporan
│   │   │   ├── 📄 results.module.ts
│   │   │   ├── 📄 results.controller.ts
│   │   │   ├── 📄 results.service.ts
│   │   │   ├── 📄 grading.controller.ts
│   │   │   ├── 📄 grading.service.ts
│   │   │   ├── 📄 reports.controller.ts
│   │   │   ├── 📄 reports.service.ts
│   │   │   ├── 📄 question-analysis.service.ts
│   │   │   ├── 📁 dto/
│   │   │   └── 📁 tests/
│   │   │
│   │   ├── 📁 dashboard/                 # 📈 Dashboard
│   │   │   ├── 📄 dashboard.module.ts
│   │   │   ├── 📄 dashboard.controller.ts
│   │   │   ├── 📄 dashboard.service.ts
│   │   │   └── 📁 tests/
│   │   │
│   │   ├── 📁 notifications/             # 🔔 Notifikasi
│   │   │   ├── 📄 notifications.module.ts
│   │   │   ├── 📄 notifications.controller.ts
│   │   │   ├── 📄 notifications.service.ts
│   │   │   ├── 📁 dto/
│   │   │   └─   📁 tests/
│   │   │
│   │   ├── 📁 settings/                  # ⚙️ Settings
│   │   │   ├── 📄 settings.module.ts
│   │   │   ├── 📄 settings.controller.ts
│   │   │   ├── 📄 settings.service.ts
│   │   │   ├── 📄 releases.controller.ts
│   │   │   ├── 📄 releases.service.ts
│   │   │   ├── 📄 academic-years.controller.ts
│   │   │   ├── 📄 academic-years.service.ts
│   │   │   ├── 📁 dto/
│   │   │   └── 📁 tests/
│   │   │
│   │   ├── 📁 audit/                     # 📜 Audit Log
│   │   │   ├── 📄 audit.module.ts
│   │   │   ├── 📄 audit.controller.ts
│   │   │   ├── 📄 audit.service.ts
│   │   │   └── 📁 tests/
│   │   │
│   │   └── 📁 security/                  # 🛡️ Security
│   │       ├── 📄 security.module.ts
│   │       ├── 📄 security.controller.ts
│   │       ├── 📄 security.service.ts
│   │       ├── 📄 ip-blacklist.service.ts
│   │       ├── 📄 device-fingerprint.service.ts
│   │       └── 📁 tests/
│   │
│   └── 📁 health/                        # 🏥 Health Check
│       ├── 📄 health.module.ts
│       └── 📄 health.controller.ts
│
└── 📁 test/                              # E2E Tests
    ├── 📄 jest-e2e.json
    ├── 📄 app.e2e-spec.ts
    ├── 📄 auth.e2e-spec.ts
    └── 📄 setup.ts
```

```json name=apps/api/package.json
{
  "name": "@tka/api",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "node dist/main",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "db:migrate": "prisma migrate dev",
    "db:migrate:prod": "prisma migrate deploy",
    "db:seed": "ts-node prisma/seeds/index.ts",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset",
    "db:generate": "prisma generate"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.0",
    "@nestjs/core": "^10.4.0",
    "@nestjs/platform-express": "^10.4.0",
    "@nestjs/config": "^3.3.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/swagger": "^7.4.0",
    "@nestjs/throttler": "^6.3.0",
    "@nestjs/websockets": "^10.4.0",
    "@nestjs/platform-socket.io": "^10.4.0",
    "@nestjs/bull": "^10.2.0",
    "@nestjs/terminus": "^10.2.0",
    "@prisma/client": "^6.3.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "bcrypt": "^5.1.1",
    "class-validator": "^0.14.1",
    "class-transformer": "^0.5.1",
    "helmet": "^8.0.0",
    "compression": "^1.7.5",
    "cookie-parser": "^1.4.7",
    "socket.io": "^4.8.0",
    "bull": "^4.16.0",
    "ioredis": "^5.4.0",
    "minio": "^8.0.0",
    "multer": "^1.4.5",
    "sharp": "^0.33.0",
    "pdfkit": "^0.15.0",
    "exceljs": "^4.4.0",
    "otplib": "^12.0.1",
    "qrcode": "^1.5.4",
    "nodemailer": "^6.9.0",
    "handlebars": "^4.7.8",
    "winston": "^3.17.0",
    "morgan": "^1.10.0",
    "cuid": "^3.0.0",
    "dayjs": "^1.11.0",
    "rxjs": "^7.8.0",
    "reflect-metadata": "^0.2.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.0",
    "@nestjs/schematics": "^10.2.0",
    "@nestjs/testing": "^10.4.0",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.0",
    "@types/node": "^22.0.0",
    "@types/bcrypt": "^5.0.2",
    "@types/multer": "^1.4.12",
    "@types/passport-jwt": "^4.0.1",
    "@types/nodemailer": "^6.4.17",
    "prisma": "^6.3.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.2.0",
    "ts-node": "^10.9.0",
    "typescript": "^5.7.0",
    "@tka/shared-types": "workspace:*",
    "@tka/shared-utils": "workspace:*",
    "@tka/shared-validators": "workspace:*"
  }
}
```

---

### 1.4 Frontend (Next.js) Structure

```
name=apps/web/
apps/web/
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 next.config.ts
├── 📄 tailwind.config.ts
├── 📄 postcss.config.js
├── 📄 components.json                  # shadcn/ui config
│
├── 📁 public/
│   ├── 📁 images/
│   ├── 📁 icons/
│   └── 📄 favicon.ico
│
├── 📁 src/
│   ├── 📁 app/                         # Next.js App Router
│   │   ├── 📄 layout.tsx               # Root layout
│   │   ├── 📄 page.tsx                 # Landing page
│   │   ├── 📄 not-found.tsx
│   │   │
│   │   ├── 📁 (auth)/                  # Auth pages (no sidebar)
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 forgot-password/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 reset-password/
│   │   │       └── 📄 page.tsx
│   │   │
│   │   ├── 📁 (dashboard)/             # Dashboard pages (with sidebar)
│   │   │   ├── 📄 layout.tsx           # Dashboard layout (sidebar+header)
│   │   │   │
│   │   │   ├── 📁 super-admin/         # Super Admin pages
│   │   │   │   ├── 📄 page.tsx                    # Dashboard
│   │   │   │   ├── 📁 users/
│   │   │   │   ├── 📁 schools/
│   │   │   │   ├── 📁 regional/
│   │   │   │   ├── 📁 settings/
│   │   │   │   ├── 📁 releases/
│   │   │   │   ├── 📁 audit-logs/
│   │   │   │   └── 📁 security/
│   │   │   │
│   │   │   ├── 📁 disdik/              # Disdik pages
│   │   │   │   ├── 📄 page.tsx                    # Dashboard
│   │   │   │   ├── 📁 schools/
│   │   │   │   ├── 📁 results/
│   │   │   │   ├── 📁 reports/
│   │   │   │   └── 📁 comparison/
│   │   │   │
│   │   │   ├── 📁 fkkg/                # FKKG pages
│   │   │   │   ├── 📄 page.tsx                    # Dashboard
│   │   │   │   ├── 📁 question-banks/
│   │   │   │   ├── 📁 grading/
│   │   │   │   ├── 📁 monitoring/
│   │   │   │   └── 📁 analysis/
│   │   │   │
│   │   │   ├── 📁 sekolah/             # Admin Sekolah pages
│   │   │   │   ├── 📄 page.tsx                    # Dashboard
│   │   │   │   ├── 📁 students/
│   │   │   │   ├── 📁 exams/
│   │   │   │   ├── 📁 rooms/
│   │   │   │   ├── 📁 results/
│   │   │   │   └── 📁 downloads/
│   │   │   │
│   │   │   └── 📁 profile/
│   │   │       └── 📄 page.tsx
│   │   │
│   │   └── 📁 api/                     # Next.js API Routes (BFF)
│   │       └── 📁 auth/
│   │           └── 📄 [...nextauth]/route.ts
│   │
│   ├── 📁 components/
│   │   ├── 📁 ui/                      # shadcn/ui components
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 input.tsx
│   │   │   ├── 📄 dialog.tsx
│   │   │   ├── 📄 data-table.tsx
│   │   │   ├── 📄 select.tsx
│   │   │   ├── 📄 toast.tsx
│   │   │   └── ... (semua shadcn components)
│   │   ├── 📁 layout/
│   │   │   ├── 📄 sidebar.tsx
│   │   │   ├── 📄 header.tsx
│   │   │   ├── 📄 breadcrumb.tsx
│   │   │   └── 📄 user-nav.tsx
│   │   ├── 📁 shared/
│   │   │   ├── 📄 loading-spinner.tsx
│   │   │   ├── 📄 empty-state.tsx
│   │   │   ├── 📄 confirm-dialog.tsx
│   │   │   ├── 📄 file-upload.tsx
│   │   │   ├── 📄 rich-text-editor.tsx
│   │   │   ├── 📄 stats-card.tsx
│   │   │   └── 📄 search-input.tsx
│   │   └── 📁 charts/
│   │       ├── 📄 bar-chart.tsx
│   │       ├── 📄 line-chart.tsx
│   │       ├── 📄 pie-chart.tsx
│   │       └── 📄 school-map.tsx
│   │
│   ├── 📁 hooks/
│   │   ├── 📄 use-auth.ts
│   │   ├── 📄 use-debounce.ts
│   │   ├── 📄 use-pagination.ts
│   │   └── 📄 use-toast.ts
│   │
│   ├── 📁 lib/
│   │   ├── 📄 api-client.ts            # Axios/fetch wrapper
│   │   ├── 📄 auth.ts                  # Auth utilities
│   │   ├── 📄 utils.ts                 # cn() and helpers
│   │   └── 📄 constants.ts
│   │
│   ├── 📁 services/                    # API service layer
│   │   ├── 📄 auth.service.ts
│   │   ├── 📄 users.service.ts
│   │   ├── 📄 schools.service.ts
│   │   ├── 📄 students.service.ts
│   │   ├── 📄 question-banks.service.ts
│   │   ├── 📄 exams.service.ts
│   │   ├── 📄 results.service.ts
│   │   ├── 📄 dashboard.service.ts
│   │   └── 📄 notifications.service.ts
│   │
│   ├── 📁 stores/                      # Zustand stores
│   │   ├── 📄 auth.store.ts
│   │   ├── 📄 sidebar.store.ts
│   │   └── 📄 notification.store.ts
│   │
│   ├── 📁 types/
│   │   └── 📄 index.ts
│   │
│   └── 📁 styles/
│       └── 📄 globals.css
│
└── 📁 __tests__/
    └── ... (test files)
```

---

### 1.5 Desktop Apps Structure

```
name=apps/proktor/
apps/proktor/
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 electron-builder.yml
│
├── 📁 src/
│   ├── 📁 main/                        # Electron Main Process
│   │   ├── 📄 index.ts                 # Entry point
│   │   ├── 📄 window.ts               # Window management
│   │   ├── 📄 ipc-handlers.ts         # IPC communication
│   │   ├── 📄 auto-updater.ts         # Auto update
│   │   ├── 📄 tray.ts                 # System tray
│   │   └── 📁 services/
│   │       ├── 📄 api.service.ts       # HTTP client
│   │       ├── 📄 websocket.service.ts # WebSocket client
│   │       └── 📄 local-db.service.ts  # SQLite local
│   │
│   ├── 📁 renderer/                    # Electron Renderer (React)
│   │   ├── 📄 index.html
│   │   ├── 📄 main.tsx
│   │   ├── 📁 pages/
│   │   │   ├── 📄 Login.tsx
│   │   │   ├── 📄 SessionSelect.tsx
│   │   │   ├── 📄 Dashboard.tsx
│   │   │   └── 📄 Monitoring.tsx
│   │   ├── 📁 components/
│   │   ├── 📁 hooks/
│   │   ├── 📁 stores/
│   │   └── 📁 styles/
│   │
│   └── 📁 preload/
│       └── 📄 index.ts                # Preload script (security)
│
└── 📁 resources/
    ├── 📄 icon.ico
    ├── 📄 icon.png
    └── 📄 icon.icns
```

```
name=apps/client-siswa/
apps/client-siswa/
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 electron-builder.yml
│
├── 📁 src/
│   ├── 📁 main/                        # Electron Main Process
│   │   ├── 📄 index.ts
│   │   ├── 📄 window.ts
│   │   ├── 📄 ipc-handlers.ts
│   │   ├── 📄 auto-updater.ts
│   │   ├── 📁 lockdown/               # 🔒 LOCKDOWN MODE
│   │   │   ├── 📄 lockdown-manager.ts
│   │   │   ├── 📄 keyboard-blocker.ts
│   │   │   ├── 📄 process-monitor.ts
│   │   │   ├── 📄 display-monitor.ts
│   │   │   └── 📄 focus-monitor.ts
│   │   └── 📁 services/
│   │       ├── 📄 api.service.ts
│   │       ├── 📄 websocket.service.ts
│   │       ├── 📄 local-db.service.ts  # SQLite (offline answers)
│   │       ├── 📄 sync.service.ts      # Answer sync engine
│   │       └── 📄 timer.service.ts     # Server-synced timer
│   │
│   ├── 📁 renderer/                    # Electron Renderer (React)
│   │   ├── 📄 index.html
│   │   ├── 📄 main.tsx
│   │   ├── 📁 pages/
│   │   │   ├── 📄 Login.tsx
│   │   │   ├── 📄 WaitingRoom.tsx
│   │   │   ├── 📄 Exam.tsx
│   │   │   ├── 📄 Review.tsx
│   │   │   └── 📄 Completed.tsx
│   │   ├── 📁 components/
│   │   │   ├── 📄 QuestionDisplay.tsx
│   │   │   ├── 📄 AnswerInput.tsx
│   │   │   ├── 📄 QuestionNavigation.tsx
│   │   │   ├── 📄 Timer.tsx
│   │   │   ├── 📄 ConnectionStatus.tsx
│   │   │   └── 📄 OfflineIndicator.tsx
│   │   ├── 📁 hooks/
│   │   ├── 📁 stores/
│   │   └── 📁 styles/
│   │
│   └── 📁 preload/
│       └── 📄 index.ts
│
└── 📁 resources/
    ├── 📄 icon.ico
    ├── 📄 icon.png
    └── 📄 icon.icns
```

---

### 1.6 Shared Packages

```typescript name=packages/shared-types/src/index.ts
// ============================================================
// SHARED TYPES - Dipakai oleh semua apps
// ============================================================

// User & Auth
export type UserRole = 'SUPER_ADMIN' | 'ADMIN_DISDIK' | 'ADMIN_FKKG' | 'ADMIN_SEKOLAH' | 'PROKTOR';
export type SchoolLevel = 'SD' | 'SMP' | 'SMA' | 'SMK';
export type QuestionType = 'PILIHAN_GANDA' | 'ESSAY' | 'ISIAN_SINGKAT' | 'BENAR_SALAH';
export type ExamStatus = 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
export type SessionStatus = 'WAITING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
export type StudentExamStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'FORCE_SUBMITTED' | 'DISCONNECTED' | 'TIMED_OUT';
export type Gender = 'LAKI_LAKI' | 'PEREMPUAN';
export type DifficultyLevel = 'MUDAH' | 'SEDANG' | 'SULIT';

// API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

// Entities
export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  cityId?: string;
  schoolId?: string;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export interface School {
  id: string;
  npsn: string;
  name: string;
  level: SchoolLevel;
  address: string;
  cityId: string;
  districtId: string;
  phone?: string;
  email?: string;
  principalName?: string;
  logo?: string;
  isActive: boolean;
}

export interface Student {
  id: string;
  nisn: string;
  nis?: string;
  fullName: string;
  gender: Gender;
  birthPlace?: string;
  birthDate?: string;
  className: string;
  classYear: number;
  schoolId: string;
  parentName?: string;
  parentPhone?: string;
  photo?: string;
  isActive: boolean;
}

export interface Question {
  id: string;
  questionBankId: string;
  orderNumber: number;
  type: QuestionType;
  content: string;
  contentImages: string[];
  contentAudio?: string;
  difficulty: DifficultyLevel;
  points: number;
  explanation?: string;
  options?: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  label: string;
  content: string;
  image?: string;
  isCorrect?: boolean; // Hanya dikirim ke FKKG, bukan ke siswa
  orderNumber: number;
}

// WebSocket Events
export interface WsStudentStatus {
  studentId: string;
  name: string;
  seatNumber?: number;
  status: StudentExamStatus;
  answered: number;
  total: number;
  isOnline: boolean;
  lastActivity?: string;
}

export interface WsExamAlert {
  studentId: string;
  type: 'FOCUS_LOST' | 'FULLSCREEN_EXIT' | 'SUSPICIOUS_PROCESS' | 'RECONNECTED';
  message: string;
  timestamp: string;
}

export interface WsSessionStatistics {
  online: number;
  offline: number;
  submitted: number;
  inProgress: number;
  notStarted: number;
  avgProgress: number;
}
```

---

### 1.7 Scripts

```bash name=scripts/setup.sh
#!/bin/bash
# ============================================================
# TKA UJIAN - INITIAL SETUP SCRIPT
# ============================================================

set -e

echo "🚀 Setting up TKA Ujian development environment..."
echo ""

# 1. Check prerequisites
echo "📋 Checking prerequisites..."

check_command() {
  if ! command -v $1 &> /dev/null; then
    echo "❌ $1 is not installed. Please install it first."
    exit 1
  else
    echo "✅ $1 found: $($1 --version 2>/dev/null | head -1)"
  fi
}

check_command "node"
check_command "npm"
check_command "docker"
check_command "docker-compose"
check_command "git"

# Check Node.js version >= 20
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ Node.js 20+ is required. Current: $(node -v)"
  exit 1
fi

echo ""

# 2. Copy environment file
echo "📄 Setting up environment variables..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ .env file created from .env.example"
  echo "⚠️  Please update .env with your actual values"
else
  echo "✅ .env file already exists"
fi

echo ""

# 3. Generate RSA keys for JWT
echo "🔑 Generating RSA keys for JWT..."
mkdir -p apps/api/keys

if [ ! -f apps/api/keys/access-private.pem ]; then
  openssl genrsa -out apps/api/keys/access-private.pem 4096
  openssl rsa -in apps/api/keys/access-private.pem -pubout -out apps/api/keys/access-public.pem
  echo "✅ Access token RSA keys generated (4096-bit)"
else
  echo "✅ Access token RSA keys already exist"
fi

if [ ! -f apps/api/keys/refresh-private.pem ]; then
  openssl genrsa -out apps/api/keys/refresh-private.pem 4096
  openssl rsa -in apps/api/keys/refresh-private.pem -pubout -out apps/api/keys/refresh-public.pem
  echo "✅ Refresh token RSA keys generated (4096-bit)"
else
  echo "✅ Refresh token RSA keys already exist"
fi

echo ""

# 4. Start Docker containers
echo "🐳 Starting Docker containers..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

# Check PostgreSQL
until docker exec tka_postgres pg_isready -U tka_admin -d tka_ujian > /dev/null 2>&1; do
  echo "  Waiting for PostgreSQL..."
  sleep 2
done
echo "✅ PostgreSQL is ready"

# Check Redis
until docker exec tka_redis redis-cli -a tka_redis_2026 ping > /dev/null 2>&1; do
  echo "  Waiting for Redis..."
  sleep 2
done
echo "✅ Redis is ready"

# Check MinIO
until curl -f http://localhost:9000/minio/health/live > /dev/null 2>&1; do
  echo "  Waiting for MinIO..."
  sleep 2
done
echo "✅ MinIO is ready"

echo ""

# 5. Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""

# 6. Generate Prisma Client
echo "🗄️ Generating Prisma Client..."
cd apps/api
npx prisma generate

# 7. Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate dev --name init

# 8. Seed database
echo "🌱 Seeding database..."
npx ts-node prisma/seeds/index.ts

cd ../..

echo ""
echo "============================================"
echo "🎉 Setup complete!"
echo "============================================"
echo ""
echo "Available services:"
echo "  📊 PostgreSQL:      localhost:5432"
echo "  🔴 Redis:           localhost:6379"
echo "  📦 MinIO:           localhost:9000"
echo "  📦 MinIO Console:   localhost:9001"
echo "  🗄️ pgAdmin:         localhost:5050"
echo "  📊 Redis Commander: localhost:8081"
echo ""
echo "Run commands:"
echo "  npm run dev:api      → Start API server"
echo "  npm run dev:web      → Start Web frontend"
echo "  npm run dev:proktor  → Start Proktor desktop app"
echo "  npm run dev:client   → Start Client Siswa desktop app"
echo "  npm run dev          → Start all apps"
echo ""
echo "Default Super Admin credentials:"
echo "  Username: superadmin"
echo "  Password: SuperAdmin@TKA2026"
echo ""
```

```yaml name=.github/workflows/ci.yml
# ============================================================
# CI PIPELINE - Runs on every push & PR
# ============================================================

name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'

jobs:
  lint:
    name: 🔍 Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test-api:
    name: 🧪 Test API
    runs-on: ubuntu-latest
    needs: lint

    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: tka_ujian_test
          POSTGRES_USER: tka_admin
          POSTGRES_PASSWORD: test_password
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - name: Generate Prisma Client
        run: cd apps/api && npx prisma generate
      - name: Run migrations
        run: cd apps/api && npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://tka_admin:test_password@localhost:5432/tka_ujian_test
      - name: Run tests
        run: npm run test --filter=@tka/api -- --coverage
        env:
          DATABASE_URL: postgresql://tka_admin:test_password@localhost:5432/tka_ujian_test
          REDIS_URL: redis://localhost:6379
          JWT_ACCESS_EXPIRES_IN: 15m
          JWT_REFRESH_EXPIRES_IN: 7d

  test-web:
    name: 🧪 Test Web
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run test --filter=@t

## @FergiawanHinandi

apakah masih ada saran untuk lebih baik sebelum kita mulai projectnya

## Copilot



# 🎯 SARAN FINAL SEBELUM MULAI PROJECT

Ya, ada beberapa hal **KRITIS** yang harus disiapkan dan dipertimbangkan sebelum menulis satu baris kode pun. Ini adalah pelajaran dari project-project besar yang gagal karena melewatkan hal-hal fundamental ini.

---

## 🔷 1. GIT STRATEGY & BRANCHING MODEL

```
┌──────────────────────────────────────────────────────────────────────┐
│                    GIT BRANCHING STRATEGY                            │
│                    (GitFlow Modified)                                │
│                                                                      │
│  main (production) ──────────────────────────────────────────►      │
│    │                         ▲           ▲                           │
│    │                         │           │                           │
│  staging ──────────────────────────────────────────────────►        │
│    │                  ▲           ▲                                  │
│    │                  │           │                                  │
│  develop ──────────────────────────────────────────────────►        │
│    │         ▲     ▲     ▲     ▲                                    │
│    │         │     │     │     │                                    │
│    ├── feature/auth──┘     │     │     │                            │
│    ├── feature/users───────┘     │     │                            │
│    ├── feature/schools───────────┘     │                            │
│    ├── feature/exams───────────────────┘                            │
│    │                                                                 │
│    ├── bugfix/login-error──┐                                        │
│    │                       ├──► develop                              │
│    ├── hotfix/critical─────┼──► main (langsung)                     │
│    │                       │                                        │
│    └── release/v1.0.0──────┘                                        │
│                                                                      │
│  NAMING CONVENTION:                                                  │
│  feature/TKA-001-module-auth                                        │
│  bugfix/TKA-042-login-error                                        │
│  hotfix/TKA-099-critical-security                                   │
│  release/v1.0.0                                                     │
└──────────────────────────────────────────────────────────────────────┘
```

```yaml name=.github/pull_request_template.md
## 📋 Deskripsi
<!-- Jelaskan perubahan yang dilakukan -->

## 🎫 Ticket
<!-- Link ke issue/ticket -->
Closes #

## 📝 Tipe Perubahan
- [ ] ✨ Fitur baru
- [ ] 🐛 Bug fix
- [ ] ♻️ Refactor
- [ ] 📝 Dokumentasi
- [ ] 🧪 Testing
- [ ] 🔧 Konfigurasi

## 🧪 Testing
- [ ] Unit test ditambahkan/diupdate
- [ ] Manual testing dilakukan
- [ ] E2E test ditambahkan (jika applicable)

## 📸 Screenshots (jika ada UI changes)

## ✅ Checklist
- [ ] Kode sudah di-lint & format
- [ ] Tidak ada console.log / debugger
- [ ] Environment variables baru sudah ditambahkan ke .env.example
- [ ] Migration baru sudah dibuat (jika ada perubahan schema)
- [ ] Dokumentasi API sudah diupdate (jika ada endpoint baru)
- [ ] Tidak ada secret/credential yang ter-commit
```

---

## 🔷 2. CODING STANDARDS & CONVENTIONS

```typescript name=docs/coding-standards.ts
// ============================================================
// CODING STANDARDS TKA PROJECT
// ============================================================

// ═══════════════════════════════════════════
// 1. NAMING CONVENTIONS
// ═══════════════════════════════════════════

// Files & Folders: kebab-case
// ✅ user-management.service.ts
// ✅ create-user.dto.ts
// ✅ question-banks/
// ❌ UserManagement.service.ts
// ❌ createUser.dto.ts

// Classes: PascalCase
// ✅ class UserManagementService {}
// ✅ class CreateUserDto {}

// Variables & Functions: camelCase
// ✅ const totalStudents = 100;
// ✅ function calculateExamResult() {}

// Constants: UPPER_SNAKE_CASE
// ✅ const MAX_LOGIN_ATTEMPTS = 5;
// ✅ const DEFAULT_PAGE_SIZE = 20;

// Enums: PascalCase (members juga PascalCase)
// ✅ enum UserRole { SuperAdmin, AdminDisdik }

// Database columns: snake_case (handled by Prisma @map)
// ✅ full_name, created_at, school_id

// API endpoints: kebab-case
// ✅ /api/v1/question-banks/:id/questions
// ❌ /api/v1/questionBanks/:id/questions

// ═══════════════════════════════════════════
// 2. FILE SIZE LIMITS
// ═══════════════════════════════════════════

// Controller: maks 200 baris
// → Jika lebih, pecah menjadi beberapa controller

// Service: maks 400 baris
// → Jika lebih, pecah menjadi sub-services

// Component (React): maks 300 baris
// → Jika lebih, pecah menjadi sub-components

// Function/Method: maks 50 baris
// → Jika lebih, pecah menjadi helper functions

// ═══════════════════════════════════════════
// 3. ERROR HANDLING STANDARD
// ═══════════════════════════════════════════

// Backend: SELALU gunakan custom exception classes
// ✅
class StudentNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Student with ID ${id} not found`);
  }
}

// ❌ JANGAN throw generic error
// throw new Error('not found');

// Frontend: SELALU handle 3 state
// ✅ Loading state
// ✅ Error state (dengan pesan yang user-friendly)
// ✅ Empty state (data kosong)
// ✅ Success state (data tersedia)

// ═══════════════════════════════════════════
// 4. COMMENT STANDARDS
// ═════════════════════════════════════  ═════

// JANGAN comment "apa yang kode lakukan" (kode harus self-documenting)
// ❌ // Loop through students
// for (const student of students) { ... }

// COMMENT "mengapa" kode melakukan sesuatu
// ✅ // Skip students who already submitted to avoid duplicate scoring
// const activeStudents = students.filter(s => s.status !== 'SUBMITTED');

// SELALU dokumentasi public API methods
// ✅
/**
 * Calculate exam results for all students in a session.
 * Auto-grades multiple choice questions.
 * Essay questions are marked as pending for manual grading.
 *
 * @param sessionId - The exam session ID
 * @returns Array of calculated exam results
 * @throws SessionNotFoundException if session doesn't exist
 * @throws SessionNotCompletedException if session is still active
 */
async calculateSessionResults(sessionId: string): Promise<ExamResult[]> {
  // ...implementation
}

// ═══   ═══════════════════════════════════════
// 5. IMPORT ORDER (auto-enforced by ESLint)
// ═══════════════════════════════════════════

// 1. Node.js built-in modules
import { readFileSync } from 'fs';
import { join } from 'path';

// 2. External packages
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/client';

// 3. Shared packages (@tka/*)
import { UserRole } from '@tka/shared-types';
import { hashPassword } from '@tka/shared-utils';

// 4. Internal modules (absolute path)
import { PrismaService } from '@/database/prisma.service';

// 5. Relative imports
import { CreateUserDto } from './dto/create-user.dto';
```

```javascript name=.eslintrc.js
// ============================================================
// ESLINT CONFIG (Root)
// ============================================================
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    // Enforce naming conventions
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'class', format: ['PascalCase'] },
      { selector: 'interface', format: ['PascalCase'] },
      { selector: 'typeAlias', format: ['PascalCase'] },
      { selector: 'enum', format: ['PascalCase'] },
      { selector: 'enumMember', format: ['UPPER_CASE'] },
      { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
      { selector: 'function', format: ['camelCase'] },
      { selector: 'method', format: ['camelCase'] },
      { selector: 'parameter', format: ['camelCase'] },
    ],

    // No unused variables
    '@typescript-eslint/no-unused-vars': 'error',
    'unused-imports/no-unused-imports': 'error',

    // No console.log in production code
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    // Enforce import order
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],

    // No any type
    '@typescript-eslint/no-explicit-any': 'warn',

    // Enforce return types on public methods
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      { allowExpressions: true },
    ],

    // Max file length
    'max-lines': ['warn', { max: 400, skipBlankLines: true, skipComments: true }],

    // Max function length
    'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.js', 'prisma/'],
};
```

```json name=.prettierrc
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

---

## 🔷 3. ENVIRONMENT & DEPLOYMENT STRATEGY

```
┌──────────────────────────────────────────────────────────────────────┐
│                   DEPLOYMENT ENVIRONMENTS                            │
│                                                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐           │
│  │  DEVELOPMENT  │    │   STAGING    │    │  PRODUCTION  │           │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤           │
│  │ localhost     │    │ staging.     │    │ tka-ujian.id │           │
│  │               │    │ tka-ujian.id │    │              │           │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤           │
│  │ Branch:       │    │ Branch:       │    │ Branch:      │           │
│  │ develop       │    │ staging       │    │ main         │           │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤           │
│  │ DB: local     │    │ DB: staging   │    │ DB: prod     │           │
│  │ Docker local  │    │ VPS staging   │    │ VPS prod     │           │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤           │
│  │ Deploy:       │    │ Deploy:       │    │ Deploy:      │           │
│  │ Manual        │    │ Auto (CI/CD)  │    │ Manual       │           │
│  │               │    │ on merge to   │    │ approval     │           │
│  │               │    │ staging       │    │ required     │           │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤           │
│  │ Data:         │    │ Data:         │    │ Data:        │           │
│  │ Seed/dummy    │    │ Anonymized    │    │ Real data    │           │
│  │               │    │ copy of prod  │    │              │           │
│  └──────────────┘    └──────────────┘    └──────────────┘           │
│                                                                      │
│  RULE: TIDAK ADA yang deploy langsung ke production tanpa           │
│        melewati staging terlebih dahulu.                             │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🔷 4. API VERSIONING & DEPRECATION

```typescript name=docs/api-versioning-strategy.ts
// ============================================================
// API VERSIONING STRATEGY
// ============================================================

// Format URL: /api/v{major}/{resource}
// Contoh:     /api/v1/users
//             /api/v2/users (jika ada breaking change)

// RULES:
// 1. Minor changes (tambah field baru) → TIDAK perlu versi baru
// 2. Breaking changes (hapus/rename field) → WAJIB versi baru
// 3. Versi lama tetap aktif minimal 6 bulan setelah versi baru
// 4. Kirim header "Sunset" jika versi akan deprecated

// Contoh deprecation header:
// HTTP/1.1 200 OK
// Sunset: Sat, 01 Jan 2027 00:00:00 GMT
// Deprecation: true
// Link: <https://api.tka-ujian.id/v2/users>; rel="successor-version"

// NestJS Implementation:
// Controller dengan versioning
import { Controller, Version } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Version('1')
  @Get()
  findAllV1() {
    // Versi lama
  }

  @Version('2')
  @Get()
  findAllV2() {
    // Versi baru dengan perubahan response
  }
}
```

---

## 🔷 5. ERROR CODE SYSTEM

```typescript name=packages/shared-types/src/error-codes.ts
// ============================================================
// STANDARDIZED ERROR CODES
// ============================================================
// Format: TKA-{MODULE}-{NUMBER}
// Module codes:
//   AUTH = 01, USER = 02, SCHOOL = 03, STUDENT = 04
//   QUESTION = 05, EXAM = 06, RESULT = 07, SYSTEM = 99

export const ERROR_CODES = {
  // ═══════════════════════════════════════════
  // AUTH ERRORS (TKA-01-xxx)
  // ═══════════════════════════════════════════
  AUTH_INVALID_CREDENTIALS:    { code: 'TKA-01-001', message: 'Username atau password salah', status: 401 },
  AUTH_ACCOUNT_LOCKED:         { code: 'TKA-01-002', message: 'Akun terkunci. Coba lagi setelah 30 menit', status: 423 },
  AUTH_ACCOUNT_DISABLED:       { code: 'TKA-01-003', message: 'Akun dinonaktifkan. Hubungi admin', status: 403 },
  AUTH_TOKEN_EXPIRED:          { code: 'TKA-01-004', message: 'Sesi telah berakhir. Silakan login kembali', status: 401 },
  AUTH_TOKEN_INVALID:          { code: 'TKA-01-005', message: 'Token tidak valid', status: 401 },
  AUTH_REFRESH_TOKEN_EXPIRED:  { code: 'TKA-01-006', message: 'Refresh token kadaluarsa', status: 401 },
  AUTH_INSUFFICIENT_ROLE:      { code: 'TKA-01-007', message: 'Anda tidak memiliki akses untuk ini', status: 403 },
  AUTH_2FA_REQUIRED:           { code: 'TKA-01-008', message: 'Verifikasi 2FA diperlukan', status: 403 },
  AUTH_2FA_INVALID:            { code: 'TKA-01-009', message: 'Kode 2FA tidak valid', status: 401 },
  AUTH_PASSWORD_TOO_WEAK:      { code: 'TKA-01-010', message: 'Password terlalu lemah', status: 400 },
  AUTH_PASSWORD_REUSED:        { code: 'TKA-01-011', message: 'Password sudah pernah digunakan', status: 400 },
  AUTH_SESSION_EXPIRED:        { code: 'TKA-01-012', message: 'Sesi idle terlalu lama', status: 401 },
  AUTH_DEVICE_NOT_TRUSTED:     { code: 'TKA-01-013', message: 'Perangkat tidak dikenali', status: 403 },
  AUTH_MAX_DEVICES_REACHED:    { code: 'TKA-01-014', message: 'Batas perangkat tercapai', status: 403 },
  AUTH_IP_BLOCKED:             { code: 'TKA-01-015', message: 'IP address diblokir', status: 403 },

  // ═══════════════════════════════════════════
  // USER ERRORS (TKA-02-xxx)
  // ═══════════════════════════════════════════
  USER_NOT_FOUND:              { code: 'TKA-02-001', message: 'User tidak ditemukan', status: 404 },
  USER_EMAIL_EXISTS:           { code: 'TKA-02-002', message: 'Email sudah terdaftar', status: 409 },
  USER_USERNAME_EXISTS:        { code: 'TKA-02-003', message: 'Username sudah terdaftar', status: 409 },
  USER_CANNOT_DELETE_SELF:     { code: 'TKA-02-004', message: 'Tidak bisa menghapus akun sendiri', status: 400 },

  // ═══════════════════════════════════════════
  // SCHOOL ERRORS (TKA-03-xxx)
  // ═══════════════════════════════════════════
  SCHOOL_NOT_FOUND:            { code: 'TKA-03-001', message: 'Sekolah tidak ditemukan', status: 404 },
  SCHOOL_NPSN_EXISTS:          { code: 'TKA-03-002', message: 'NPSN sudah terdaftar', status: 409 },
  SCHOOL_ACCESS_DENIED:        { code: 'TKA-03-003', message: 'Anda tidak memiliki akses ke sekolah ini', status: 403 },

  // ═══════════════════════════════════════════
  // STUDENT ERRORS (TKA-04-xxx)
  // ═══════════════════════════════════════════
  STUDENT_NOT_FOUND:           { code: 'TKA-04-001', message: 'Siswa tidak ditemukan', status: 404 },
  STUDENT_NISN_EXISTS:         { code: 'TKA-04-002', message: 'NISN sudah terdaftar', status: 409 },
  STUDENT_IMPORT_FAILED:       { code: 'TKA-04-003', message: 'Gagal import data siswa', status: 400 },
  STUDENT_IMPORT_INVALID_FILE: { code: 'TKA-04-004', message: 'Format file tidak valid', status: 400 },

  // ═══════════════════════════════════════════
  // QUESTION ERRORS (TKA-05-xxx)
  // ═══════════════════════════════════════════
  QUESTION_BANK_NOT_FOUND:     { code: 'TKA-05-001', message: 'Bank soal tidak ditemukan', status: 404 },
  QUESTION_NOT_FOUND:          { code: 'TKA-05-002', message: 'Soal tidak ditemukan', status: 404 },
  QUESTION_BANK_PUBLISHED:     { code: 'TKA-05-003', message: 'Bank soal sudah dipublish, tidak bisa diubah', status: 400 },
  QUESTION_BANK_IN_USE:        { code: 'TKA-05-004', message: 'Bank soal sedang digunakan untuk ujian aktif', status: 400 },
  QUESTION_NO_CORRECT_ANSWER:  { code: 'TKA-05-005', message: 'Soal PG harus memiliki 1 jawaban benar', status: 400 },
  QUESTION_IMPORT_FAILED:      { code: 'TKA-05-006', message: 'Gagal import soal', status: 400 },

  // ═══════════════════════════════════════════
  // EXAM ERRORS (TKA-06-xxx)
  // ═══════════════════════════════════════════
  EXAM_NOT_FOUND:              { code: 'TKA-06-001', message: 'Ujian tidak ditemukan', status: 404 },
  EXAM_NOT_DRAFT:              { code: 'TKA-06-002', message: 'Ujian hanya bisa diubah saat status DRAFT', status: 400 },
  EXAM_ALREADY_ACTIVE:         { code: 'TKA-06-003', message: 'Ujian sudah berjalan', status: 400 },
  EXAM_SESSION_NOT_FOUND:      { code: 'TKA-06-004', message: 'Sesi ujian tidak ditemukan', status: 404 },
  EXAM_SESSION_FULL:           { code: 'TKA-06-005', message: 'Sesi ujian sudah penuh', status: 400 },
  EXAM_ROOM_NOT_FOUND:         { code: 'TKA-06-006', message: 'Ruang ujian tidak ditemukan', status: 404 },
  EXAM_ROOM_FULL:              { code: 'TKA-06-007', message: 'Ruang ujian sudah penuh', status: 400 },
  EXAM_STUDENT_NOT_ASSIGNED:   { code: 'TKA-06-008', message: 'Siswa belum di-assign ke sesi ujian', status: 400 },
  EXAM_TOKEN_INVALID:          { code: 'TKA-06-009', message: 'Token ujian tidak valid', status: 401 },
  EXAM_NOT_STARTED:            { code: 'TKA-06-010', message: 'Ujian belum dimulai oleh proktor', status: 400 },
  EXAM_ALREADY_SUBMITTED:      { code: 'TKA-06-011', message: 'Ujian sudah disubmit', status: 400 },
  EXAM_TIME_EXPIRED:           { code: 'TKA-06-012', message: 'Waktu ujian sudah habis', status: 400 },
  EXAM_STUDENT_KICKED:         { code: 'TKA-06-013', message: 'Anda dikeluarkan dari ujian', status: 403 },
  EXAM_CHEATING_DETECTED:      { code: 'TKA-06-014', message: 'Pelanggaran terdeteksi', status: 403 },
  EXAM_WAVE_NOT_FOUND:         { code: 'TKA-06-015', message: 'Gelombang ujian tidak ditemukan', status: 404 },

  // ═══════════════════════════════════════════
  // RESULT ERRORS (TKA-07-xxx)
  // ═══════════════════════════════════════════
  RESULT_NOT_FOUND:            { code: 'TKA-07-001', message: 'Hasil ujian tidak ditemukan', status: 404 },
  RESULT_NOT_CALCULATED:       { code: 'TKA-07-002', message: 'Hasil ujian belum dihitung', status: 400 },
  RESULT_ESSAY_PENDING:        { code: 'TKA-07-003', message: 'Masih ada essay yang belum dikoreksi', status: 400 },
  GRADING_ALREADY_DONE:        { code: 'TKA-07-004', message: 'Jawaban sudah dikoreksi', status: 400 },

  // ═══════════════════════════════════════════
  // SYSTEM ERRORS (TKA-99-xxx)
  // ═══════════════════════════════════════════
  SYSTEM_INTERNAL_ERROR:       { code: 'TKA-99-001', message: 'Terjadi kesalahan sistem', status: 500 },
  SYSTEM_DATABASE_ERROR:       { code: 'TKA-99-002', message: 'Kesalahan database', status: 500 },
  SYSTEM_REDIS_ERROR:          { code: 'TKA-99-003', message: 'Kesalahan cache server', status: 500 },
  SYSTEM_STORAGE_ERROR:        { code: 'TKA-99-004', message: 'Kesalahan penyimpanan file', status: 500 },
  SYSTEM_RATE_LIMITED:         { code: 'TKA-99-005', message: 'Terlalu banyak request. Coba lagi nanti', status: 429 },
  SYSTEM_MAINTENANCE:          { code: 'TKA-99-006', message: 'Sistem sedang dalam pemeliharaan', status: 503 },
  SYSTEM_VALIDATION_ERROR:     { code: 'TKA-99-007', message: 'Data tidak valid', status: 400 },
  SYSTEM_FILE_TOO_LARGE:       { code: 'TKA-99-008', message: 'Ukuran file terlalu besar', status: 413 },
  SYSTEM_UNSUPPORTED_FILE:     { code: 'TKA-99-009', message: 'Tipe file tidak didukung', status: 415 },
} as const;
```

---

## 🔷 6. DATABASE SEEDING STRATEGY

```typescript name=apps/api/prisma/seeds/index.ts
// ============================================================
// DATABASE SEEDER - Main Entry
// ============================================================

import { PrismaClient } from '@prisma/client';
import { seedProvinces } from './provinces.seed';
import { seedCities } from './cities.seed';
import { seedDistricts } from './districts.seed';
import { seedSubjects } from './subjects.seed';
import { seedAcademicYears } from './academic-years.seed';
import { seedUsers } from './users.seed';
import { seedSchools } from './schools.seed';
import { seedStudents } from './students.seed';
import { seedAppSettings } from './app-settings.seed';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Starting database seeding...\n');

  // Order matters! (foreign key dependencies)
  console.log('1/9  🌍 Seeding provinces...');
  await seedProvinces(prisma);

  console.log('2/9  🏙️  Seeding cities...');
  await seedCities(prisma);

  console.log('3/9  🏘️  Seeding districts...');
  await seedDistricts(prisma);

  console.log('4/9  📚 Seeding subjects...');
  await seedSubjects(prisma);

  console.log('5/9  📅 Seeding academic years...');
  await seedAcademicYears(prisma);

  console.log('6/9  ⚙️  Seeding app settings...');
  await seedAppSettings(prisma);

  console.log('7/9  👥 Seeding users...');
  await seedUsers(prisma);

  console.log('8/9  🏫 Seeding schools...');
  await seedSchools(prisma);

  console.log('9/9  👨‍🎓 Seeding students...');
  await seedStudents(prisma);

  console.log('\n✅ Database seeding completed!');
  console.log('\n📋 Default credentials:');
  console.log('   Super Admin  → superadmin / SuperAdmin@TKA2026');
  console.log('   Disdik       → disdik.bandung / Disdik@TKA2026');
  console.log('   FKKG         → fkkg.bandung / FKKG@TKA2026');
  console.log('   Admin Sekolah → admin.sdn1 / AdminSekolah@TKA2026');
  console.log('   Proktor      → proktor.sdn1 / Proktor@TKA2026');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

```typescript name=apps/api/prisma/seeds/users.seed.ts
// ============================================================
// USER SEEDER
// ============================================================

import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient): Promise<void> {
  const salt = await bcrypt.genSalt(12);

  const users = [
    {
      email: 'superadmin@tka-ujian.id',
      username: 'superadmin',
      password: await bcrypt.hash('SuperAdmin@TKA2026', salt),
      fullName: 'Super Administrator',
      phone: '081200000001',
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
    {
      email: 'disdik.bandung@tka-ujian.id',
      username: 'disdik.bandung',
      password: await bcrypt.hash('Disdik@TKA2026', salt),
      fullName: 'Admin Disdik Kota Bandung',
      phone: '081200000002',
      role: UserRole.ADMIN_DISDIK,
      // cityId will be set after cities are seeded
      isActive: true,
    },
    {
      email: 'fkkg.bandung@tka-ujian.id',
      username: 'fkkg.bandung',
      password: await bcrypt.hash('FKKG@TKA2026', salt),
      fullName: 'Admin FKKG Kota Bandung',
      phone: '081200000003',
      role: UserRole.ADMIN_FKKG,
      isActive: true,
    },
    {
      email: 'admin.sdn1@tka-ujian.id',
      username: 'admin.sdn1',
      password: await bcrypt.hash('AdminSekolah@TKA2026', salt),
      fullName: 'Admin SDN 1 Bandung',
      phone: '081200000004',
      role: UserRole.ADMIN_SEKOLAH,
      isActive: true,
    },
    {
      email: 'proktor.sdn1@tka-ujian.id',
      username: 'proktor.sdn1',
      password: await bcrypt.hash('Proktor@TKA2026', salt),
      fullName: 'Proktor SDN 1 Bandung',
      phone: '081200000005',
      role: UserRole.PROKTOR,
      isActive: true,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    });
  }

  console.log(`   ✅ ${users.length} users seeded`);
}
```

```typescript name=apps/api/prisma/seeds/subjects.seed.ts
// ============================================================
// SUBJECTS SEEDER
// ============================================================

import { PrismaClient, SchoolLevel } from '@prisma/client';

export async function seedSubjects(prisma: PrismaClient): Promise<void> {
  const subjects = [
    // SD
    { code: 'MTK-SD',   name: 'Matematika',         levels: [SchoolLevel.SD] },
    { code: 'BIN-SD',   name: 'Bahasa Indonesia',    levels: [SchoolLevel.SD] },
    { code: 'IPA-SD',   name: 'IPA',                 levels: [SchoolLevel.SD] },
    { code: 'IPS-SD',   name: 'IPS',                 levels: [SchoolLevel.SD] },
    { code: 'PKN-SD',   name: 'PKN',                 levels: [SchoolLevel.SD] },
    { code: 'PAI-SD',   name: 'Pendidikan Agama Islam', levels: [SchoolLevel.SD] },
    { code: 'BING-SD',  name: 'Bahasa Inggris',      levels: [SchoolLevel.SD] },

    // SMP
    { code: 'MTK-SMP',  name: 'Matematika',          levels: [SchoolLevel.SMP] },
    { code: 'BIN-SMP',  name: 'Bahasa Indonesia',    levels: [SchoolLevel.SMP] },
    { code: 'IPA-SMP',  name: 'IPA',                 levels: [SchoolLevel.SMP] },
    { code: 'IPS-SMP',  name: 'IPS',                 levels: [SchoolLevel.SMP] },
    { code: 'BING-SMP', name: 'Bahasa Inggris',      levels: [SchoolLevel.SMP] },
    { code: 'PKN-SMP',  name: 'PKN',                 levels: [SchoolLevel.SMP] },
    { code: 'PAI-SMP',  name: 'Pendidikan Agama Islam', levels: [SchoolLevel.SMP] },

    // SMA
    { code: 'MTK-SMA',  name: 'Matematika',          levels: [SchoolLevel.SMA] },
    { code: 'BIN-SMA',  name: 'Bahasa Indonesia',    levels: [SchoolLevel.SMA] },
    { code: 'FIS-SMA',  name: 'Fisika',              levels: [SchoolLevel.SMA] },
    { code: 'KIM-SMA',  name: 'Kimia',               levels: [SchoolLevel.SMA] },
    { code: 'BIO-SMA',  name: 'Biologi',             levels: [SchoolLevel.SMA] },
    { code: 'EKO-SMA',  name: 'Ekonomi',             levels: [SchoolLevel.SMA] },
    { code: 'SEJ-SMA',  name: 'Sejarah',             levels: [SchoolLevel.SMA] },
    { code: 'GEO-SMA',  name: 'Geografi',            levels: [SchoolLevel.SMA] },
    { code: 'SOS-SMA',  name: 'Sosiologi',           levels: [SchoolLevel.SMA] },
    { code: 'BING-SMA', name: 'Bahasa Inggris',      levels: [SchoolLevel.SMA] },

    // SMK
    { code: 'MTK-SMK',  name: 'Matematika',          levels: [SchoolLevel.SMK] },
    { code: 'BIN-SMK',  name: 'Bahasa Indonesia',    levels: [SchoolLevel.SMK] },
    { code: 'BING-SMK', name: 'Bahasa Inggris',      levels: [SchoolLevel.SMK] },
    { code: 'TKJ-SMK',  name: 'Teknik Komputer & Jaringan', levels: [SchoolLevel.SMK] },
    { code: 'RPL-SMK',  name: 'Rekayasa Perangkat Lunak',   levels: [SchoolLevel.SMK] },
    { code: 'AKT-SMK',  name: 'Akuntansi',           levels: [SchoolLevel.SMK] },
    { code: 'ADM-SMK',  name: 'Administrasi Perkantoran',   levels: [SchoolLevel.SMK] },
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { code: subject.code },
      update: {},
      create: {
        ...subject,
        isActive: true,
      },
    });
  }

  console.log(`   ✅ ${subjects.length} subjects seeded`);
}
```

---

## 🔷 7. DOCUMENTATION STRUCTURE

```
name=docs/
docs/
├── 📁 architecture/
│   ├── 📄 system-overview.md          # Gambaran besar sistem
│   ├── 📄 data-flow.md                # Alur data
│   ├── 📄 security-architecture.md    # Arsitektur keamanan
│   └── 📁 diagrams/
│       ├── 📄 erd.drawio               # Entity Relationship Diagram
│       ├── 📄 system-architecture.drawio
│       ├── 📄 deployment.drawio
│       └── 📄 exam-flow.drawio         # Flow ujian dari awal-akhir
│
├── 📁 api/
│   ├── 📄 README.md                    # API overview
│   ├── 📄 authentication.md
│   ├── 📄 error-codes.md
│   ├── 📄 rate-limiting.md
│   ├── 📄 websocket-events.md
│   └── 📄 versioning.md
│
├── 📁 deployment/
│   ├── 📄 local-setup.md              # Setup development
│   ├── 📄 staging-deploy.md
│   ├── 📄 production-deploy.md
│   ├── 📄 ssl-setup.md
│   ├── 📄 backup-restore.md
│   └── 📄 disaster-recovery.md
│
├── 📁 user-manual/
│   ├── 📄 super-admin-guide.md
│   ├── 📄 disdik-guide.md
│   ├── 📄 fkkg-guide.md
│   ├── 📄 admin-sekolah-guide.md
│   ├── 📄 proktor-guide.md
│   └── 📄 troubleshooting.md
│
├── 📁 development/
│   ├── 📄 coding-standards.md
│   ├── 📄 git-workflow.md
│   ├── 📄 testing-guide.md
│   ├── 📄 module-development.md        # Cara tambah module baru
│   └── 📄 database-migration-guide.md
│
└── 📄 CHANGELOG.md                     # Version history
```

````markdown name=docs/CHANGELOG.md
# Changelog

Semua perubahan pada project ini akan didokumentasikan di file ini.

Format berdasarkan [Keep a Changelog](https://keepachangelog.com/id/1.0.0/),
dan project ini menggunakan [Semantic Versioning](https://semver.org/lang/id/).

## [Unreleased]

### Added
- Initial project setup dengan Turborepo monorepo
- Database schema dengan Prisma ORM (30 tabel)
- Authentication module (JWT RS256 + 2FA)
- Docker Compose untuk development environment

## [0.1.0] - 2026-02-13

### Added
- Project initialization
- Repository structure
- Development environment configuration
````

---

## 🔷 8. DEVELOPMENT WORKFLOW (Sprint Planning)

```
┌──────────────────────────────────────────────────────────────────────┐
│               SPRINT PLAN - FASE DEVELOPMENT                        │
│               (2-week sprints)                                       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  SPRINT 1 (Week 1-2): FOUNDATION                                   │
│  ├── ✅ Setup monorepo + Docker                                     │
│  ├── ✅ Database schema + migrations                                │
│  ├── ✅ Auth module (login, JWT, refresh, 2FA)                      │
│  ├── ✅ RBAC (role-based access control)                            │
│  ├── ✅ Global exception filter + error codes                       │
│  ├── ✅ Logging + audit trail                                       │
│  └── ✅ Health check endpoints                                      │
│                                                                      │
│  SPRINT 2 (Week 3-4): CORE ENTITIES                                │
│  ├── User CRUD + management                                         │
│  ├── Regional (provinces, cities, districts)                        │
│  ├── School CRUD + management                                       │
│  ├── Subject CRUD                                                    │
│  ├── Student CRUD + import Excel                                    │
│  └── Web: Login page + layout (sidebar, header)                     │
│                                                                      │
│  SPRINT 3 (Week 5-6): QUESTION MANAGEMENT                          │
│  ├── Question Bank CRUD                                              │
│  ├── Question CRUD (PG, Essay, Isian, Benar/Salah)                 │
│  ├── Rich text editor (Tiptap) untuk soal                           │
│  ├── Media upload (gambar, audio)                                    │
│  ├── Import soal dari Excel                                          │
│  └── Web: Portal FKKG (bank soal pages)                             │
│                                                                      │
│  SPRINT 4 (Week 7-8): EXAM SETUP                                   │
│  ├── Exam CRUD                                                       │
│  ├── Exam waves + sessions                                           │
│  ├── Exam rooms                                                      │
│  ├── Student-room-session mapping                                    │
│  ├── Token generation                                                │
│  ├── Exam card generation (PDF)                                      │
│  └── Web: Portal Admin Sekolah (exam setup pages)                   │
│                                                                      │
│  SPRINT 5 (Week 9-10): EXAM ENGINE                                  │
│  ├── WebSocket gateway                                               │
│  ├── Proctor control (start, pause, resume, end)                    │
│  ├── Student exam flow (questions, answers, submit)                 │
│  ├── Auto-save answers                                               │
│  ├── Timer (server-synced)                                           │
│  ├── Real-time monitoring                                            │
│  └── Force submit + kick student                                    │
│                                                                      │
│  SPRINT 6 (Week 11-12): DESKTOP APPS                               │
│  ├── Proktor Electron app                                            │
│  ├── Client Siswa Electron app                                       │
│  ├── Lockdown mode                                                   │
│  ├── Offline mode + local SQLite                                     │
│  ├── Answer sync engine                                              │
│  └── Auto-update mechanism                                          │
│                                                                      │
│  SPRINT 7 (Week 13-14): RESULTS & REPORTS                          │
│  ├── Auto-grading (multiple choice)                                  │
│  ├── Manual grading (essay) by FKKG                                 │
│  ├── Result calculation + ranking                                    │
│  ├── Reports (PDF + Excel export)                                    │
│  ├── Question analysis (difficulty, discrimination)                 │
│  └── Web: Results pages for all roles                               │
│                                                                      │
│  SPRINT 8 (Week 15-16): DASHBOARDS & MONITORING                    │
│  ├── Super Admin dashboard                                           │
│  ├── Disdik dashboard + school map                                   │
│  ├── FKKG dashboard                                                  │
│  ├── Admin Sekolah dashboard                                         │
│  ├── Charts & analytics                                              │
│  ├── School comparison                                               │
│  └── Notifications system                                           │
│                                                                      │
│  SPRINT 9 (Week 17-18): SECURITY & POLISH                          │
│  ├── Security hardening                                              │
│  ├── Rate limiting fine-tuning                                       │
│  ├── IP blacklist management                                         │
│  ├── Device fingerprinting                                           │
│  ├── Anti-cheat behavioral analysis                                  │
│  ├── Data encryption at rest                                         │
│  └── Responsive design                                              │
│                                                                      │
│  SPRINT 10 (Week 19-20): TESTING & DEPLOYMENT                      │
│  ├── Unit tests (target: 80% coverage)                               │
│  ├── Integration tests                                               │
│  ├── E2E tests                                                       │
│  ├── Load testing (5000+ concurrent)                                 │
│  ├── Security testing (penetration test)                             │
│  ├── CI/CD pipeline                                                  │
│  ├── Staging deployment                                              │
│  └── Production deployment                                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🔷 9. MONITORING CHECKLIST SEBELUM PRODUCTION

```typescript name=docs/deployment/production-checklist.ts
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
```

---

## 📊 RINGKASAN SEMUA SARAN

```
┌──────────────────────────────────────────────────────────────┐
│           TOTAL SARAN PENGUATAN PRE-PROJECT                  │
├──────────────────────────────────┬───────────────────────────┤
│ 1. Git Strategy                  │ GitFlow + PR Template     │
│ 2. Coding Standards              │ Naming, ESLint, Prettier  │
│ 3. Environment Strategy          │ Dev → Staging → Prod      │
│ 4. API Versioning                │ URL-based /v1/ /v2/       │
│ 5. Error Code System             │ 50+ standardized codes    │
│ 6. Database Seeding              │ 5 role default users      │
│ 7. Documentation Structure       │ 5 kategori dokumentasi    │
│ 8. Sprint Planning               │ 10 sprint × 2 minggu     │
│ 9. Production Checklist          │ 50+ checklist items       │
├──────────────────────────────────┴───────────────────────────┤
│                                                              │
│  STATUS KESELURUHAN:                                         │
│  ✅ Tech Stack           → FINAL                            │
│  ✅ Database Schema      → 30 tabel lengkap                 │
│  ✅ API Specification    → 115+ endpoints                   │
│  ✅ Security Hardening   → 5 layer protection               │
│  ✅ Project Structure    → Monorepo Turborepo               │
│  ✅ Coding Standards     → Documented                       │
│  ✅ Git Strategy         → GitFlow                          │
│  ✅ Sprint Planning      → 10 sprints (20 minggu)           │
│  ✅ Error Codes          → Standardized                     │
│  ✅ Production Checklist → Comprehensive                    │
│                                                              │
│  📋 SEMUA FONDASI SUDAH SIAP!                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

Semua fondasi project sudah **100% siap**. Tidak ada lagi yang perlu disiapkan sebelum mulai coding.

**Langkah selanjutnya yang kita kerjakan:**

> **🚀 SPRINT 1: Mulai coding!**
> 1. **Inisialisasi repository** — Buat repo GitHub, setup monorepo, commit semua config files
> 2. **Jalankan Docker** — PostgreSQL, Redis, MinIO
> 3. **Database migration** — Prisma migrate semua 30 tabel
> 4. **Seed data** — Insert data awal (wilayah, users, subjects)
> 5. **Auth module** — Login, JWT RS256, refresh token, RBAC, 2FA

Mau kita langsung mulai Sprint 1? 🔥

# ============================================================
# TKA UJIAN - ENVIRONMENT VARIABLES
# Copy this file to .env and fill in the values
# ============================================================

# General
NODE_ENV=development
APP_NAME="TKA Ujian"
APP_URL=http://localhost:3000
API_URL=http://localhost:4000

# Database
DATABASE_URL="postgresql://tka_admin:tka_secret_2026@localhost:5432/tka_ujian?schema=public"
DB_PASSWORD=tka_secret_2026

# Redis
REDIS_URL="redis://:tka_redis_2026@localhost:6379"
REDIS_PASSWORD=tka_redis_2026

# JWT (RS256)
JWT_ACCESS_PRIVATE_KEY_PATH=./keys/access-private.pem
JWT_ACCESS_PUBLIC_KEY_PATH=./keys/access-public.pem
JWT_REFRESH_PRIVATE_KEY_PATH=./keys/refresh-private.pem
JWT_REFRESH_PUBLIC_KEY_PATH=./keys/refresh-public.pem
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# MinIO (Object Storage)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_USER=tka_minio
MINIO_PASSWORD=tka_minio_2026
MINIO_BUCKET=tka-ujian

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM="TKA Ujian <noreply@tka-ujian.id>"

# 2FA
TWO_FACTOR_APP_NAME="TKA Ujian"

# Sentry (Error Tracking)
SENTRY_DSN=

# App Signing Secret (untuk desktop app request signing)
APP_SIGNING_SECRET=your-random-256bit-secret-here

# Encryption Key (untuk data at rest)
ENCRYPTION_KEY=your-random-256bit-encryption-key

# pgAdmin
PGADMIN_PASSWORD=admin123
