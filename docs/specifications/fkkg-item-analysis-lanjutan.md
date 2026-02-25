# Spesifikasi Halaman Analisis Butir Soal Lanjutan (Portal FKKG)

Tanggal: 25 Februari 2026

## Tujuan

Halaman `Analisis Butir` di portal FKKG dipakai untuk:
- mengevaluasi kualitas butir soal secara statistik,
- mengidentifikasi butir tidak valid untuk direvisi,
- mengekspor hasil analisis ke CSV/Excel.

## Sumber Data

- `student_scores` (hasil ujian siswa yang sudah ada).
- `questions` (bank soal).

Catatan integrasi:
- Jika data respons per butir tersedia di `details.perQuestion` / `details.questionScores` / `details.answers`, sistem menggunakan data tersebut langsung.
- Jika tidak tersedia, sistem melakukan estimasi respons per butir berbasis ringkasan kategori di `student_scores.details`.

## Metrik yang Ditampilkan

- `P (Difficulty Index)`: proporsi keterjawaban benar.
- `Discrimination Power`: selisih performa kelompok atas vs bawah.
- `Point-Biserial (rPb)`.
- `Pearson Correlation`.
- `Validity Score`: `Valid` / `Invalid`.
- `Validity Reason`: alasan kenapa valid / invalid.
- `Reliability Index (KR-20)`.

## Endpoint API

- `GET /api/results/analysis?category=&sessionId=`
  - Mengembalikan data analisis + metadata (jumlah peserta, jumlah butir, daftar sesi).
- `GET /api/results/analysis/export?format=csv|excel&category=&sessionId=`
  - Mengunduh hasil analisis dalam format CSV atau Excel.

## UI/UX Halaman

- Filter:
  - pencarian ID/isi soal,
  - kategori,
  - sesi ujian,
  - siklus validitas (`Semua`, `Valid`, `Invalid`).
- Chart:
  - scatter metrik (`Point-Biserial` / `Pearson`) vs daya pembeda,
  - opsi fokus `Semua` atau `Invalid` saja.
- Tabel detail:
  - highlight visual untuk butir invalid,
  - menampilkan rekomendasi revisi.
- Ekspor:
  - tombol `CSV` dan `Excel`.
  - fallback ekspor lokal jika endpoint export API gagal.
