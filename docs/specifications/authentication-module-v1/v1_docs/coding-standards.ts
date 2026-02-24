// ============================================================
// CODING STANDARDS TKA PROJECT
// ============================================================

// ═══════════════════════════════════════════
// 1. NAMING CONVENTIONS
// ═══════════════════════════════════════════

// Files & Folders: kebab-case
// ✅ user-management.service.ts
// ✅ create-user.dto.ts
// ✅ question-banks/
// ❌ UserManagement.service.ts
// ❌ createUser.dto.ts

// Classes: PascalCase
// ✅ class UserManagementService {}
// ✅ class CreateUserDto {}

// Variables & Functions: camelCase
// ✅ const totalStudents = 100;
// ✅ function calculateExamResult() {}

// Constants: UPPER_SNAKE_CASE
// ✅ const MAX_LOGIN_ATTEMPTS = 5;
// ✅ const DEFAULT_PAGE_SIZE = 20;

// Enums: PascalCase (members juga PascalCase)
// ✅ enum UserRole { SuperAdmin, AdminDisdik }

// Database columns: snake_case (handled by Prisma @map)
// ✅ full_name, created_at, school_id

// API endpoints: kebab-case
// ✅ /api/v1/question-banks/:id/questions
// ❌ /api/v1/questionBanks/:id/questions

// ═══════════════════════════════════════════
// 2. FILE SIZE LIMITS
// ═══════════════════════════════════════════

// Controller: maks 200 baris
// → Jika lebih, pecah menjadi beberapa controller

// Service: maks 400 baris
// → Jika lebih, pecah menjadi sub-services

// Component (React): maks 300 baris
// → Jika lebih, pecah menjadi sub-components

// Function/Method: maks 50 baris
// → Jika lebih, pecah menjadi helper functions

// ═══════════════════════════════════════════
// 3. ERROR HANDLING STANDARD
// ═══════════════════════════════════════════

// Backend: SELALU gunakan custom exception classes
// ✅
class StudentNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Student with ID ${id} not found`);
  }
}

// ❌ JANGAN throw generic error
// throw new Error('not found');

// Frontend: SELALU handle 3 state
// ✅ Loading state
// ✅ Error state (dengan pesan yang user-friendly)
// ✅ Empty state (data kosong)
// ✅ Success state (data tersedia)

// ═══════════════════════════════════════════
// 4. COMMENT STANDARDS
// ═════════════════════════════════════��═════

// JANGAN comment "apa yang kode lakukan" (kode harus self-documenting)
// ❌ // Loop through students
// for (const student of students) { ... }

// COMMENT "mengapa" kode melakukan sesuatu
// ✅ // Skip students who already submitted to avoid duplicate scoring
// const activeStudents = students.filter(s => s.status !== 'SUBMITTED');

// SELALU dokumentasi public API methods
// ✅
/**
 * Calculate exam results for all students in a session.
 * Auto-grades multiple choice questions.
 * Essay questions are marked as pending for manual grading.
 *
 * @param sessionId - The exam session ID
 * @returns Array of calculated exam results
 * @throws SessionNotFoundException if session doesn't exist
 * @throws SessionNotCompletedException if session is still active
 */
async calculateSessionResults(sessionId: string): Promise<ExamResult[]> {
  // ...implementation
}

// ═══���═══════════════════════════════════════
// 5. IMPORT ORDER (auto-enforced by ESLint)
// ═══════════════════════════════════════════

// 1. Node.js built-in modules
import { readFileSync } from 'fs';
import { join } from 'path';

// 2. External packages
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/client';

// 3. Shared packages (@tka/*)
import { UserRole } from '@tka/shared-types';
import { hashPassword } from '@tka/shared-utils';

// 4. Internal modules (absolute path)
import { PrismaService } from '@/database/prisma.service';

// 5. Relative imports
import { CreateUserDto } from './dto/create-user.dto';