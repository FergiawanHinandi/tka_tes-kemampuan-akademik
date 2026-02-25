# Audit Offline Mode Client Siswa

Tanggal audit: 25 Februari 2026
Lokasi kode: `apps/desktop/client-siswa/src`

## Ringkasan Audit

| Area | Status Sebelum | Tindakan |
|---|---|---|
| Cache soal lokal | Sudah ada (`Dexie.questionCache`) | Dipertahankan |
| Simpan jawaban lokal | Sudah ada (`Dexie.answers`) | Dipertahankan |
| Antrean sinkronisasi lokal | Sudah ada (`Dexie.syncQueue`) | Dipertahankan + dipolling otomatis |
| Sinkron otomatis saat koneksi kembali | Sudah ada pada event reconnect, belum ada polling retry berkala | Ditambah polling sinkron tiap 5 detik saat online |
| Persist state ujian | Sudah ada (`Dexie.examState`) untuk index soal dan `lastSyncAt` | Ditambah persist timer (`remainingTimeSeconds`, `timerSnapshotAt`) + fallback localStorage |
| Notifikasi visual offline | Belum ada banner khusus | Ditambah banner `Anda sedang offline` |
| Status sinkron eksplisit | Hanya teks umum | Ditambah badge `Belum sinkron` / `Sudah sinkron` / `Sinkronisasi` |

## File yang Diubah

- `apps/desktop/client-siswa/src/renderer.js`
- `apps/desktop/client-siswa/src/index.html`
- `apps/desktop/client-siswa/src/offline-mode.logic.js`
- `apps/desktop/client-siswa/src/offline-mode.logic.test.js`

## Catatan

- Fokus perubahan pada kestabilan mode offline saat jaringan putus, refresh aplikasi, dan reconnect.
- Data penting sekarang tersimpan di IndexedDB dan state ringkas disimpan juga sebagai fallback di localStorage.
