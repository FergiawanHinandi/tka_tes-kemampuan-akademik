# Contributing Guide

Panduan ini menjaga struktur repository tetap rapi dan konsisten.

## 1. Prinsip Umum

- Gunakan Bahasa Indonesia atau Inggris teknis yang jelas dan konsisten dalam dokumen.
- Buat perubahan sekecil mungkin per commit/PR agar mudah direview.
- Jangan simpan aset sementara, file build, atau kredensial di repository.

## 2. Struktur Folder

- `apps/`: aplikasi runnable (API, web portal, desktop).
- `packages/`: shared library (types, UI components, utilitas bersama).
- `docs/`: dokumentasi produk dan teknis.
- `scripts/`: skrip SQL/otomasi non-runtime.
- `supabase/`: migration dan konfigurasi database.
- `archive/`: artefak lama/non-aktif.

Tambahkan file baru ke folder yang tepat. Hindari membuat folder baru di root tanpa alasan kuat.

## 3. Standar Penamaan

- Folder: `kebab-case`.
- File TypeScript: `kebab-case.ts` atau `kebab-case.tsx`.
- Interface/type: `PascalCase`.
- Variabel/fungsi: `camelCase`.
- Konstanta global: `UPPER_SNAKE_CASE`.

## 4. Aturan Per Workspace

- `apps/api`
  - Modul wajib mengikuti pola `dto/`, `types/`, `*.controller.ts`, `*.service.ts`, `*.module.ts`.
- `apps/web-*`
  - Simpan komponen reusable lokal di `src/components/`.
  - Simpan logic data fetching di `src/services/`.
- `apps/desktop-*`
  - `src/main.ts` untuk proses utama Electron.
  - Pisahkan preload/renderer ketika mulai implementasi fitur nyata.
- `packages/*`
  - Wajib punya `src/`, `tsconfig.json`, dan entry export yang jelas.

## 5. Kualitas Kode

Jalankan sebelum membuat PR:

```bash
npm run lint
npm run check-types
npm run test
```

Untuk scope lebih kecil gunakan workspace target, misalnya:

```bash
npm run lint -w apps/api
npm run check-types -w apps/web-disdik
```

## 6. Dokumentasi

- Update `README.md` jika struktur atau cara menjalankan berubah.
- Update `docs/README.md` saat menambah kategori dokumen.
- Simpan dokumen perencanaan di `docs/planning/`.
- Simpan spesifikasi teknis di `docs/specifications/`.

## 7. Commit dan PR

- Gunakan format commit yang ringkas dan deskriptif.
- Contoh:
  - `feat(api): add exam draft endpoint skeleton`
  - `refactor(docs): reorganize report folders`
  - `chore(web-disdik): scaffold base vite app`
- PR harus menyertakan:
  - tujuan perubahan,
  - ruang lingkup,
  - cara uji,
  - risiko/regresi potensial.
