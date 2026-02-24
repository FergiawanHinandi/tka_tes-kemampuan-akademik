# BREAKDOWN FITUR & CHECKLIST

## 1. Perkuat Fitur Offline Mode & Local Cache pada Client Siswa

- [ ] Audit kode client siswa: identifikasi bagian yang sudah mendukung offline dan yang belum
- [ ] Pastikan data penting (soal, jawaban, timer, dsb) tersimpan di local storage/indexedDB saat offline
- [ ] Implementasi sinkronisasi otomatis ke server saat koneksi kembali
- [ ] Tambahkan notifikasi visual (misal: banner “Anda sedang offline”)
- [ ] Tambahkan status sinkronisasi (misal: “Belum sinkron”, “Sudah sinkron”)
- [ ] Uji skenario: putus koneksi saat ujian, refresh halaman, reconnect, dsb
- [ ] Dokumentasi cara kerja offline mode untuk QA dan user

---

## 2. Bangun Halaman Analisis Butir Soal Lanjutan (Korelasi & Validitas) di Portal FKKG

- [ ] Rancang UI/UX halaman analisis (tabel, grafik, filter)
- [ ] Implementasi perhitungan korelasi (misal: Pearson, Point Biserial)
- [ ] Implementasi perhitungan validitas soal
- [ ] Integrasi dengan data hasil ujian yang sudah ada
- [ ] Tampilkan hasil analisis secara interaktif (chart, highlight soal tidak valid)
- [ ] Tambahkan fitur ekspor hasil analisis (CSV/Excel)
- [ ] Uji hasil analisis dengan data dummy dan real
- [ ] Dokumentasi penggunaan halaman analisis

---

## 3. Integrasi Sistem Notifikasi Push (Email/WA) untuk Jadwal Ujian ke Admin Sekolah

- [ ] Pilih provider notifikasi (SMTP, SendGrid, Twilio, WhatsApp API)
- [ ] Buat endpoint backend untuk trigger notifikasi
- [ ] Integrasi dengan jadwal ujian (trigger otomatis/manual)
- [ ] Buat template pesan notifikasi (email & WA)
- [ ] Logging dan monitoring pengiriman notifikasi
- [ ] Uji pengiriman notifikasi ke beberapa admin
- [ ] Dokumentasi setup dan troubleshooting notifikasi

---
