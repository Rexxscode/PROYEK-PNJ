<?php
require 'vendor/autoload.php';

$skills = [
    // RPL Skills (from major-quiz.ts, mock-data.ts, career-match.ts)
    ['id' => 'html-css', 'name' => 'HTML/CSS', 'category' => 'hard'],
    ['id' => 'javascript', 'name' => 'JavaScript', 'category' => 'hard'],
    ['id' => 'typescript', 'name' => 'TypeScript', 'category' => 'hard'],
    ['id' => 'react', 'name' => 'React/Next.js', 'category' => 'hard'],
    ['id' => 'nodejs', 'name' => 'Node.js', 'category' => 'hard'],
    ['id' => 'python', 'name' => 'Python', 'category' => 'hard'],
    ['id' => 'sql', 'name' => 'SQL/Database', 'category' => 'hard'],
    ['id' => 'git', 'name' => 'Git', 'category' => 'hard'],
    ['id' => 'docker', 'name' => 'Docker', 'category' => 'hard'],
    ['id' => 'rest-api', 'name' => 'REST API', 'category' => 'hard'],
    ['id' => 'express', 'name' => 'Express.js', 'category' => 'hard'],
    ['id' => 'figma', 'name' => 'Figma', 'category' => 'hard'],
    ['id' => 'photoshop', 'name' => 'Adobe Photoshop', 'category' => 'hard'],
    ['id' => 'illustrator', 'name' => 'Adobe Illustrator', 'category' => 'hard'],
    ['id' => 'ui-ux', 'name' => 'UI/UX Design', 'category' => 'hard'],
    ['id' => 'typography', 'name' => 'Typography', 'category' => 'hard'],
    ['id' => 'color-theory', 'name' => 'Color Theory', 'category' => 'hard'],
    ['id' => 'brand-identity', 'name' => 'Brand Identity', 'category' => 'hard'],
    ['id' => 'motion-graphics', 'name' => 'Motion Graphics', 'category' => 'hard'],
    ['id' => 'video-editing', 'name' => 'Video Editing', 'category' => 'hard'],
    // TKJ Skills
    ['id' => 'net-basics', 'name' => 'Networking Basics', 'category' => 'hard'],
    ['id' => 'cisco-ios', 'name' => 'Cisco IOS', 'category' => 'hard'],
    ['id' => 'fiber-opt', 'name' => 'Fiber Optics', 'category' => 'hard'],
    ['id' => 'mikrotik', 'name' => 'MikroTik', 'category' => 'hard'],
    ['id' => 'wireless', 'name' => 'Wireless Technology', 'category' => 'hard'],
    ['id' => 'tcp-ip', 'name' => 'TCP/IP', 'category' => 'hard'],
    ['id' => 'net-security', 'name' => 'Network Security', 'category' => 'hard'],
    ['id' => 'linux-admin', 'name' => 'Linux Administration', 'category' => 'hard'],
    ['id' => 'win-server', 'name' => 'Windows Server', 'category' => 'hard'],
    ['id' => 'active-dir', 'name' => 'Active Directory', 'category' => 'hard'],
    ['id' => 'cybersec-ba', 'name' => 'Cybersecurity Basics', 'category' => 'hard'],
    ['id' => 'virtua', 'name' => 'Virtualization', 'category' => 'hard'],
    ['id' => 'shell-scr', 'name' => 'Shell Scripting', 'category' => 'hard'],
    ['id' => 'hw-troubles', 'name' => 'Hardware Troubleshooting', 'category' => 'hard'],
    ['id' => 'db-mgmt', 'name' => 'Database Management', 'category' => 'hard'],
    ['id' => 'cloud-ba', 'name' => 'Cloud Basics (AWS/Azure)', 'category' => 'hard'],
    ['id' => 'cisco-net', 'name' => 'Cisco Networking', 'category' => 'hard'],
    // DKV Skills (use different names to avoid UNIQUE constraint conflict)
    ['id' => 'ui-ux-dkv', 'name' => 'UI/UX Design DKV', 'category' => 'hard'],
    ['id' => 'color-th-dkv', 'name' => 'Color Theory DKV', 'category' => 'hard'],
    ['id' => 'brand-id-dkv', 'name' => 'Brand Identity DKV', 'category' => 'hard'],
    // Soft Skills
    ['id' => 'communication', 'name' => 'Komunikasi', 'category' => 'soft'],
    ['id' => 'problem-solving', 'name' => 'Problem Solving', 'category' => 'soft'],
    ['id' => 'teamwork', 'name' => 'Teamwork', 'category' => 'soft'],
    ['id' => 'time-management', 'name' => 'Time Management', 'category' => 'soft'],
    ['id' => 'adaptabilitas', 'name' => 'Adaptabilitas', 'category' => 'soft'],
    ['id' => 'kreativitas', 'name' => 'Kreativitas', 'category' => 'soft'],
];

$pdo = new PDO('mysql:host=localhost;dbname=pnj;charset=utf8mb4', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$pdo->exec("SET FOREIGN_KEY_CHECKS=0");
$pdo->exec("TRUNCATE skills");

foreach ($skills as $skill) {
    // Use INSERT IGNORE to handle potential duplicates gracefully
    $pdo->exec("INSERT IGNORE INTO skills (id, name, category) VALUES ('" . $skill['id'] . "', '" . $skill['name'] . "', '" . $skill['category'] . "')");
}

$pdo->exec("SET FOREIGN_KEY_CHECKS=1");

echo "Processed " . count($skills) . " skills.\n";

$stmt = $pdo->query("SELECT COUNT(*) as count FROM skills");
$row = $stmt->fetch();
echo "Total skills in DB: " . $row['count'] . "\n";