// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  DISDIK = 'disdik',
  FKKG = 'fkkg',
  SCHOOL_ADMIN = 'school_admin',
  PROCTOR = 'proctor',
  STUDENT = 'student'
}

// School Types
export interface School {
  id: string;
  name: string;
  npsn: string;
  address: string;
  city: string;
  province: string;
  schoolType: SchoolType;
  disdikId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum SchoolType {
  SMA = 'sma',
  SMK = 'smk',
  MA = 'ma'
}

// Exam Types
export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  maxScore: number;
  passingScore: number;
  startTime: Date;
  endTime: Date;
  status: ExamStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ExamStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Question Types
export interface Question {
  id: string;
  examId: string;
  question: string;
  questionType: QuestionType;
  options?: QuestionOption[];
  correctAnswer: string | string[];
  score: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
  isCorrect?: boolean;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  ESSAY = 'essay',
  FILL_IN_BLANK = 'fill_in_blank'
}

// Student Exam Types
export interface StudentExam {
  id: string;
  studentId: string;
  examId: string;
  startTime?: Date;
  endTime?: Date;
  status: StudentExamStatus;
  score?: number;
  answers: StudentAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  score: number;
  answeredAt: Date;
}

export enum StudentExamStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  TIMEOUT = 'timeout',
  CANCELLED = 'cancelled'
}

// Proctor Types
export interface ProctorSession {
  id: string;
  examId: string;
  proctorId: string;
  schoolId: string;
  room: string;
  maxStudents: number;
  currentStudents: number;
  status: ProctorSessionStatus;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProctorSessionStatus {
  SCHEDULED = 'scheduled',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  schoolId?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalStudents: number;
  totalSchools: number;
  totalExams: number;
  activeExams: number;
  completedExams: number;
  averageScore: number;
}

export interface ExamResult {
  examId: string;
  studentId: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  completionTime: number; // in minutes
  grade: string;
  passed: boolean;
  certificateUrl?: string;
}

// WebSocket Types
export interface WebSocketMessage {
  type: string;
  payload: Record<string, unknown>;
  timestamp: Date;
  userId?: string;
}

export interface ExamProctorMessage extends WebSocketMessage {
  type: 'student_joined' | 'student_left' | 'exam_started' | 'exam_completed' | 'violation_detected';
  payload: {
    studentId: string;
    examId: string;
    proctorId: string;
    message: string;
    severity?: 'low' | 'medium' | 'high';
  };
}

// Real-time Types
export interface RealTimeExamData {
  examId: string;
  activeStudents: number;
  completedStudents: number;
  averageProgress: number;
  violations: number;
  status: ExamStatus;
}

export interface StudentProgress {
  studentId: string;
  examId: string;
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number;
  status: StudentExamStatus;
  lastActivity: Date;
}

// Error Codes
export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  EXAM_NOT_AVAILABLE = 'EXAM_NOT_AVAILABLE',
  EXAM_TIME_EXPIRED = 'EXAM_TIME_EXPIRED',
  STUDENT_ALREADY_STARTED = 'STUDENT_ALREADY_STARTED',
  INVALID_ANSWER = 'INVALID_ANSWER',
  PROCTOR_SESSION_FULL = 'PROCTOR_SESSION_FULL'
}
