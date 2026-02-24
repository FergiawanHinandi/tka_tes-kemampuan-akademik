// ============================================================
// API VERSIONING STRATEGY
// ============================================================

// Format URL: /api/v{major}/{resource}
// Contoh:     /api/v1/users
//             /api/v2/users (jika ada breaking change)

// RULES:
// 1. Minor changes (tambah field baru) → TIDAK perlu versi baru
// 2. Breaking changes (hapus/rename field) → WAJIB versi baru
// 3. Versi lama tetap aktif minimal 6 bulan setelah versi baru
// 4. Kirim header "Sunset" jika versi akan deprecated

// Contoh deprecation header:
// HTTP/1.1 200 OK
// Sunset: Sat, 01 Jan 2027 00:00:00 GMT
// Deprecation: true
// Link: <https://api.tka-ujian.id/v2/users>; rel="successor-version"

// NestJS Implementation:
// Controller dengan versioning
import { Controller, Version } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Version('1')
  @Get()
  findAllV1() {
    // Versi lama
  }

  @Version('2')
  @Get()
  findAllV2() {
    // Versi baru dengan perubahan response
  }
}