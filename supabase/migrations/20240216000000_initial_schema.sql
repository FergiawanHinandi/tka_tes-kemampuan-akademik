-- =============================================
-- TKA SISTEM - SUPABASE MIGRATION
-- Initial Database Schema
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "btree_gin";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- =============================================
-- 1. USER MANAGEMENT & AUTHENTICATION
-- =============================================

-- Create roles table
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role_id UUID NOT NULL REFERENCES public.roles(id),
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

CREATE TABLE IF NOT EXISTS public.provinces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    province_id UUID NOT NULL REFERENCES public.provinces(id) ON DELETE CASCADE,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50), -- KABUPATEN/KOTA
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.districts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID NOT NULL REFERENCES public.cities(id) ON DELETE CASCADE,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 3. SCHOOL MANAGEMENT
-- =============================================

CREATE TABLE IF NOT EXISTS public.school_levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL, -- SD, SMP, SMA, SMK, MA
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    npsn VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    school_level_id UUID NOT NULL REFERENCES public.school_levels(id),
    province_id UUID NOT NULL REFERENCES public.provinces(id),
    city_id UUID NOT NULL REFERENCES public.cities(id),
    district_id UUID NOT NULL REFERENCES public.districts(id),
    address TEXT NOT NULL,
    postal_code VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(255),
    headmaster_name VARCHAR(255),
    disdik_user_id UUID REFERENCES public.users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 4. STUDENT MANAGEMENT
-- =============================================

CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nisn VARCHAR(20) UNIQUE NOT NULL,
    nis VARCHAR(20),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    school_id UUID NOT NULL REFERENCES public.schools(id),
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

CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    school_level_id UUID REFERENCES public.school_levels(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.question_banks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    subject_id UUID NOT NULL REFERENCES public.subjects(id),
    school_level_id UUID NOT NULL REFERENCES public.school_levels(id),
    created_by UUID NOT NULL REFERENCES public.users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 6. QUESTION MANAGEMENT
-- =============================================

CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_bank_id UUID NOT NULL REFERENCES public.question_banks(id),
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL, -- multiple_choice, true_false, essay, fill_in_blank
    difficulty_level VARCHAR(20) DEFAULT 'medium', -- easy, medium, hard
    score INTEGER DEFAULT 1,
    order_number INTEGER,
    image_url TEXT,
    audio_url TEXT,
    video_url TEXT,
    explanation TEXT, -- Penjelasan jawaban benar
    created_by UUID NOT NULL REFERENCES public.users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.question_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
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

CREATE TABLE IF NOT EXISTS public.exam_waves (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    registration_start_date DATE NOT NULL,
    registration_end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_by UUID NOT NULL REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    exam_wave_id UUID NOT NULL REFERENCES public.exam_waves(id),
    subject_id UUID NOT NULL REFERENCES public.subjects(id),
    school_level_id UUID NOT NULL REFERENCES public.school_levels(id),
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
    created_by UUID NOT NULL REFERENCES public.users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.exam_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID NOT NULL REFERENCES public.exams(id),
    session_name VARCHAR(255) NOT NULL,
    start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    max_students INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, active, completed, cancelled
    created_by UUID NOT NULL REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.exam_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_session_id UUID NOT NULL REFERENCES public.exam_sessions(id),
    room_name VARCHAR(255) NOT NULL,
    room_code VARCHAR(50) UNIQUE NOT NULL,
    max_capacity INTEGER NOT NULL,
    proctor_id UUID REFERENCES public.users(id), -- User yang menjadi proktor
    room_location TEXT,
    computer_count INTEGER,
    status VARCHAR(50) DEFAULT 'available', -- available, occupied, maintenance
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 8. EXAM EXECUTION
-- =============================================

CREATE TABLE IF NOT EXISTS public.exam_room_students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_room_id UUID NOT NULL REFERENCES public.exam_rooms(id),
    student_id UUID NOT NULL REFERENCES public.students(id),
    seat_number VARCHAR(10),
    computer_number VARCHAR(20),
    status VARCHAR(50) DEFAULT 'registered', -- registered, present, absent, completed
    check_in_at TIMESTAMP WITH TIME ZONE,
    check_out_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(exam_room_id, student_id)
);

CREATE TABLE IF NOT EXISTS public.student_exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id),
    exam_id UUID NOT NULL REFERENCES public.exams(id),
    exam_room_id UUID REFERENCES public.exam_rooms(id),
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

CREATE TABLE IF NOT EXISTS public.student_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_exam_id UUID NOT NULL REFERENCES public.student_exams(id),
    question_id UUID NOT NULL REFERENCES public.questions(id),
    answer_text TEXT,
    answer_option_id UUID REFERENCES public.question_options(id),
    is_correct BOOLEAN,
    score INTEGER DEFAULT 0,
    answer_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    time_spent_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_exam_id, question_id)
);

CREATE TABLE IF NOT EXISTS public.exam_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_exam_id UUID NOT NULL REFERENCES public.student_exams(id),
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

CREATE TABLE IF NOT EXISTS public.proctor_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_room_id UUID NOT NULL REFERENCES public.exam_rooms(id),
    proctor_id UUID NOT NULL REFERENCES public.users(id),
    session_start TIMESTAMP WITH TIME ZONE NOT NULL,
    session_end TIMESTAMP WITH TIME ZONE,
    total_students_monitored INTEGER DEFAULT 0,
    violations_count INTEGER DEFAULT 0,
    session_notes TEXT,
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, active, completed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.exam_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_exam_id UUID REFERENCES public.student_exams(id),
    user_id UUID REFERENCES public.users(id),
    exam_id UUID REFERENCES public.exams(id),
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

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id),
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

CREATE TABLE IF NOT EXISTS public.app_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'string', -- string, number, boolean, json
    description TEXT,
    category VARCHAR(100), -- general, exam, security, notification
    is_public BOOLEAN DEFAULT false, -- Can be accessed by public API
    is_editable BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 11. AUDIT & COMPLIANCE
-- =============================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(255) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL, -- INSERT, UPDATE, DELETE
    old_values JSONB,
    new_values JSONB,
    changed_by UUID REFERENCES public.users(id),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- User indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role_id ON public.users(role_id);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);

-- School indexes
CREATE INDEX IF NOT EXISTS idx_schools_npsn ON public.schools(npsn);
CREATE INDEX IF NOT EXISTS idx_schools_disdik_user_id ON public.schools(disdik_user_id);
CREATE INDEX IF NOT EXISTS idx_schools_city_id ON public.schools(city_id);
CREATE INDEX IF NOT EXISTS idx_schools_school_level_id ON public.schools(school_level_id);

-- Student indexes
CREATE INDEX IF NOT EXISTS idx_students_nisn ON public.students(nisn);
CREATE INDEX IF NOT EXISTS idx_students_school_id ON public.students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_email ON public.students(email);

-- Exam indexes
CREATE INDEX IF NOT EXISTS idx_exams_exam_wave_id ON public.exams(exam_wave_id);
CREATE INDEX IF NOT EXISTS idx_exams_subject_id ON public.exams(subject_id);
CREATE INDEX IF NOT EXISTS idx_exams_school_level_id ON public.exams(school_level_id);
CREATE INDEX IF NOT EXISTS idx_exams_start_datetime ON public.exams(start_datetime);
CREATE INDEX IF NOT EXISTS idx_exams_status ON public.exams(status);

-- Question indexes
CREATE INDEX IF NOT EXISTS idx_questions_question_bank_id ON public.questions(question_bank_id);
CREATE INDEX IF NOT EXISTS idx_questions_question_type ON public.questions(question_type);

-- Student exam indexes
CREATE INDEX IF NOT EXISTS idx_student_exams_student_id ON public.student_exams(student_id);
CREATE INDEX IF NOT EXISTS idx_student_exams_exam_id ON public.student_exams(exam_id);
CREATE INDEX IF NOT EXISTS idx_student_exams_status ON public.student_exams(status);
CREATE INDEX IF NOT EXISTS idx_student_exams_start_time ON public.student_exams(start_time);

-- Exam logs indexes
CREATE INDEX IF NOT EXISTS idx_exam_logs_student_exam_id ON public.exam_logs(student_exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_logs_user_id ON public.exam_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_logs_exam_id ON public.exam_logs(exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_logs_log_type ON public.exam_logs(log_type);
CREATE INDEX IF NOT EXISTS idx_exam_logs_created_at ON public.exam_logs(created_at);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at);

-- Audit logs indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_name ON public.audit_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_record_id ON public.audit_logs(record_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_changed_by ON public.audit_logs(changed_by);
CREATE INDEX IF NOT EXISTS idx_audit_logs_changed_at ON public.audit_logs(changed_at);

-- =============================================
-- DEFAULT DATA INSERTION
-- =============================================

-- Insert default roles
INSERT INTO public.roles (name, description, permissions) VALUES
('super_admin', 'Super Administrator - Full access to all system features', '["*"]'),
('disdik', 'Dinas Pendidikan - Manage schools and exams in their region', '["read_schools", "manage_schools", "read_exams", "create_exams", "read_reports"]'),
('fkkg', 'Forum Kepala Sekolah - Monitor school performance and exams', '["read_schools", "read_exams", "read_reports", "read_analytics"]'),
('school_admin', 'School Administrator - Manage students and school exams', '["read_students", "manage_students", "read_exams", "manage_exam_participants", "read_reports"]'),
('proctor', 'Exam Proctor - Monitor exam sessions', '["read_exam_rooms", "monitor_exams", "manage_violations", "read_student_progress"]'),
('student', 'Student - Take exams and view results', '["read_exams", "take_exam", "read_own_results", "read_notifications"]')
ON CONFLICT (name) DO NOTHING;

-- Insert default school levels
INSERT INTO public.school_levels (code, name, description) VALUES
('SD', 'Sekolah Dasar', 'Sekolah Dasar 6 tahun'),
('SMP', 'Sekolah Menengah Pertama', 'Sekolah Menengah Pertama 3 tahun'),
('SMA', 'Sekolah Menengah Atas', 'Sekolah Menengah Atas 3 tahun'),
('SMK', 'Sekolah Menengah Kejuruan', 'Sekolah Menengah Kejuruan 3-4 tahun'),
('MA', 'Madrasah Aliyah', 'Madrasah Aliyah 3 tahun')
ON CONFLICT (code) DO NOTHING;

-- Insert default app settings
INSERT INTO public.app_settings (setting_key, setting_value, setting_type, description, category) VALUES
('exam_max_duration', '180', 'number', 'Maximum exam duration in minutes', 'exam'),
('exam_passing_percentage', '60', 'number', 'Minimum passing percentage for exams', 'exam'),
('max_login_attempts', '5', 'number', 'Maximum failed login attempts before lockout', 'security'),
('session_timeout', '30', 'number', 'Session timeout in minutes', 'security'),
('file_upload_max_size', '10485760', 'number', 'Maximum file upload size in bytes (10MB)', 'general'),
('enable_real_time_monitoring', 'true', 'boolean', 'Enable real-time exam monitoring', 'exam'),
('enable_exam_notifications', 'true', 'boolean', 'Enable exam notifications for users', 'notification'),
('auto_submit_timeout', 'true', 'boolean', 'Auto-submit exam when time runs out', 'exam')
ON CONFLICT (setting_key) DO NOTHING;

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on critical tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_exams ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view active users" ON public.users FOR SELECT USING (is_active = true);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Schools can be viewed by authenticated users" ON public.schools FOR SELECT USING (is_active = true);
CREATE POLICY "Disdik can manage their schools" ON public.schools FOR ALL USING (
    auth.jwt() ->> 'role' = 'disdik' AND disdik_user_id = auth.uid()
);

CREATE POLICY "Students can be viewed by school admin" ON public.students FOR SELECT USING (
    auth.jwt() ->> 'role' = 'school_admin' 
    AND school_id IN (
        SELECT id FROM public.schools WHERE disdik_user_id = auth.uid()
    )
);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON public.schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON public.exams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON public.questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- GRANT PERMISSIONS
-- =============================================

-- Grant permissions to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant specific permissions for different roles
GRANT SELECT ON public.users TO anon, authenticated;
GRANT SELECT ON public.schools TO anon, authenticated;
GRANT SELECT ON public.students TO anon, authenticated;
GRANT SELECT ON public.exams TO anon, authenticated;

-- Grant permissions for authenticated users to manage their data
GRANT UPDATE ON public.users TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.student_exams TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.student_answers TO authenticated;

-- =============================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================

COMMENT ON TABLE public.users IS 'Master table for all system users with role-based access';
COMMENT ON TABLE public.roles IS 'User roles and permissions for RBAC system';
COMMENT ON TABLE public.schools IS 'School master data with NPSN and regional information';
COMMENT ON TABLE public.students IS 'Student master data with NISN and school affiliation';
COMMENT ON TABLE public.exams IS 'Exam configuration and scheduling information';
COMMENT ON TABLE public.student_exams IS 'Student exam participation and progress tracking';
COMMENT ON TABLE public.exam_logs IS 'Comprehensive audit trail for exam activities';
COMMENT ON TABLE public.proctor_sessions IS 'Proctor monitoring sessions for exam supervision';