SET FOREIGN_KEY_CHECKS=0;
TRUNCATE assessment_questions;

-- RPL questions (rpl-01 to rpl-05)
INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES
('RPL', 'Tag HTML apa yang digunakan untuk membuat paragraf teks?', '[\"<div>\", \"<p>\", \"<span>\", \"<text>\", \"<para>\"]', 1, 'basic', 'HTML/CSS');

INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES
('RPL', 'Apa kepanjangan dari CSS?', '[\"Cascading Style Sheets\", \"Creative Style System\", \"Colorful Style Syntax\", \"Computer Style Sheet\", \"Cascading Syntax Styling\"]', 0, 'basic', 'HTML/CSS');

INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES
('RPL', 'Apa fungsi utama CSS Flexbox?', '[\"Membuat animasi transisi\", \"Mengatur layout satu dimensi\", \"Membuat efek bayangan\", \"Mengelola style sheet\", \"Membuat grid dua dimensi\"]', 1, 'intermediate', 'HTML/CSS');

INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES
('RPL', 'Selector CSS untuk id header?', '[\".header\", \"#header\", \"header\", \"*header\", \"@header\"]', 1, 'intermediate', 'HTML/CSS');

INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES
('RPL', 'Perbedaan display block dan inline?', '[\"Block punya warna latar belakang\", \"Block menempati lebar penuh\", \"Block bisa transparan\", \"Block hanya teks\", \"Block vertikal, inline horizontal\"]', 1, 'intermediate', 'HTML/CSS');

-- DKV questions
INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES
('DKV', 'Dasar-dasar teori warna dan harmoni warna?', '[\"Ya, sepenuhnya\", \"Sedikit\", \"Tidak pernah\"]', 0, 'basic', 'Color Theory');

INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES
('DKV', 'Penggunaan tipografi yang efektif?', '[\"Ya, sepenuhnya\", \"Sedikit\", \"Tidak pernah\"]', 0, 'basic', 'Typography');

-- TKJ questions
INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES
('TKJ', 'Pengelolaan jaringan dasar dengan model OSI dan TCP/IP?', '[\"Ya, sepenuhnya\", \"Sedikit\", \"Tidak pernah\"]', 0, 'basic', 'Networking');

-- TT questions
INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES
('TT', 'Konsep dasar sinyal analog/digital dan modulasi?', '[\"Ya, sepenuhnya\", \"Sedikit\", \"Tidak pernah\"]', 0, 'basic', 'Radio Frequency');

SET FOREIGN_KEY_CHECKS=1;