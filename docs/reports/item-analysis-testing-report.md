# Laporan Uji Item Analysis Lanjutan

Tanggal uji: 25 Februari 2026

## Cakupan Uji

1. Rumus statistik:
- Pearson correlation
- Point-biserial correlation
- Difficulty index
- Discrimination power
- Validity evaluation
- KR-20 reliability

2. Integrasi backend:
- Analisis menggunakan data `student_scores` + `questions`.
- Fallback estimasi respons jika data per-butir tidak tersedia.
- Export hasil analisis dalam format CSV/Excel.

3. Integrasi frontend:
- Filter kategori/sesi/validitas/search.
- Visualisasi chart interaktif + highlight butir invalid.
- Export CSV/Excel dari UI.

## Hasil Uji Otomatis

File test:
- `apps/backend/api/src/modules/scoring/analysis-metrics.util.spec.ts`

Hasil:
- Semua test lulus.
- Dataset dummy dan dataset real-like tervalidasi untuk perhitungan metrik utama.

## Uji Manual yang Direkomendasikan QA

1. Buka portal FKKG halaman `Analisis Butir`.
2. Ganti filter sesi (`Semua` dan sesi tertentu), lalu pastikan data berubah.
3. Aktifkan filter validitas `Invalid`, pastikan tabel/chart menyorot butir invalid.
4. Ubah metrik chart dari `Point-Biserial` ke `Pearson`.
5. Klik export CSV dan Excel, pastikan file berhasil diunduh dan isi kolom sesuai tabel.
