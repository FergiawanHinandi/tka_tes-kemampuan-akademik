# Troubleshooting Notifikasi Push (Email/WA)

Tanggal: 25 Februari 2026

## Gejala Umum dan Solusi

1. Tidak ada notifikasi terkirim
- Cek `settings` apakah channel aktif (`emailEnabled` / `whatsappEnabled`).
- Cek daftar recipient tidak kosong.
- Cek endpoint provider/env sesuai provider yang dipilih.

2. Status banyak `FAILED` di history
- Buka `GET /api/notifications/metrics` dan lihat `recentFailures`.
- Pastikan API key/token provider valid.
- Pastikan format nomor WA valid (`+62...` atau `08...`).

3. Trigger otomatis tidak jalan
- Pastikan ada data di tabel `exam_sessions`.
- Pastikan `startTime` sesi dan `reminderMinutesBefore` menghasilkan jendela trigger saat ini.
- Jalankan endpoint `dispatch-auto` dan lihat hasil `scanned/triggered/skippedDuplicate`.

4. Notifikasi otomatis terkirim dua kali
- Cek apakah ada proses paralel yang memanggil endpoint `dispatch-auto` bersamaan.
- Sistem sudah punya dedupe key per sesi, namun tetap disarankan 1 scheduler aktif.

## Hasil Uji

- Unit test notifikasi:
  - file: `apps/backend/api/src/modules/notifications/notifications.service.spec.ts`
  - hasil: lulus (manual multi-recipient + auto trigger dedupe)
- Type check frontend admin sekolah:
  - hasil: lulus

## Checklist Operasional

- Set provider Email dan WhatsApp di pengaturan sekolah.
- Simpan pengaturan.
- Lakukan `send` manual untuk verifikasi awal.
- Pantau `history` dan `metrics`.
- Aktifkan pemanggilan berkala `dispatch-auto` dari scheduler eksternal (mis. cron).

