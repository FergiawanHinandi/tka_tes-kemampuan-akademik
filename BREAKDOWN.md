# BREAKDOWN FITUR & CHECKLIST

## 1. Perkuat Fitur Offline Mode & Local Cache pada Client Siswa

- [x] Audit kode client siswa: identifikasi bagian yang sudah mendukung offline dan yang belum
- [x] Pastikan data penting (soal, jawaban, timer, dsb) tersimpan di local storage/indexedDB saat offline
- [x] Implementasi sinkronisasi otomatis ke server saat koneksi kembali
- [x] Tambahkan notifikasi visual (misal: banner "Anda sedang offline")
- [x] Tambahkan status sinkronisasi (misal: "Belum sinkron", "Sudah sinkron")
- [x] Uji skenario: putus koneksi saat ujian, refresh halaman, reconnect, dsb
- [x] Dokumentasi cara kerja offline mode untuk QA dan user
- [ ] Standarisasi penyimpanan data besar ujian dengan IndexedDB via library `idb` (soal, jawaban, queue sinkronisasi)
- [ ] Implementasikan service worker berbasis Workbox untuk cache asset statis dan response API penting
- [ ] Tambahkan error handling + fallback saat operasi cache/IndexedDB gagal
- [ ] Tambahkan unit/integration test khusus skenario offline (putus koneksi, refresh, reconnect, retry sync)
- [ ] Simulasikan skenario jaringan tidak stabil dan verifikasi integritas data jawaban tetap aman
- [ ] Tingkatkan kejelasan notifikasi offline/sinkronisasi (warna, ikon, teks) dan validasi pemahaman user/QA

---

## 2. Bangun Halaman Analisis Butir Soal Lanjutan (Korelasi & Validitas) di Portal FKKG

- [x] Rancang UI/UX halaman analisis (tabel, grafik, filter)
- [x] Implementasi perhitungan korelasi (misal: Pearson, Point Biserial)
- [x] Implementasi perhitungan validitas soal
- [x] Integrasi dengan data hasil ujian yang sudah ada
- [x] Tampilkan hasil analisis secara interaktif (chart, highlight soal tidak valid)
- [x] Tambahkan fitur ekspor hasil analisis (CSV/Excel)
- [x] Uji hasil analisis dengan data dummy dan real
- [x] Dokumentasi penggunaan halaman analisis
- [ ] Audit dan dokumentasikan library statistik/chart yang dipakai (math.js, Chart.js, atau setara) agar konsisten lintas tim

---

## 3. Integrasi Sistem Notifikasi Push (Email/WA) untuk Jadwal Ujian ke Admin Sekolah

- [x] Pilih provider notifikasi (SMTP, SendGrid, Twilio, WhatsApp API)
- [x] Buat endpoint backend untuk trigger notifikasi
- [x] Integrasi dengan jadwal ujian (trigger otomatis/manual)
- [x] Buat template pesan notifikasi (email & WA)
- [x] Logging dan monitoring pengiriman notifikasi
- [x] Uji pengiriman notifikasi ke beberapa admin
- [x] Dokumentasi setup dan troubleshooting notifikasi

---

## 4. Stabilisasi Fondasi Repositori & Build Pipeline

- [ ] Selesaikan konflik merge aktif di README/.gitignore dan rapikan baseline branch
- [ ] Tetapkan satu struktur workspace resmi untuk desktop (hapus ambiguitas path)
- [ ] Perbaiki dependency backend auth yang hilang (`@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt`, dst)
- [ ] Selesaikan error type backend kritikal (AuthService/UsersService/import type/decorator typing)
- [ ] Perbaiki error type frontend yang menghambat (`web-disdik`, `web-super-admin`)
- [ ] Buat matrix health check standar per app (`check-types`, `test`, `lint`) dan dokumentasikan hasil baseline
- [ ] Tambahkan gate kualitas minimal agar regresi build tidak lolos

---

## 5. Penyelesaian API Inti Sesuai ERD & Alur Bisnis

- [ ] Ubah modul `schools` dan `exams` dari in-memory ke persistence database
- [ ] Lengkapi API manajemen sesi/ruang/gelombang ujian (CRUD + validasi jadwal)
- [ ] Implementasi API mapping siswa-ke-ruang-sesi (`exam_room_students`, `student_exams`)
- [ ] Lengkapi API audit log dan jejak aktivitas lintas modul
- [ ] Lengkapi API download center (versioning rilis client/proktor)
- [ ] Tambahkan Swagger/OpenAPI untuk semua endpoint aktif
- [ ] Sinkronkan kontrak DTO/response dengan frontend yang sudah ada

---

## 6. Penyelesaian Portal Web Berdasarkan Wireframe Prioritas

- [ ] Ubah seluruh halaman placeholder jadi halaman fungsional di `web-admin-sekolah`
- [ ] Ubah seluruh halaman placeholder jadi halaman fungsional di `web-fkkg`
- [ ] Lengkapi modul inti `web-disdik` (daftar sekolah, hasil, laporan, profil)
- [ ] Lengkapi modul inti `web-super-admin` (user, sekolah, siswa, ujian)
- [ ] Standardisasi reusable component dari `packages/ui-components`
- [ ] Terapkan global error/loading states dan empty state konsisten lintas portal
- [ ] Pastikan responsive + aksesibilitas minimum sesuai design-system

---

## 7. Hardening Desktop Proktor & Client Siswa

- [ ] Finalisasi flow login/sinkronisasi Proktor ke API produksi
- [ ] Implementasi dashboard monitoring Proktor real-time (status siswa + kontrol ujian)
- [ ] Lengkapi flow Client Siswa end-to-end (login, waiting room, exam, review, submit)
- [ ] Lanjutkan hardening lockdown (fullscreen enforcement, shortcut/reporting, process policy)
- [ ] Lengkapi sinkronisasi offline-reconnect lintas skenario crash/reopen
- [ ] Tambahkan auto-update strategy dan kanal rilis terverifikasi
- [ ] Siapkan build & packaging target OS yang disepakati

---

## 8. DevOps, Security, dan Compliance Readiness

- [ ] Terapkan rate limiting, security headers, dan kebijakan CORS/CSRF yang jelas
- [ ] Definisikan environment staging/production + secret management
- [ ] Siapkan pipeline CI/CD minimum (typecheck, test, build, artifact)
- [ ] Siapkan backup DB terjadwal + uji restore berkala
- [ ] Tambahkan observability dasar (error tracking, app metrics, alerting)
- [ ] Definisikan baseline kepatuhan data (retensi, akses, audit, PDP)
- [ ] Dokumentasikan runbook incident dan recovery

---

## 9. Program QA Komprehensif & Kriteria Rilis

- [ ] Tambahkan unit test untuk service kritikal backend (auth, exams, mapping, sync)
- [ ] Tambahkan integration test untuk alur antarmodul dan database
- [ ] Tambahkan e2e test lintas role (admin, fkkg, disdik, siswa, proktor)
- [ ] Jalankan load/stress test bertahap dan catat threshold bottleneck
- [ ] Jalankan skenario offline/network/lockdown dan verifikasi integritas data jawaban
- [ ] Tetapkan release criteria kuantitatif (pass rate, latency, error budget)
- [ ] Buat template regression checklist per release

---

## 10. Konsolidasi Dokumentasi & Governance Produk

- [ ] Tentukan dokumen sumber-kebenaran (canonical) dan tandai dokumen arsip/non-canonical
- [ ] Sinkronkan `docs/planning/task-list.md` dengan status implementasi aktual terbaru
- [ ] Buat roadmap implementasi berbasis milestone (Sprint 1..n) yang executable
- [ ] Rapikan inkonsistensi encoding/format dokumen agar mudah dibaca lintas editor
- [ ] Buat indeks dokumentasi per domain (backend, web, desktop, devops, QA)
- [ ] Tambahkan changelog pekerjaan berkala yang terhubung ke checklist breakdown
- [ ] Siapkan panduan handover implementasi untuk tim QA dan operasional

---

## Perubahan API/Interface/Type yang Akan Terdampak

- Penyelarasan kontrak auth (`login/profile`) antara DTO backend dan consumer frontend.
- Penambahan endpoint CRUD sesi/ruang/gelombang + endpoint mapping siswa.
- Penambahan endpoint audit log, versioning download center, dan dokumentasi Swagger.
- Harmonisasi response envelope agar konsisten lintas modul.
- Penyesuaian type frontend untuk menghindari mismatch (`ImportMeta`, payload endpoint baru).

---

## Test Cases dan Skenario Validasi

- Backend: `npm --prefix apps/backend/api run check-types`, `npm --prefix apps/backend/api test`.
- Frontend: typecheck per portal (`web-admin-sekolah`, `web-fkkg`, `web-disdik`, `web-super-admin`).
- E2E role flow: login -> setup ujian -> siswa mengerjakan -> submit -> analisis/monitoring.
- Offline desktop: koneksi putus saat ujian, refresh/reopen, reconnect, sinkron final.
- Reliability: load WebSocket + API, verifikasi tidak ada kehilangan jawaban.
- Documentation QA: semua endpoint baru tercatat di Swagger dan docs operasional.

---

## Asumsi dan Default

- Poin 1-3 di breakdown tetap dipertahankan sebagai selesai (`[x]`), tidak diubah.
- Penambahan bersifat delta (hanya item baru), sesuai preferensi Anda.
- Prioritas implementasi dimulai dari stabilitas backend/build sebelum ekspansi fitur UI.
- Dokumen binary (`.pdf`, `.docx`, `.zip`) dipakai sebagai referensi konteks; sumber kerja utama tetap dokumen teks di repo.
