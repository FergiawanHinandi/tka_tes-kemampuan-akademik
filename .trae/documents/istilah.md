🏗 1️⃣ Software Architecture & Engineering
1. Scaffolding
Generate struktur awal project otomatis (folder, config, boilerplate).
Contoh: nest new api, create-next-app.
2. Refactoring
Memperbaiki struktur kode tanpa mengubah behavior.
Tujuan: maintainability.
3. Modular Monolith
Satu aplikasi besar tapi terpisah modul jelas.
Cocok untuk TKA dibanding microservices di awal.
4. Separation of Concerns
Pisahkan tanggung jawab.
Controller ≠ business logic ≠ repository.
5. SOLID
Prinsip desain OOP agar tidak spaghetti.
6. Clean Architecture
Layered system: domain → application → infrastructure.
7. Dependency Injection
Object tidak buat dependency sendiri. Disuntik dari luar.
🗄 2️⃣ Database & Data Engineering
8. Schema Migration
Versioning struktur database.
9. Indexing
Mempercepat query. Tanpa index = sistem lambat saat 50k siswa login.
10. Transaction
Operasi atomik. Submit exam harus transactional.
11. Isolation Level
Mengontrol race condition antar transaksi.
12. JSONB
Field fleksibel di PostgreSQL. Cocok untuk attempt.
13. Connection Pooling
Batas koneksi DB agar tidak overload.
14. Sharding
Membagi data ke banyak DB (misal per provinsi).
15. Multi-Tenancy
Satu sistem, banyak organisasi terisolasi.
🔐 3️⃣ Security
16. RBAC (Role-Based Access Control)
Hak akses berbasis role.
17. JWT
Token auth berbasis signature.
18. Refresh Token Rotation
Ganti token secara berkala untuk keamanan.
19. Rate Limiting
Batasi request agar tidak brute-force.
20. CSRF
Serangan cross-site request forgery.
21. XSS
Script injection di browser.
22. SQL Injection
Query dimanipulasi user input.
23. Encryption at Rest
Data terenkripsi di database.
24. CSP (Content Security Policy)
Header keamanan browser.
⚙️ 4️⃣ Performance & Scaling
25. Horizontal Scaling
Tambah server, bukan tambah RAM.
26. Load Balancer
Distribusi traffic ke banyak server.
27. Caching
Simpan data sementara (Redis).
28. WebSocket
Realtime monitoring proctor.
29. Latency
Waktu respon server.
30. Throughput
Jumlah request per detik.
31. Idempotency
Request yang sama tidak bikin efek ganda.
🧪 5️⃣ Testing & Quality
32. Unit Test
Tes fungsi kecil.
33. Integration Test
Tes interaksi antar modul.
34. E2E Test
Tes alur dari login sampai submit exam.
35. Load Testing
Simulasi ribuan user.
36. Race Condition
Bug akibat akses bersamaan.
37. Static Analysis
Cek kualitas kode otomatis.
🚀 6️⃣ DevOps
38. CI/CD
Pipeline otomatis lint → test → deploy.
39. Containerization
Docker untuk konsistensi environment.
40. Observability
Monitoring log, metric, tracing.
41. Structured Logging
Log dalam format konsisten (JSON).
42. Health Check Endpoint
Endpoint untuk cek server hidup.
🖥 7️⃣ Electron / Client Security
43. Context Isolation
Pisahkan script utama & renderer.
44. IPC
Komunikasi antar proses di Electron.
45. Lockdown Mode
Mencegah siswa keluar aplikasi.
🎯 8️⃣ Exam Engine Specific
46. Server-Authoritative
Server yang menentukan kebenaran jawaban.
47. Auto-Save
Simpan jawaban periodik.
48. Attempt Lifecycle
Draft → Active → Submitted → Locked.
49. Concurrency Control
Mencegah double submit.
50. Audit Log
Catatan aktivitas tak bisa diubah.
🔥 Yang Paling Krusial Untuk Exam System
Kalau harus prioritaskan:
Multi-tenancy
Transaction & isolation
Concurrency control
Rate limiting
Load testing
Idempotent submission
RBAC
Websocket monitoring
Tanpa ini, sistem ujian hanya “web biasa dengan timer”.

### Builder with MCP
1. Arsitektur & Clean Architecture (bagian 1 di istilah.md)
Istilah terkait:
- Scaffolding, Refactoring, Modular Monolith, Separation of Concerns, SOLID, Clean Architecture, Dependency Injection.
Penyesuaian ke project Anda:
- Modular Monolith + NestJS
  - apps/api akan kita bentuk sebagai modular monolith:
    - Modul besar: auth , users , schools , students , question-banks , exams , exam-engine , results , analytics , notifications , audit .
  - Setiap modul mengikuti pola:
    - Controller (HTTP/WS) → Application Service → Domain (entity, rules) → Repository (infra DB).
- Clean Architecture
  - Tidak ada query DB langsung di controller.
  - Tidak ada logic bisnis di frontend/desktop:
    - Web React dan Electron hanya:
      - Menampilkan data
      - Kirim command (start exam, save answer, dsb.) ke API.
- Refactoring terarah
  - Saat nanti modul-modul mulai kompleks, refactor dilakukan:
    - Pisah domain/application/infra folder
    - Tidak ubah behavior yang sudah ter-cover test.
2. Database & Data Engineering (bagian 2)
Istilah: Schema Migration, Indexing, Transaction, Isolation Level, JSONB, Connection Pooling, Sharding, Multi-Tenancy.
Penyesuaian:
- Schema Migration
  - scripts/database-schema.sql sudah jadi referensi utama.
  - Kita perlu alat migration (misal: TypeORM Migrations, Prisma Migrate, atau knex) supaya:
    - Setiap perubahan schema versi‑controlled
    - Bisa rollback jika ada masalah.
- Indexing
  - Anda sudah punya banyak index ( users_email , students_nisn , exams_start_datetime , dsb.).
  - Saat implementasi API:
    - Query harus menyesuaikan index, bukan sebaliknya.
    - Untuk monitoring real-time proktor:
      - Fokus index di student_exams(exam_id, status) dan exam_logs(exam_id, student_exam_id, created_at) .
- Transaction & Isolation
  - Operasi kritikal:
    - submit_exam , force_submit , mapping siswa-ruang-sesi , koreksi manual harus dalam transaksi.
  - Isolation:
    - Minimal READ COMMITTED ; untuk operasi yang rawan race condition (double submit) bisa pakai locking / SELECT FOR UPDATE .
- JSONB
  - Sudah ada result_details JSONB di exam_results .
  - Cocok untuk menyimpan detail analisis per bagian tanpa membuat banyak tabel baru.
- Connection Pooling
  - Nanti di NestJS DB driver (pg/TypeORM/Prisma) kita pastikan:
    - Pool size diatur untuk 5.000+ users (via backend cluster, bukan 5.000 koneksi DB langsung per node).
- Multi-tenancy
  - Multi organisasi = per Disdik / per sekolah.
  - Dalam schema Anda, ownership sekolah sudah jelas ( schools , schools_disdik_user_id ).
  - Di level aplikasi:
    - Setiap request bawa konteks tenant (provinsi/kota/sekolah) via JWT claims.
    - Query selalu filter per tenant → ini nanti jadi standar di semua modul.
3. Security (bagian 3)
Istilah: RBAC, JWT, Refresh Token Rotation, Rate Limiting, CSRF, XSS, SQL Injection, Encryption at Rest, CSP.
Penyesuaian:
- RBAC
  - Sudah ada tabel roles dan users.role_id .
  - Di API:
    - Guard per-role: @Roles('super_admin') , @Roles('fkkg') , dsb.
    - Permissions bisa pakai kolom permissions JSONB atau mapping table.
- JWT + Refresh Token Rotation
  - Access token pendek (misal 15–30 menit).
  - Refresh token dirotasi dan disimpan di DB/Redis:
    - Tiap refresh mengganti token sebelumnya (cek jamming token).
- Rate Limiting & Security Hardening
  - Implementasi langsung ke task 4.1.23:
    - Rate limit login (mencegah brute-force).
    - Rate limit endpoint ujian (idempotent & throttling).
  - Gunakan class-validator & parameterized query/ORM untuk hindari SQL injection.
  - CSP & XSS:
    - Untuk web portals, set header CSP, sanitasi input yang tampil di UI (contoh WYSIWYG soal).
- Encryption at Rest
  - Minimal:
    - Enkripsi backup DB + storage MinIO (jangan simpan data sensitif plain).
    - Hindari menyimpan password ulang; pakai hash (bcrypt/argon2).
4. Performance & Scaling (bagian 4)
Istilah: Horizontal Scaling, Load Balancer, Caching, WebSocket, Latency, Throughput, Idempotency.
Penyesuaian:
- Horizontal Scaling
  - Target: beberapa node API di belakang Nginx/Load balancer.
  - Tidak mengandalkan single server “sebesar mungkin”.
- Caching (Redis)
  - Dipakai untuk:
    - Session ephemeral (misalnya token proktor/client).
    - Data read-heavy (list sekolah, metadata soal) – dengan TTL.
- WebSocket
  - 4.1.20 + istilah WebSocket:
    - Dipakai untuk:
      - Progress real-time proktor
      - Notifikasi penting (lockdown violation, force-submit)
    - Jangan kirim payload besar; kirim delta/status ringkas.
- Latency & Throughput
  - Nanti di testing:
    - Pastikan P95 < 200 ms untuk operasi kritikal.
    - Ukur throughput saat 5.000 siswa simultan:
      - save_answer
      - submit_exam
      - WS events.
- Idempotency
  - Penting untuk:
    - submit_exam , force_submit , koreksi :
      - Jika request dikirim dua kali (retry jaringan), hasil tetap satu.
    - Kita akan pakai attempt_id + status lifecycle untuk kontrol ini.
5. Testing & Quality (bagian 5)
Istilah: Unit Test, Integration Test, E2E Test, Load Testing, Race Condition, Static Analysis.
Penyesuaian:
- Semua istilah ini sudah masuk ke Fase 5 / 5.1 di docs/task-list.md .
- Implementasi:
  - Unit & integration → Jest (NestJS) + test DB.
  - E2E → Cypress/Playwright, sesuai 5.1.3.
  - Load testing → k6/JMeter (5.1.5, 5.1.6, 5.1.13).
  - Static Analysis → ESLint, TypeScript strict, mungkin Sonar/lainnya.
  - Race Condition → khususnya di engine ujian dan mapping siswa-ruang-sesi.
6. DevOps (bagian 6)
Istilah: CI/CD, Containerization, Observability, Structured Logging, Health Check Endpoint.
Penyesuaian:
- CI/CD (4.5.3)
  - Pipeline:
    - lint → test → build → docker → deploy.
- Containerization (4.5.2)
  - Docker untuk API, frontend, worker, database (dev), dan Redis.
- Observability
  - Log terstruktur (JSON) dari NestJS:
    - field: timestamp, requestId, userId, role, endpoint, status.
  - Health check endpoint:
    - GET /health cek DB, Redis, WS server.
7. Electron / Client Security (bagian 7)
Istilah: Context Isolation, IPC, Lockdown Mode.
Penyesuaian:
- Untuk Proktor dan Client Siswa :
  - contextIsolation: true dan disable nodeIntegration di renderer.
  - Komunikasi hanya lewat IPC dan REST/WS; tidak expose API OS ke window ujian sembarangan.
  - Lockdown mode:
    - Event-level: fokus window, fullscreen, keyboard events → dikirim ke server sebagai exam_logs .
    - Keputusan (auto-submit, kick) tetap di engine backend.
8. Exam Engine Specific (bagian 8)
Istilah: Server-Authoritative, Auto-Save, Attempt Lifecycle, Concurrency Control, Audit Log.
Penyesuaian langsung ke design engine ujian (4.1.12–4.1.16):
- Server‑Authoritative
  - Kebenaran jawaban, skor, status ujian semua ditentukan backend:
    - Client hanya mengirim jawaban mentah + metadata.
- Auto-Save
  - Periodik (misalnya setiap N detik / perubahan jawaban):
    - Tersimpan lokal (Electron) dan ke server (jika online).
    - Kalau offline → disimpan di local storage/SQLite, lalu sync (4.4.14).
- Attempt Lifecycle
  - Setiap student_exam :
    - draft → active → submitted → locked
    - Status ini jadi dasar concurrency & idempotency; tidak boleh submit 2x.
- Concurrency Control
  - Cegah double submit dengan:
    - Transaction + status check ( WHERE status = 'active' ).
    - Idempotency key (misalnya attempt_id atau requestId) kalau perlu.
- Audit Log
  - Tabel audit_logs dan exam_logs :
    - Semua event penting (login, start_exam, submit, force_submit, lock, violation) tercatat immutable.
9. Cara Kita Kerjakan Secara Bertahap
Supaya istilah-istilah ini betul‑betul “hidup” di project, step berikut (tanpa menunggu lagi):
1. Backend Foundation (Fase 4.1 + istilah 1–3 & 16–24)
   - Bentuk struktur Clean Architecture di apps/api (modular monolith).
   - Implementasi Auth+RBAC (JWT + refresh rotation).
   - Hubungkan schema SQL ke migration tool, mulai dari users , roles , schools .
2. Exam Engine Core (Fase 4.1.10–4.1.13 + istilah 25–32, 46–49)
   - Model student_exams dengan lifecycle.
   - Endpoint start_exam , save_answer , submit_exam dengan transaksi dan idempotency.
3. Monitoring & WebSocket (Fase 4.1.20 + istilah WebSocket, Observability)
   - Channel WS untuk proktor + log event penting (violation, status).
4. Desktop Lockdown & Offline (Fase 4.3/4.4 + istilah Electron & Lockdown)
   - Setelah backend engine stabil, baru bawa ke Electron dengan contextIsolation, IPC, lockdown mode, dan offline sync.
Di setiap fase, kita akan update docs/task-list.md (status + catatan), dan memastikan hal-hal dari istilah.md menjadi checklist kualitas, bukan hanya teori.
Kalau Anda setuju, langkah konkret berikut yang bisa saya lakukan adalah mulai dari Fase 4.1 – Backend Foundation : membentuk struktur modul auth/users/schools dengan pola Clean Architecture + menyiapkan kerangka JWT/RBAC sesuai istilah di atas.