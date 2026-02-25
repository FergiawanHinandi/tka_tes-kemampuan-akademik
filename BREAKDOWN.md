# BREAKDOWN FITUR & CHECKLIST

## 1. Perkuat Fitur Offline Mode & Local Cache pada Client Siswa

- [x] Audit kode client siswa: identifikasi bagian yang sudah mendukung offline dan yang belum
- [x] Pastikan data penting (soal, jawaban, timer, dsb) tersimpan di local storage/indexedDB saat offline
- [x] Implementasi sinkronisasi otomatis ke server saat koneksi kembali
- [x] Tambahkan notifikasi visual (misal: banner "Anda sedang offline")
- [x] Tambahkan status sinkronisasi (misal: "Belum sinkron", "Sudah sinkron")
- [x] Uji skenario: putus koneksi saat ujian, refresh halaman, reconnect, dsb
- [x] Dokumentasi cara kerja offline mode untuk QA dan user

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
