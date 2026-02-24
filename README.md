# TKA Tes Kemampuan Akademik Monorepo

Monorepo untuk sistem Tes Kemampuan Akademik (TKA), mencakup backend API, portal web, aplikasi desktop, paket bersama, dan dokumentasi arsitektur.

## Struktur Repository

```text
tka_tes-kemampuan-akademik/
|-- apps/
|   |-- api/                  # NestJS API (aktif)
|   |-- web-super-admin/      # Workspace portal web
|   |-- web-disdik/           # Workspace portal web
|   |-- web-fkkg/             # Workspace portal web
|   |-- web-admin-sekolah/    # Workspace portal web
|   |-- desktop-proktor/      # Workspace desktop app
|   `-- desktop-client/       # Workspace desktop app
|-- packages/
|   |-- shared-types/         # Shared TypeScript types
|   `-- ui-components/        # Shared UI components
|-- docs/                     # Dokumen terstruktur (lihat docs/README.md)
|-- scripts/                  # SQL/script utilitas
|-- supabase/                 # Migrasi database
|-- archive/                  # Arsip file lama/non-aktif
|-- docker-compose.yml
|-- turbo.json
`-- package.json
```

## Workspace yang Aktif

- `apps/api`: API backend utama (NestJS).
- `apps/web-*`: portal web dengan scaffold React + Vite + Tailwind.
- `apps/desktop-*`: aplikasi desktop dengan scaffold Electron.
- `packages/shared-types` dan `packages/ui-components`: paket bersama untuk reuse lintas workspace.

## Menjalankan Proyek

Prerequisite:
- Node.js `>=20`
- npm `>=10`

Install dependency:

```bash
npm install
```

Menjalankan semua workspace yang punya script `dev`:

```bash
npm run dev
```

Menjalankan API saja:

```bash
npm run dev:api
```

Menjalankan portal web saja:

```bash
npm run dev:web
```

Menjalankan aplikasi desktop saja:

```bash
npm run dev:desktop
```

## Script Penting

- `npm run build`: build seluruh workspace via Turbo.
- `npm run build:web`: build semua portal web.
- `npm run build:desktop`: build semua aplikasi desktop.
- `npm run test`: jalankan test seluruh workspace.
- `npm run lint`: lint seluruh workspace.
- `npm run check-types`: type check seluruh workspace.
- `npm run clean`: bersihkan output build dan `node_modules`.

## Dokumentasi

Dokumen sudah dikelompokkan berdasarkan kategori di folder `docs/`.
Lihat indeks: `docs/README.md`.

Panduan kontribusi:
- `CONTRIBUTING.md`
