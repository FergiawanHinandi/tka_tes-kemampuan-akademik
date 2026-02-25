# Setup Notifikasi Push Jadwal Ujian (Email/WA)

Tanggal: 25 Februari 2026

## Provider yang Didukung

- Email:
  - `SMTP` (mode integrasi via webhook/simulation untuk environment ini)
  - `SENDGRID`
  - `WEBHOOK`
- WhatsApp:
  - `TWILIO`
  - `WHATSAPP_CLOUD_API`
  - `WEBHOOK`

## Endpoint Backend

- `GET /api/notifications/school-admin/:schoolId/settings`
- `PUT /api/notifications/school-admin/:schoolId/settings`
- `POST /api/notifications/schedule-alert/send` (trigger manual)
- `POST /api/notifications/schedule-alert/dispatch-auto` (trigger otomatis berbasis jadwal `exam_sessions`)
- `GET /api/notifications/history`
- `GET /api/notifications/metrics`

## Variabel Environment

- Umum:
  - `NOTIFICATION_EMAIL_PROVIDER` (`SMTP` | `SENDGRID` | `WEBHOOK`)
  - `NOTIFICATION_WHATSAPP_PROVIDER` (`TWILIO` | `WHATSAPP_CLOUD_API` | `WEBHOOK`)
  - `NOTIFICATION_SENDER_NAME`
- Webhook:
  - `NOTIFICATION_EMAIL_WEBHOOK_URL`
  - `NOTIFICATION_WHATSAPP_WEBHOOK_URL`
  - `NOTIFICATION_WHATSAPP_TOKEN`
- SendGrid:
  - `NOTIFICATION_SENDGRID_API_KEY`
  - `NOTIFICATION_SENDGRID_FROM_EMAIL`
- Twilio:
  - `NOTIFICATION_TWILIO_ACCOUNT_SID`
  - `NOTIFICATION_TWILIO_AUTH_TOKEN`
  - `NOTIFICATION_TWILIO_WHATSAPP_FROM`
- WhatsApp Cloud API:
  - `NOTIFICATION_WHATSAPP_CLOUD_API_TOKEN`
  - `NOTIFICATION_WHATSAPP_CLOUD_PHONE_NUMBER_ID`

## Template Pesan

Sistem menghasilkan template otomatis untuk:
- Subject email
- Body email (text + html)
- Body WhatsApp

Isi template memuat:
- judul ujian,
- nama sesi,
- waktu,
- ruang,
- reminder menit,
- catatan.

## Trigger Otomatis

`dispatch-auto` membaca data `exam_sessions` lalu menghitung waktu reminder:

`reminderAt = session.startTime - reminderMinutesBefore`

Jika waktu sekarang berada pada jendela dispatch, notifikasi otomatis dikirim (`triggerType = AUTO`).
Sistem menyimpan dedupe key untuk mencegah pengiriman ganda pada sesi yang sama.

## Monitoring

Endpoint `metrics` menyediakan:
- total log,
- sukses/gagal,
- agregasi per channel,
- agregasi per provider,
- daftar kegagalan terbaru.

