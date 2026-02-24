-- =============================================
-- TKA SISTEM - DATABASE SCHEMA
-- Sistem Tes Kemampuan Akademik
-- =============================================

-- Drop existing tables if they exist (for development)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS exam_logs CASCADE;
DROP TABLE IF EXISTS student_answers CASCADE;
DROP TABLE IF EXISTS exam_results CASCADE;
DROP TABLE IF EXISTS exam_room_students CASCADE;
DROP TABLE IF EXISTS proctor_sessions CASCADE;
DROP TABLE IF EXISTS exam_rooms CASCADE;
DROP TABLE IF EXISTS exam_waves CASCADE;
DROP TABLE IF EXISTS exam_sessions CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS question_banks CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS schools CASCADE;
DROP TABLE IF EXISTS school_levels CASCADE;
DROP TABLE IF EXISTS districts CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS provinces CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS app_settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- =============================================
-- 1. USER MANAGEMENT & AUTHENTICATION
-- =============================================

-- Roles table for RBAC
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users table (semua pengguna sistem)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role_id UUID NOT NULL REFERENCES roles(id),
    avatar_url TEXT,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 2. REGIONAL STRUCTURE
-- =============================================

CREATE TABLE provinces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    province_id UUID NOT NULL REFERENCES provinces(id) ON DELETE CASCADE,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50), -- KABUPATEN/KOTA
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE districts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 3. SCHOOL MANAGEMENT
-- =============================================

CREATE TABLE school_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL, -- SD, SMP, SMA, SMK, MA
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    npsn VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    school_level_id UUID NOT NULL REFERENCES school_levels(id),
    province_id UUID NOT NULL REFERENCES provinces(id),
    city_id UUID NOT NULL REFERENCES cities(id),
    district_id UUID NOT NULL REFERENCES districts(id),
    address TEXT NOT NULL,
    postal_code VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(255),
    headmaster_name VARCHAR(255),
    disdik_user_id UUID REFERENCES users(id), -- User Disdik yang bertanggung jawab
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 4. STUDENT MANAGEMENT
-- =============================================

CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nisn VARCHAR(20) UNIQUE NOT NULL,
    nis VARCHAR(20),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    school_id UUID NOT NULL REFERENCES schools(id),
    class VARCHAR(10), -- X, XI, XII
    major VARCHAR(100), -- Untuk SMK/SMA
    gender VARCHAR(10), -- L/P
    birth_place VARCHAR(100),
    birth_date DATE,
    address TEXT,
    photo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 5. ACADEMIC STRUCTURE
-- =============================================

CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    school_level_id UUID REFERENCES school_levels(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_banks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    subject_id UUID NOT NULL REFERENCES subjects(id),
    school_level_id UUID NOT NULL REFERENCES school_levels(id),
    created_by UUID NOT NULL REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 6. QUESTION MANAGEMENT
-- =============================================

CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_bank_id UUID NOT NULL REFERENCES question_banks(id),
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL, -- multiple_choice, true_false, essay, fill_in_blank
    difficulty_level VARCHAR(20) DEFAULT 'medium', -- easy, medium, hard
    score INTEGER DEFAULT 1,
    order_number INTEGER,
    image_url TEXT,
    audio_url TEXT,
    video_url TEXT,
    explanation TEXT, -- Penjelasan jawaban benar
    created_by UUID NOT NULL REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_label VARCHAR(10) NOT NULL, -- A, B, C, D, E
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT false,
    order_number INTEGER,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 7. EXAM MANAGEMENT
-- =============================================

CREATE TABLE exam_waves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    registration_start_date DATE NOT NULL,
    registration_end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    exam_wave_id UUID NOT NULL REFERENCES exam_waves(id),
    subject_id UUID NOT NULL REFERENCES subjects(id),
    school_level_id UUID NOT NULL REFERENCES school_levels(id),
    duration_minutes INTEGER NOT NULL, -- Durasi ujian dalam menit
    total_questions INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    passing_score INTEGER NOT NULL,
    start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    exam_type VARCHAR(50) NOT NULL, -- try_out, real_exam, practice
    randomize_questions BOOLEAN DEFAULT false,
    allow_review BOOLEAN DEFAULT true, -- Boleh review jawaban
    show_result_immediately BOOLEAN DEFAULT false,
    allow_calculator BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, active, completed, cancelled
    created_by UUID NOT NULL REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES exams(id),
    session_name VARCHAR(255) NOT NULL,
    start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    max_students INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, active, completed, cancelled
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_session_id UUID NOT NULL REFERENCES exam_sessions(id),
    room_name VARCHAR(255) NOT NULL,
    room_code VARCHAR(50) UNIQUE NOT NULL,
    max_capacity INTEGER NOT NULL,
    proctor_id UUID REFERENCES users(id), -- User yang menjadi proktor
    room_location TEXT,
    computer_count INTEGER,
    status VARCHAR(50) DEFAULT 'available', -- available, occupied, maintenance
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 8. EXAM EXECUTION
-- =============================================

CREATE TABLE exam_room_students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_room_id UUID NOT NULL REFERENCES exam_rooms(id),
    student_id UUID NOT NULL REFERENCES students(id),
    seat_number VARCHAR(10),
    computer_number VARCHAR(20),
    status VARCHAR(50) DEFAULT 'registered', -- registered, present, absent, completed
    check_in_at TIMESTAMP WITH TIME ZONE,
    check_out_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(exam_room_id, student_id)
);

CREATE TABLE student_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    exam_id UUID NOT NULL REFERENCES exams(id),
    exam_room_id UUID REFERENCES exam_rooms(id),
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    status VARCHAR(50) DEFAULT 'not_started', -- not_started, in_progress, completed, timeout, cancelled
    current_question_number INTEGER DEFAULT 0,
    total_answered INTEGER DEFAULT 0,
    total_correct INTEGER DEFAULT 0,
    score INTEGER,
    grade VARCHAR(10),
    passed BOOLEAN,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, exam_id)
);

CREATE TABLE student_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_exam_id UUID NOT NULL REFERENCES student_exams(id),
    question_id UUID NOT NULL REFERENCES questions(id),
    answer_text TEXT,
    answer_option_id UUID REFERENCES question_options(id),
    is_correct BOOLEAN,
    score INTEGER DEFAULT 0,
    answer_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    time_spent_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_exam_id, question_id)
);

CREATE TABLE exam_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_exam_id UUID NOT NULL REFERENCES student_exams(id),
    total_score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    grade VARCHAR(10),
    passed BOOLEAN NOT NULL,
    correct_answers INTEGER DEFAULT 0,
    wrong_answers INTEGER DEFAULT 0,
    unanswered_questions INTEGER DEFAULT 0,
    completion_percentage DECIMAL(5,2) DEFAULT 0,
    completion_time_minutes INTEGER,
    ranking INTEGER,
    percentile DECIMAL(5,2),
    certificate_url TEXT,
    result_details JSONB, -- Detail hasil per bagian/mata pelajaran
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 9. PROCTORING & MONITORING
-- =============================================

CREATE TABLE proctor_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_room_id UUID NOT NULL REFERENCES exam_rooms(id),
    proctor_id UUID NOT NULL REFERENCES users(id),
    session_start TIMESTAMP WITH TIME ZONE NOT NULL,
    session_end TIMESTAMP WITH TIME ZONE,
    total_students_monitored INTEGER DEFAULT 0,
    violations_count INTEGER DEFAULT 0,
    session_notes TEXT,
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, active, completed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_exam_id UUID REFERENCES student_exams(id),
    user_id UUID REFERENCES users(id),
    exam_id UUID REFERENCES exams(id),
    log_type VARCHAR(50) NOT NULL, -- login, logout, start_exam, answer_question, violation, etc
    log_message TEXT,
    log_data JSONB, -- Additional data in JSON format
    ip_address INET,
    user_agent TEXT,
    severity VARCHAR(20) DEFAULT 'info', -- info, warning, error, critical
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 10. SYSTEM MANAGEMENT
-- =============================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- info, warning, error, success, exam_alert
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    action_url TEXT,
    action_text VARCHAR(100),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE app_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'string', -- string, number, boolean, json
    description TEXT,
    category VARCHAR(100), -- general, exam, security, notification
    is_public BOOLEAN DEFAULT false, -- Can be accessed by public API
    is_editable BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 11. AUDIT & COMPLIANCE
-- =============================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(255) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL, -- INSERT, UPDATE, DELETE
    old_values JSONB,
    new_values JSONB,
    changed_by UUID REFERENCES users(id),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_is_active ON users(is_active);

-- School indexes
CREATE INDEX idx_schools_npsn ON schools(npsn);
CREATE INDEX idx_schools_disdik_user_id ON schools(disdik_user_id);
CREATE INDEX idx_schools_city_id ON schools(city_id);
CREATE INDEX idx_schools_school_level_id ON schools(school_level_id);

-- Student indexes
CREATE INDEX idx_students_nisn ON students(nisn);
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_students_email ON students(email);

-- Exam indexes
CREATE INDEX idx_exams_exam_wave_id ON exams(exam_wave_id);
CREATE INDEX idx_exams_subject_id ON exams(subject_id);
CREATE INDEX idx_exams_school_level_id ON exams(school_level_id);
CREATE INDEX idx_exams_start_datetime ON exams(start_datetime);
CREATE INDEX idx_exams_status ON exams(status);

-- Question indexes
CREATE INDEX idx_questions_question_bank_id ON questions(question_bank_id);
CREATE INDEX idx_questions_question_type ON questions(question_type);

-- Student exam indexes
CREATE INDEX idx_student_exams_student_id ON student_exams(student_id);
CREATE INDEX idx_student_exams_exam_id ON student_exams(exam_id);
CREATE INDEX idx_student_exams_status ON student_exams(status);
CREATE INDEX idx_student_exams_start_time ON student_exams(start_time);

-- Exam logs indexes
CREATE INDEX idx_exam_logs_student_exam_id ON exam_logs(student_exam_id);
CREATE INDEX idx_exam_logs_user_id ON exam_logs(user_id);
CREATE INDEX idx_exam_logs_exam_id ON exam_logs(exam_id);
CREATE INDEX idx_exam_logs_log_type ON exam_logs(log_type);
CREATE INDEX idx_exam_logs_created_at ON exam_logs(created_at);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- Audit logs indexes
CREATE INDEX idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_record_id ON audit_logs(record_id);
CREATE INDEX idx_audit_logs_changed_by ON audit_logs(changed_by);
CREATE INDEX idx_audit_logs_changed_at ON audit_logs(changed_at);

-- =============================================
-- DEFAULT DATA INSERTION
-- =============================================

-- Insert default roles
INSERT INTO roles (name, description, permissions) VALUES
('super_admin', 'Super Administrator - Full access to all system features', '["*"]'),
('disdik', 'Dinas Pendidikan - Manage schools and exams in their region', '["read_schools", "manage_schools", "read_exams", "create_exams", "read_reports"]'),
('fkkg', 'Forum Kepala Sekolah - Monitor school performance and exams', '["read_schools", "read_exams", "read_reports", "read_analytics"]'),
('school_admin', 'School Administrator - Manage students and school exams', '["read_students", "manage_students", "read_exams", "manage_exam_participants", "read_reports"]'),
('proctor', 'Exam Proctor - Monitor exam sessions', '["read_exam_rooms", "monitor_exams", "manage_violations", "read_student_progress"]'),
('student', 'Student - Take exams and view results', '["read_exams", "take_exam", "read_own_results", "read_notifications"]');

-- Insert default school levels
INSERT INTO school_levels (code, name, description) VALUES
('SD', 'Sekolah Dasar', 'Sekolah Dasar 6 tahun'),
('SMP', 'Sekolah Menengah Pertama', 'Sekolah Menengah Pertama 3 tahun'),
('SMA', 'Sekolah Menengah Atas', 'Sekolah Menengah Atas 3 tahun'),
('SMK', 'Sekolah Menengah Kejuruan', 'Sekolah Menengah Kejuruan 3-4 tahun'),
('MA', 'Madrasah Aliyah', 'Madrasah Aliyah 3 tahun');

-- Insert default app settings
INSERT INTO app_settings (setting_key, setting_value, setting_type, description, category) VALUES
('exam_max_duration', '180', 'number', 'Maximum exam duration in minutes', 'exam'),
('exam_passing_percentage', '60', 'number', 'Minimum passing percentage for exams', 'exam'),
('max_login_attempts', '5', 'number', 'Maximum failed login attempts before lockout', 'security'),
('session_timeout', '30', 'number', 'Session timeout in minutes', 'security'),
('file_upload_max_size', '10485760', 'number', 'Maximum file upload size in bytes (10MB)', 'general'),
('enable_real_time_monitoring', 'true', 'boolean', 'Enable real-time exam monitoring', 'exam'),
('enable_exam_notifications', 'true', 'boolean', 'Enable exam notifications for users', 'notification'),
('auto_submit_timeout', 'true', 'boolean', 'Auto-submit exam when time runs out', 'exam');

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on critical tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;

-- Example RLS policies (to be implemented based on business logic)
-- CREATE POLICY users_read_policy ON users FOR SELECT USING (true);
-- CREATE POLICY users_update_policy ON users FOR UPDATE USING (id = current_user_id());

-- =============================================
-- TRIGGERS FOR AUDIT LOGGING
-- =============================================

-- Function to create audit log
CREATE OR REPLACE FUNCTION create_audit_log() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, record_id, action, old_values, new_values, changed_by, ip_address, user_agent)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, to_jsonb(OLD), to_jsonb(NEW), current_setting('app.current_user_id', true)::UUID, current_setting('app.current_ip', true)::INET, current_setting('app.current_user_agent', true));
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, record_id, action, new_values, changed_by, ip_address, user_agent)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, to_jsonb(NEW), current_setting('app.current_user_id', true)::UUID, current_setting('app.current_ip', true)::INET, current_setting('app.current_user_agent', true));
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, record_id, action, old_values, changed_by, ip_address, user_agent)
        VALUES (TG_TABLE_NAME, OLD.id, TG_OP, to_jsonb(OLD), current_setting('app.current_user_id', true)::UUID, current_setting('app.current_ip', true)::INET, current_setting('app.current_user_agent', true));
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for audit logging (example for users table)
-- CREATE TRIGGER users_audit_trigger
-- AFTER INSERT OR UPDATE OR DELETE ON users
-- FOR EACH ROW EXECUTE FUNCTION create_audit_log();

-- =============================================
-- UPDATED_AT TRIGGERS
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON exams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();