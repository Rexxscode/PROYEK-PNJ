SET FOREIGN_KEY_CHECKS=0;

-- Clear existing skills
TRUNCATE skills;

-- RPL Skills
INSERT INTO skills (id, name, category) VALUES
('html-css', 'HTML/CSS', 'hard'),
('javascript', 'JavaScript', 'hard'),
('typescript', 'TypeScript', 'hard'),
('react', 'React/Next.js', 'hard'),
('nodejs', 'Node.js', 'hard'),
('python', 'Python', 'hard'),
('sql', 'SQL/Database', 'hard'),
('git', 'Git', 'hard'),
('docker', 'Docker', 'hard'),
('rest-api', 'REST API', 'hard'),
('express', 'Express.js', 'hard'),
('figma', 'Figma', 'hard'),
('photoshop', 'Adobe Photoshop', 'hard'),
('illustrator', 'Adobe Illustrator', 'hard'),
('ui-ux', 'UI/UX Design', 'hard'),
('typo', 'Typography', 'hard'),
('color-th', 'Color Theory', 'hard'),
('brand-id', 'Brand Identity', 'hard'),
('motion-g', 'Motion Graphics', 'hard'),
('video-ed', 'Video Editing', 'hard');

-- TKJ Skills
INSERT INTO skills (id, name, category) VALUES
('net-basics', 'Networking Basics', 'hard'),
('cisco-ios', 'Cisco IOS', 'hard'),
('fiber-opt', 'Fiber Optics', 'hard'),
('mikrotik', 'MikroTik', 'hard'),
('wireless', 'Wireless Technology', 'hard'),
('tcp-ip', 'TCP/IP', 'hard'),
('net-security', 'Network Security', 'hard'),
('linux-admin', 'Linux Administration', 'hard'),
('win-server', 'Windows Server', 'hard'),
('active-dir', 'Active Directory', 'hard'),
('cybersec-ba', 'Cybersecurity Basics', 'hard'),
('virtua', 'Virtualization', 'hard'),
('shell-scr', 'Shell Scripting', 'hard'),
('hw-troubles', 'Hardware Troubleshooting', 'hard'),
('db-mgmt', 'Database Management', 'hard'),
('cloud-ba', 'Cloud Basics (AWS/Azure)', 'hard'),
('cisco-net', 'Cisco Networking', 'hard');

-- DKV Skills
INSERT INTO skills (id, name, category) VALUES
('ui-ux-dk', 'UI/UX Design', 'hard'),
('color-th-dkv', 'Color Theory', 'hard'),
('brand-id-dkv', 'Brand Identity', 'hard');

-- Soft Skills
INSERT INTO skills (id, name, category) VALUES
('communication', 'Komunikasi', 'soft'),
('problem-solv', 'Problem Solving', 'soft'),
('teamwork', 'Teamwork', 'soft'),
('time-mgmt', 'Time Management', 'soft'),
('adaptabilit', 'Adaptabilitas', 'soft'),
('kreativitas', 'Kreativitas', 'soft');

SET FOREIGN_KEY_CHECKS=1;