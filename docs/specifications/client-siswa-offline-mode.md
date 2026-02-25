# Offline Mode Client Siswa

Dokumen ini menjelaskan cara kerja mode offline untuk QA dan user (siswa/proktor).

## Cara Kerja Singkat

1. Soal disimpan ke cache lokal (`IndexedDB: questionCache`).
2. Saat siswa menjawab, jawaban langsung disimpan lokal (`IndexedDB: answers`) dan dimasukkan ke antrean sinkron (`IndexedDB: syncQueue`).
3. Jika koneksi putus:
   - Banner offline tampil.
   - Jawaban tetap tersimpan lokal.
   - Badge status sinkron akan menunjukkan `Belum sinkron` bila ada antrean.
4. Saat koneksi kembali:
   - Sinkronisasi berjalan otomatis.
   - Antrean diproses ulang secara berkala (polling 5 detik) sampai habis.
   - Badge berubah menjadi `Sudah sinkron` jika antrean kosong.
5. State ujian (nomor soal aktif, info sinkron, dan timer) disimpan ke:
   - IndexedDB (`examState`)
   - localStorage (fallback state)

## Detail Data Lokal

- `questionCache`: daftar soal per sesi.
- `answers`: jawaban siswa per soal.
- `syncQueue`: antrean jawaban yang belum berhasil dikirim ke server.
- `examState`: state halaman + snapshot timer.
- `localStorage` fallback: backup state ujian agar tetap bisa dipulihkan.

## Skenario Uji QA

### 1) Putus koneksi saat ujian berjalan

1. Mulai ujian dan jawab beberapa soal.
2. Putuskan koneksi internet / matikan server socket.
3. Jawab kembali beberapa soal.
4. Verifikasi:
   - Banner offline muncul.
   - Status koneksi berubah ke mode offline.
   - Badge sinkron menunjukkan `Belum sinkron`.
   - Jawaban terakhir tetap terlihat saat pindah soal.

### 2) Refresh aplikasi saat offline

1. Dalam kondisi offline, lakukan refresh/reopen aplikasi.
2. Verifikasi:
   - Soal tetap tersedia dari cache lokal.
   - Jawaban yang sudah dipilih sebelumnya tetap muncul.
   - Timer tetap lanjut sesuai sisa waktu (bukan reset).

### 3) Reconnect setelah offline

1. Setelah ada antrean lokal, sambungkan koneksi kembali.
2. Tunggu proses sinkron otomatis.
3. Verifikasi:
   - Banner offline hilang.
   - Teks sinkron menampilkan progress/sinkron terakhir.
   - Antrean lokal berkurang hingga `0`.
   - Badge berubah ke `Sudah sinkron`.

## Panduan User Singkat

- Jika muncul banner offline, tetap lanjut mengerjakan soal.
- Pastikan aplikasi tetap terbuka saat jaringan kembali agar sinkron otomatis berjalan.
- Tombol `Sinkron` dapat dipakai untuk memaksa sinkronisasi manual.
