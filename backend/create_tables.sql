SET NAMES utf8mb4;
USE pnj;

CREATE TABLE users (
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    email_verified_at timestamp NULL DEFAULT NULL,
    password varchar(255) NOT NULL,
    remember_token varchar(100) NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE majors (
    short_code varchar(10) NOT NULL PRIMARY KEY,
    name varchar(50) NOT NULL,
    description text NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE students (
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id bigint unsigned NOT NULL,
    major_id varchar(10) NULL,
    grade enum('X','XI','XII','Alumni') NULL,
    avatar varchar(255) NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    UNIQUE KEY students_user_id_unique (user_id),
    KEY students_major_id_index (major_id),
    CONSTRAINT students_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT students_ibfk_2 FOREIGN KEY (major_id) REFERENCES majors (short_code) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE industries (
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id bigint unsigned NOT NULL,
    company varchar(100) NOT NULL,
    industry enum('Teknologi Informasi','Telekomunikasi','Design & Kreatif','Manufacturing','Financial Services','E-Commerce','Media & Entertainment','Konsultan') NOT NULL,
    location varchar(100) NULL,
    website varchar(255) NULL,
    founded char(4) NULL,
    employee_count enum('1-10','11-50','51-200','201-500','500+') NULL,
    status enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    UNIQUE KEY industries_user_id_unique (user_id),
    KEY industries_status_index (status),
    CONSTRAINT industries_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE skills (
    id varchar(20) NOT NULL PRIMARY KEY,
    name varchar(50) NOT NULL,
    category enum('hard','soft') NOT NULL,
    level tinyint(1) NOT NULL DEFAULT 1,
    description text NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    UNIQUE KEY skills_name_category_unique (name, category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE student_skills (
    student_id bigint unsigned NOT NULL,
    skill_id varchar(20) NOT NULL,
    level tinyint(1) NULL DEFAULT 1,
    achieved_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (student_id, skill_id),
    KEY student_skills_skill_id_index (skill_id),
    CONSTRAINT student_skills_ibfk_1 FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE,
    CONSTRAINT student_skills_ibfk_2 FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE assessment_questions (
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    major_id varchar(10) NOT NULL,
    question varchar(255) NOT NULL,
    options json NOT NULL,
    correct int NOT NULL,
    difficulty enum('basic','intermediate','advanced','expert') NOT NULL,
    skill varchar(50) NOT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    KEY assessment_questions_major_id_index (major_id),
    CONSTRAINT assessment_questions_ibfk_1 FOREIGN KEY (major_id) REFERENCES majors (short_code) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE assessment_results (
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id bigint unsigned NOT NULL,
    major_id varchar(10) NOT NULL,
    score int NOT NULL,
    level tinyint(1) NOT NULL DEFAULT 1,
    skill_scores json NULL,
    answered_at timestamp NULL DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    KEY assessment_results_student_id_index (student_id),
    KEY assessment_results_student_major_id_index (student_id, major_id),
    CONSTRAINT assessment_results_ibfk_1 FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE,
    CONSTRAINT assessment_results_ibfk_2 FOREIGN KEY (major_id) REFERENCES majors (short_code) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE materi (
    id varchar(20) NOT NULL PRIMARY KEY,
    major_id varchar(10) NOT NULL,
    title varchar(100) NOT NULL,
    description text NULL,
    skills json NULL,
    icon varchar(50) NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    KEY materi_major_id_index (major_id),
    CONSTRAINT materi_ibfk_1 FOREIGN KEY (major_id) REFERENCES majors (short_code) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE certificates (
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id bigint unsigned NOT NULL,
    major_id varchar(10) NOT NULL,
    materi_id varchar(20) NOT NULL,
    score int NOT NULL,
    total int NOT NULL DEFAULT 20,
    passed tinyint(1) NOT NULL DEFAULT 0,
    certificate_date date NULL,
    attempts tinyint(1) NOT NULL DEFAULT 1,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    UNIQUE KEY certificates_student_materi_unique (student_id, materi_id),
    KEY certificates_student_id_index (student_id),
    CONSTRAINT certificates_ibfk_1 FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE,
    CONSTRAINT certificates_ibfk_2 FOREIGN KEY (major_id) REFERENCES majors (short_code) ON DELETE SET NULL,
    CONSTRAINT certificates_ibfk_3 FOREIGN KEY (materi_id) REFERENCES materi (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE projects (
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id bigint unsigned NOT NULL,
    title varchar(100) NOT NULL,
    description text NULL,
    skills_json json NULL,
    project_url varchar(255) NULL,
    completed_at date NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    KEY projects_student_id_index (student_id),
    CONSTRAINT projects_ibfk_1 FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE jobs (
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    industry_id bigint unsigned NOT NULL,
    title varchar(100) NOT NULL,
    type enum('magang','fulltime','parttime','freelance') NOT NULL,
    location varchar(100) NULL,
    description text NULL,
    match_percentage smallint(3) NULL,
    posted_at timestamp NOT NULL,
    deadline date NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    KEY jobs_industry_id_index (industry_id),
    KEY jobs_type_index (type),
    CONSTRAINT jobs_ibfk_1 FOREIGN KEY (industry_id) REFERENCES industries (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE job_skills (
    job_id bigint unsigned NOT NULL,
    skill_id varchar(20) NOT NULL,
    required_level tinyint(1) NULL DEFAULT 1,
    PRIMARY KEY (job_id, skill_id),
    KEY job_skills_skill_id_index (skill_id),
    CONSTRAINT job_skills_ibfk_1 FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE,
    CONSTRAINT job_skills_ibfk_2 FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE roadmap_milestones (
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    major_id varchar(10) NOT NULL,
    title varchar(100) NOT NULL,
    description text NULL,
    level enum('fundamental','intermediate','advanced') NOT NULL,
    estimated_hours smallint(3) NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    KEY roadmap_milestones_major_id_index (major_id),
    CONSTRAINT roadmap_milestones_ibfk_1 FOREIGN KEY (major_id) REFERENCES majors (short_code) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE roadmap_resources (
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    milestone_id bigint unsigned NOT NULL,
    title varchar(100) NOT NULL,
    url varchar(255) NOT NULL,
    type enum('article','video','course','practice') NOT NULL,
    description text NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    KEY roadmap_resources_milestone_id_index (milestone_id),
    CONSTRAINT roadmap_resources_ibfk_1 FOREIGN KEY (milestone_id) REFERENCES roadmap_milestones (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE student_roadmap_progress (
    student_id bigint unsigned NOT NULL,
    milestone_id bigint unsigned NOT NULL,
    status enum('not_started','in_progress','completed') NOT NULL DEFAULT 'not_started',
    resources_viewed json NULL,
    completed_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (student_id, milestone_id),
    KEY student_roadmap_progress_student_id_index (student_id),
    CONSTRAINT student_roadmap_progress_ibfk_1 FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE,
    CONSTRAINT student_roadmap_progress_ibfk_2 FOREIGN KEY (milestone_id) REFERENCES roadmap_milestones (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE notifications (
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id bigint unsigned NOT NULL,
    role enum('student','admin','industry') NOT NULL,
    target_email varchar(191) NULL,
    title varchar(100) NOT NULL,
    message text NOT NULL,
    type enum('assessment_done','materi_passed','roadmap_update','system') NOT NULL,
    read tinyint(1) NOT NULL DEFAULT 0,
    read_at timestamp NULL DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    KEY notifications_user_id_read_index (user_id, read),
    CONSTRAINT notifications_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SELECT 'All tables created successfully!' AS status;
EOF