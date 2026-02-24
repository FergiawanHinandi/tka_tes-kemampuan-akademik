// ============================================================
// SHARED TYPES - Dipakai oleh semua apps
// ============================================================

// User & Auth
export type UserRole = 'SUPER_ADMIN' | 'ADMIN_DISDIK' | 'ADMIN_FKKG' | 'ADMIN_SEKOLAH' | 'PROKTOR';
export type SchoolLevel = 'SD' | 'SMP' | 'SMA' | 'SMK';
export type QuestionType = 'PILIHAN_GANDA' | 'ESSAY' | 'ISIAN_SINGKAT' | 'BENAR_SALAH';
export type ExamStatus = 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
export type SessionStatus = 'WAITING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
export type StudentExamStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'FORCE_SUBMITTED' | 'DISCONNECTED' | 'TIMED_OUT';
export type Gender = 'LAKI_LAKI' | 'PEREMPUAN';
export type DifficultyLevel = 'MUDAH' | 'SEDANG' | 'SULIT';

// API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

// Entities
export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  cityId?: string;
  schoolId?: string;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export interface School {
  id: string;
  npsn: string;
  name: string;
  level: SchoolLevel;
  address: string;
  cityId: string;
  districtId: string;
  phone?: string;
  email?: string;
  principalName?: string;
  logo?: string;
  isActive: boolean;
}

export interface Student {
  id: string;
  nisn: string;
  nis?: string;
  fullName: string;
  gender: Gender;
  birthPlace?: string;
  birthDate?: string;
  className: string;
  classYear: number;
  schoolId: string;
  parentName?: string;
  parentPhone?: string;
  photo?: string;
  isActive: boolean;
}

export interface Question {
  id: string;
  questionBankId: string;
  orderNumber: number;
  type: QuestionType;
  content: string;
  contentImages: string[];
  contentAudio?: string;
  difficulty: DifficultyLevel;
  points: number;
  explanation?: string;
  options?: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  label: string;
  content: string;
  image?: string;
  isCorrect?: boolean; // Hanya dikirim ke FKKG, bukan ke siswa
  orderNumber: number;
}

// WebSocket Events
export interface WsStudentStatus {
  studentId: string;
  name: string;
  seatNumber?: number;
  status: StudentExamStatus;
  answered: number;
  total: number;
  isOnline: boolean;
  lastActivity?: string;
}

export interface WsExamAlert {
  studentId: string;
  type: 'FOCUS_LOST' | 'FULLSCREEN_EXIT' | 'SUSPICIOUS_PROCESS' | 'RECONNECTED';
  message: string;
  timestamp: string;
}

export interface WsSessionStatistics {
  online: number;
  offline: number;
  submitted: number;
  inProgress: number;
  notStarted: number;
  avgProgress: number;
}