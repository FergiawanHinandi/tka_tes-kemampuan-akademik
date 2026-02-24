# Task List Pengembangan Sistem TKA ✅ / ⏳

Dokumen ini dipakai untuk memantau progress seluruh pengembangan (backend, frontend web, desktop, dan DevOps).

**Legend Status:**

- 🟢 **Selesai** – sudah diimplementasikan dan stabil
- 🟡 **Proses** – sudah ada pondasi/skeleton, belum lengkap
- ⏳ **Belum** – belum dikerjakan

> Catatan: status di bawah mengikuti kondisi _kode saat ini_ di monorepo. Seiring pengembangan, status dan catatan bisa diperbarui.

---

## 4.1 Backend Development (API + Infrastruktur Server)

| ID | Task | Estimasi | Prioritas | Status | Catatan |
|----|------|----------|-----------|--------|---------|
| 4.1.1 | Setup project & boilerplate | 2 hari | 🔴 | 🟢 Selesai | Monorepo + NestJS API (`apps/backend/api`) sudah terbentuk, struktur folder `common` dan `config` sudah di-setup dengan Clean Architecture |
| 4.1.2 | Database migration & seeding | 3 hari | 🔴 | 🟡 Proses | `scripts/database-schema.sql` sudah lengkap, integrasi TypeORM dan Config Database sudah selesai |
| 4.1.3 | Authentication & Authorization (JWT + RBAC) | 5 hari | 🔴 | 🟢 Selesai | JWT, Passport, Roles Guard, dan Login logic sudah diimplementasi |
| 4.1.4 | API - Manajemen User & Role | 3 hari | 🔴 | � Selesai | `UsersModule` sudah menggunakan Repository Pattern (Clean Architecture) dan Entity TypeORM |
| 4.1.5 | API - Manajemen Bank Soal | 4 hari | 🔴 | 🟢 Selesai | `QuestionBankModule` sudah diimplementasi dengan CRUD lengkap, RBAC, dan Entity TypeORM |
| 4.1.6 | API - Manajemen Sekolah | 3 hari | 🔴 | 🟡 Proses | `SchoolsModule` in-memory sudah ada, belum pakai tabel `schools` di DB |
| 4.1.7 | API - Manajemen Siswa + Import Excel | 4 hari | 🔴 | 🟢 Selesai | `StudentsModule` diimplementasi dengan handler ExcelJS dan skema TypeORM |
| 4.1.8 | API - Bank Soal & Editor Soal | 7 hari | 🔴 | 🟢 Selesai | `QuestionBankModule` mendukung CRUD dan penyimpanan konten kaya (rich-content) |
| 4.1.9 | API - Import Soal (Excel/CSV) | 3 hari | 🟡 | ⏳ Belum | Belum ada endpoint khusus import, baru wireframe di sisi FKKG |
| 4.1.10 | API - Pengaturan Ujian (Ruang, Sesi, Gelombang) | 5 hari | 🔴 | 🟡 Proses | Entity `ExamSession` & `ExamRoom` sudah dibuat, API CRUD sedang dikembangkan |
| 4.1.11 | API - Mapping Siswa-Ruang-Sesi | 3 hari | 🔴 | ⏳ Belum | Tabel `exam_room_students` & `student_exams` sudah ada, API mapping belum |
| 4.1.12 | API - Engine Ujian (start, submit, auto-save) | 7 hari | 🔴 | 🟢 Selesai | WebSocket Gateway (`ExamGateway`) dan logic session real-time sudah aktif |
| 4.1.13 | API - Penilaian Otomatis (PG) | 3 hari | 🔴 | 🟢 Selesai | `ScoringModule` diimplementasi dengan kalkulasi otomatis berbasis kategori |
| 4.1.14 | API - Koreksi Manual (Essay) | 4 hari | 🟡 | 🟢 Selesai | `EssaySubmission` entity & scoring service untuk essay sudah aktif |
| 4.1.15 | API - Hasil & Statistik | 5 hari | 🔴 | 🟢 Selesai | `ResultsController` menyediakan data agregasi dan analisis butir soal |
| 4.1.16 | API - Analisis Butir Soal | 4 hari | 🟡 | 🟢 Selesai | Logic perhitungan Difficulty & Discrimination Index sudah ada di `ScoringService` |
| 4.1.17 | API - Laporan & Export (PDF/Excel) | 5 hari | 🟡 | ⏳ Belum | Belum ada modul export, baru requirement & UI wireframe |
| 4.1.18 | API - Notifikasi | 3 hari | 🟡 | ⏳ Belum | Tabel `notifications` sudah ada, belum modul API & push mekanisme |
| 4.1.19 | API - Audit Log | 2 hari | 🟡 | ⏳ Belum | Tabel `audit_logs` sudah ada, trigger/audit middleware di API belum |
| 4.1.20 | WebSocket - Real-time monitoring | 5 hari | 🔴 | 🟢 Selesai | `ExamGateway` mendukung broadcast pengumuman & audit log real-time |
| 4.1.21 | API - Download Center (versioning app) | 3 hari | 🟡 | ⏳ Belum | UI Download Center sudah ada di Portal Admin Sekolah, API versioning belum |
| 4.1.22 | API - Cetak Kartu Ujian | 2 hari | 🔴 | 🟢 Selesai | Export PDF Kartu Ujian otomatis sudah diimplementasikan di `ExportService` |
| 4.1.23 | Rate Limiting & Security Hardening | 3 hari | 🔴 | ⏳ Belum | Belum ada konfigurasi rate limiting, security headers, dsb. |
| 4.1.24 | API Documentation (Swagger/OpenAPI) | 2 hari | 🟡 | ⏳ Belum | Swagger belum dikonfigurasi, masih default Nest skeleton |

---

## 4.2 Frontend Web Development (4 Portal Web)

> Catatan: Saat ini sudah banyak wireframe HTML di `docs/wireframes`, tetapi implementasi React/Vite di `apps/web-*` belum diisi fitur penuh.

| ID | Task | Estimasi | Prioritas | Status | Catatan |
|----|------|----------|-----------|--------|---------|
| 4.2.1 | Setup project & design system | 3 hari | 🔴 | 🟡 Proses | Monorepo + app `apps/frontend/web/*` + dokumen design system dasar sudah ada |
| 4.2.2 | Komponen UI reusable | 5 hari | 🔴 | ⏳ Belum | Package `ui-components` sudah ada, tapi komponen portal belum di-port dari wireframe HTML |
| 4.2.3 | Halaman Login & Auth Flow | 3 hari | 🔴 | ⏳ Belum | Flow login semua portal belum diimplementasi di React, baru wireframe HTML |
| 4.2.4 | Portal Super Admin (semua halaman) | 10 hari | 🔴 | 🟡 Proses | Layout, Dashboard, Login, dan Integrasi API Auth sudah selesai |
| 4.2.5 | Portal Disdik (semua halaman) | 8 hari | 🔴 | 🟡 Proses | Fitur Export Laporan (PDF/Excel) sudah aktif di Dashboard |
| 4.2.6 | Portal FKKG (semua halaman) | 10 hari | 🔴 | 🟡 Proses | Modul Editor, Koreksi Essay, dan Analisis Butir Soal sudah aktif |
| 4.2.7 | Portal Admin Sekolah (semua halaman) | 10 hari | 🔴 | 🟡 Proses | Fitur Broadcast Pengumuman sudah aktif di halaman Monitoring |
| 4.2.8 | WYSIWYG Editor Soal | 5 hari | 🔴 | ⏳ Belum | UI editor soal sudah di wireframe FKKG, integrasi editor + API belum |
| 4.2.9 | Dashboard Charts & Grafik | 4 hari | 🟡 | ⏳ Belum | Recharts sudah direncanakan, belum diimplementasi di app React |
| 4.2.10 | Peta Sebaran Sekolah | 3 hari | 🟢 | ⏳ Belum | Belum ada integrasi map (Leaflet/Mapbox/Google Maps) |
| 4.2.11 | File Upload Handler | 2 hari | 🔴 | ⏳ Belum | Flow upload siswa & soal ada di wireframe, handler React + API belum |
| 4.2.12 | Responsive Design | 4 hari | 🟡 | ⏳ Belum | Wireframe sudah mempertimbangkan responsive, implementasi Tailwind di React belum |
| 4.2.13 | Error Handling & Loading States | 2 hari | 🔴 | ⏳ Belum | Belum ada error boundary/global loader di frontend |
| 4.2.14 | Internationalization (i18n) jika perlu | 2 hari | 🟢 | ⏳ Belum | Belum ada setup i18n di frontend |

---

## 4.3 Desktop App – Proktor Exam (Electron.js)

> Catatan: UI/UX Proktor sudah dibuat dalam bentuk wireframe HTML di `docs/wireframes/proktor-*.html` (login, dashboard, pilih sesi, kontrol ujian, log, sinkronisasi). Belum ada project Electron.

| ID | Task | Estimasi | Prioritas | Status | Catatan |
|----|------|----------|-----------|--------|---------|
| 4.3.1 | Setup Electron project | 2 hari | 🔴 | � Selesai | Desktop Proktor diinisialisasi dengan real-time monitoring & broadcast capability |
| 4.3.2 | Login & sinkronisasi dengan server | 3 hari | 🔴 | ⏳ Belum | Flow UI login & sinkronisasi sudah di wireframe, integrasi API belum |
| 4.3.3 | Dashboard pengawasan real-time | 5 hari | 🔴 | ⏳ Belum | Halaman monitoring lengkap sudah di `proktor-dashboard.html`, perlu di-port ke Electron + WebSocket |
| 4.3.4 | Kontrol ujian (start, pause, stop) | 4 hari | 🔴 | ⏳ Belum | UI kontrol ujian ada di `proktor-kontrol-ujian.html`, logic ke API belum |
| 4.3.5 | Monitoring status siswa (WebSocket) | 4 hari | 🔴 | ⏳ Belum | Belum ada implementasi WebSocket di desktop |
| 4.3.6 | Alert & notifikasi kecurangan | 3 hari | 🟡 | ⏳ Belum | UI alert sudah ada di dashboard, integrasi dengan `exam_logs` belum |
| 4.3.7 | Offline mode & data sync | 5 hari | 🟡 | ⏳ Belum | Konsep sinkronisasi sudah ada di `proktor-sinkronisasi-data.html`, implementasi SQLite + sync belum |
| 4.3.8 | Auto-update mechanism | 3 hari | 🟡 | ⏳ Belum | Belum ada auto-updater Electron |
| 4.3.9 | Logging & troubleshooting | 2 hari | 🟡 | ⏳ Belum | Belum ada logging strategi untuk desktop |
| 4.3.10 | Build & packaging (Windows/Mac/Linux) | 2 hari | 🔴 | ⏳ Belum | Belum ada konfigurasi build Electron |

---

## 4.4 Desktop App – Client Siswa (Electron.js)

> Catatan: Wireframe UI untuk Client Siswa sudah lengkap di `docs/wireframes` (login, waiting room, exam, review, finish, lockdown UX). Implementasi Electron + lockdown logic belum.

| ID | Task | Estimasi | Prioritas | Status | Catatan |
|----|------|----------|-----------|--------|---------|
| 4.4.1 | Setup Electron project | 2 hari | 🔴 | 🟢 Selesai | Desktop Client Siswa sudah terinisialisasi dengan Kiosk Mode & Socket integration |
| 4.4.2 | Login siswa & waiting room | 3 hari | 🔴 | ⏳ Belum | UI `client-siswa-login` & `client-siswa-waiting` sudah ada, integrasi API belum |
| 4.4.3 | Halaman ujian (soal, jawaban, navigasi) | 7 hari | 🔴 | ⏳ Belum | UI `client-siswa-exam.html` sudah lengkap, port ke Electron + API engine belum |
| 4.4.4 | Timer countdown | 2 hari | 🔴 | ⏳ Belum | Timer di prototype hanya client-side, perlu sinkronisasi server |
| 4.4.5 | Auto-save jawaban (lokal + server) | 3 hari | 🔴 | ⏳ Belum | Belum ada mekanisme auto-save lokal/remote di app desktop |
| 4.4.6 | Review & submit final | 3 hari | 🔴 | ⏳ Belum | UI `client-siswa-review.html` sudah ada, integrasi submit API belum |
| 4.4.7 | LOCKDOWN MODE (konsep umum) | 7 hari | 🔴 | 🟢 Selesai | Kiosk mode, global shortcut blocking, dan blur detection sudah aktif |
| 4.4.8 | ↳ Fullscreen enforcement | - | 🔴 | ⏳ Belum | Perlu kiosk mode + deteksi keluar fullscreen |
| 4.4.9 | ↳ Block keyboard shortcuts | - | 🔴 | ⏳ Belum | Perlu intercept keyboard + pelaporan pelanggaran |
| 4.4.10 | ↳ Block copy-paste & print screen | - | 🔴 | ⏳ Belum | Perlu pembatasan UI + audit, tidak sepenuhnya bisa blok OS |
| 4.4.11 | ↳ Multi-monitor detection | - | 🟡 | 🟢 Selesai | Deteksi via Electron `screen` API + real-time WebSocket alerting sudah aktif |
| 4.4.12 | ↳ Process monitoring (block cheating apps) | - | 🟡 | ⏳ Belum | Perlu desain yang patuh OS, tidak invasif |
| 4.4.13 | Offline mode & local cache | 4 hari | 🟡 | ⏳ Belum | Perlu SQLite lokal + reconciler |
| 4.4.14 | Sinkronisasi jawaban saat reconnect | 3 hari | 🔴 | ⏳ Belum | Perlu API khusus replay jawaban dan resolusi konflik |
| 4.4.15 | Auto-update mechanism | 2 hari | 🟡 | ⏳ Belum | Belum ada auto-updater |
| 4.4.16 | Build & packaging | 2 hari | 🔴 | ⏳ Belum | Belum ada konfigurasi build Electron |

---

## 4.5 DevOps & Infrastructure

| ID | Task | Estimasi | Status | Catatan |
|----|------|----------|--------|---------|
| 4.5.1 | Setup server (staging & production) | 2 hari | ⏳ Belum | Belum ter-record di repo, environment deployment perlu dirinci |
| 4.5.2 | Docker containerization | 3 hari | ⏳ Belum | `docker-compose.yml` ada di rencana, image & pipeline belum final |
| 4.5.3 | CI/CD pipeline (GitHub Actions) | 3 hari | ⏳ Belum | Belum ada workflow CI/CD di repo |
| 4.5.4 | SSL certificate & domain setup | 1 hari | ⏳ Belum | Konfigurasi TLS belum terlihat di repo |
| 4.5.5 | Database backup automation | 2 hari | ⏳ Belum | Belum ada script/cron backup DB |
| 4.5.6 | Monitoring & alerting (Grafana) | 2 hari | ⏳ Belum | Belum ada konfigurasi monitoring di folder `monitoring/` (perlu ditambah) |
| 4.5.7 | CDN setup untuk static assets | 1 hari | ⏳ Belum | Belum ada konfigurasi CDN |
| 4.5.8 | Load balancing (jika diperlukan) | 2 hari | ⏳ Belum | Nginx sudah direncanakan di README, konfigurasi praktis belum dicek |

---

## 5.1 Testing (Uji Coba)

| ID | Task | Detail | Status | Catatan |
|----|------|--------|--------|---------|
| 5.1.1 | Unit Testing | Test setiap fungsi/method di backend | ⏳ Belum | Perlu struktur test di NestJS (Jest) dan coverage target |
| 5.1.2 | Integration Testing | Test integrasi antar modul API | ⏳ Belum | Termasuk test database nyata (PostgreSQL) dan Redis |
| 5.1.3 | E2E Testing | Test alur lengkap per role (Cypress/Playwright) | ⏳ Belum | Fokus flow kritikal: login, buat ujian, siswa mengerjakan, proktor monitoring |
| 5.1.4 | UAT (User Acceptance Test) | Testing oleh perwakilan Disdik, FKKG, Admin Sekolah | ⏳ Belum | Perlu skenario UAT per role dan form feedback |
| 5.1.5 | Load Testing | Simulasi 1000+ siswa ujian bersamaan | ⏳ Belum | Script stress test (`scripts/stress-test/ws-stress.js`) sudah siap untuk 5.000+ koneksi |
| 5.1.6 | Stress Testing | Test batas maksimal server | ⏳ Belum | Naikkan beban sampai sistem mulai melambat, ukur titik jenuh |
| 5.1.7 | Security Testing | Penetration test, SQLi, XSS, CSRF | ⏳ Belum | Bisa mulai dari OWASP ZAP, kemudian manual pentest terarah |
| 5.1.8 | Compatibility Testing | Test di berbagai OS, browser, resolusi | ⏳ Belum | Minimal: Chrome/Edge/Firefox, Windows 10/11, mobile browser |
| 5.1.9 | Offline/Network Testing | Test skenario putus koneksi saat ujian | ⏳ Belum | Fokus Client Siswa + Proktor: auto-save, reconnect, sync jawaban |
| 5.1.10 | Lockdown Testing | Test anti-cheat di berbagai perangkat | ⏳ Belum | Uji fullscreen, shortcut, multi-monitor, aplikasi lain di Windows 10/11 |
| 5.1.11 | Data Integrity Testing | Pastikan jawaban siswa tidak hilang | ⏳ Belum | Simulasikan crash, mati listrik, reconnect; verifikasi `student_answers` dan `student_exams` |
| 5.1.12 | Pilot Testing | Uji coba di 2–3 sekolah pilot | ⏳ Belum | Jalankan ujian nyata skala kecil, kumpulkan semua feedback dan issue |
| 5.1.13 | Performance Benchmarking | Response time < 200ms, uptime 99.9% | ⏳ Belum | Gunakan data dari load test + monitoring (Grafana/Prometheus) |
| 5.1.14 | Regression Testing | Test ulang setelah setiap perbaikan bug | ⏳ Belum | Butuh suite automated regression minimal untuk flow kritikal |

---

## 5.2 Kriteria Kelulusan Testing (Pass Criteria)

Kriteria sistem dianggap layak produksi:

- Tidak ada bug **kritis** yang menyebabkan:
  - Ujian tidak bisa dimulai/diakhiri
  - Jawaban siswa hilang atau terkorupsi
- Response time API < **200ms** di **95th percentile** untuk operasi kritikal (login, start_exam, save_answer, submit_exam) pada beban target
- Mampu menangani **≥ 5.000 siswa simultan** (concurrent users) pada skenario ujian penuh
- Data loss = **0%** untuk jawaban siswa (baik online maupun saat reconnect)
- Uptime sistem minimal **99.9%** pada periode uji beban/staging
- Lockdown mode berjalan efektif di Windows 10/11:
  - Keluar fullscreen, kehilangan fokus, atau aktivitas mencurigakan selalu terdeteksi dan tercatat
  - Kebijakan auto-submit atau tindakan proktor berjalan sesuai aturan
- Auto-save tetap berfungsi ketika koneksi terputus, dengan:
  - Jawaban tersimpan lokal
  - Sinkron otomatis ke server saat koneksi pulih
- Semua role utama:
  - Super Admin, Disdik, FKKG, Admin Sekolah, Proktor, Siswa  
  dapat menjalankan fungsi utamanya tanpa hambatan pada skenario UAT dan pilot testing.

### Catatan Penggunaan

- Setiap kali satu task atau sebagian dari task selesai, update kolom **Status** dan **Catatan** di file ini.
- Untuk kerja harian, bisa fokus per-fase (misalnya 4.1.x dulu, lalu 4.2.x), sambil tetap menjaga:  
  - **Skalabilitas** (query berat pakai index, caching, dan WebSocket only untuk event penting)  
  - **Keamanan** (JWT, RBAC, rate limiting, audit log, tidak ada logic kritikal di frontend)  
  - **Clean Architecture** (presentasi ↔ application/service ↔ domain ↔ infrastruktur terpisah). 

