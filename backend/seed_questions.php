<?php
require 'vendor/autoload.php';

$pdo = new PDO('mysql:host=localhost;dbname=pnj;charset=utf8mb4', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$pdo->exec("SET FOREIGN_KEY_CHECKS=0");

// Clear existing
$pdo->exec("TRUNCATE assessment_questions");

// RPL questions (HTML/CSS, JavaScript, TypeScript, React, Node.js, Python, SQL/Database, Git, Docker, REST API, Express.js, Figma, Photoshop, Illustrator)
$rplQuestions = [
    // HTML/CSS (rpl-01 to rpl-10)
    ['id' => 'rpl-01', 'question' => 'Tag HTML apa yang digunakan untuk membuat paragraf teks?', 'options' => ['<div>', '<p>', '<span>', '<text>', '<para>'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'HTML/CSS', 'major_id' => 'RPL'],
    ['id' => 'rpl-02', 'question' => 'Apa kepanjangan dari CSS?', 'options' => ['Cascading Style Sheets', 'Creative Style System', 'Colorful Style Syntax', 'Computer Style Sheet', 'Cascading Syntax Styling'], 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'HTML/CSS', 'major_id' => 'RPL'],
    ['id' => 'rpl-03', 'question' => 'Apa fungsi utama CSS Flexbox?', 'options' => ['Membuat animasi transisi', 'Mengatur layout satu dimensi', 'Membuat efek bayangan', 'Mengelola style sheet', 'Membuat grid dua dimensi'], 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'HTML/CSS', 'major_id' => 'RPL'],
    ['id' => 'rpl-04', 'question' => 'Manakah yang merupakan selector CSS untuk mengambil elemen dengan id header?', 'options' => ['.header', '#header', 'header', '*header', '@header'], 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'HTML/CSS', 'major_id' => 'RPL'],
    ['id' => 'rpl-05', 'question' => 'Apa perbedaan utama antara display block dan inline?', 'options' => ['Block memiliki warna latar belakang, inline tidak', 'Block menempati lebar penuh, inline hanya selebar kontennya', 'Block bisa dibuat transparan, inline tidak', 'Block hanya bisa berisi teks, inline bisa berisi elemen lain', 'Block di-render secara vertical, inline di-render secara horizontal'], 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'HTML/CSS', 'major_id' => 'RPL'],
    ['id' => 'rpl-06', 'question' => 'Apa itu CSS specificity dan urutan prioritasnya dari yang tertinggi?', 'options' => ['Element > Class > ID > Inline', 'Inline > ID > Class > Element', 'ID > Inline > Class > Element', 'Class > ID > Element > Inline', 'Inline > Class > ID > Element'], 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'HTML/CSS', 'major_id' => 'RPL'],
    ['id' => 'rpl-07', 'question' => 'Apa tujuan penggunaan CSS custom properties (CSS variables) dengan awalan --?', 'options' => ['Membuat animasi lebih cepat', 'Menyimpan nilai yang dapat digunakan kembali di seluruh stylesheet', 'Untuk mengompresi ukuran file CSS', 'Untuk menambahkan komentar pada kode CSS', 'Untuk mengenkripsi properti CSS'], 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'HTML/CSS', 'major_id' => 'RPL'],
    ['id' => 'rpl-08', 'question' => 'Manakah properti CSS yang paling efisien untuk melakukan animasi transformasi tanpa memicu reflow?', 'options' => ['width dan height', 'top dan left', 'transform dan opacity', 'margin dan padding', 'font-size dan line-height'], 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'HTML/CSS', 'major_id' => 'RPL'],
    // JavaScript (rpl-11 to rpl-20)
    ['id' => 'rpl-11', 'question' => 'Apa perbedaan utama antara keyword let dan var?', 'options' => ['Let hanya bisa digunakan di dalam fungsi', 'Let memiliki block scope, var memiliki function scope', 'Let mendukung hoisting, var tidak', 'Var lebih cepat dari let saat eksekusi', 'Let hanya bisa menyimpan string, var bisa menyimpan tipe apapun'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'JavaScript', 'major_id' => 'RPL'],
    ['id' => 'rpl-12', 'question' => 'Bagaimana cara yang benar untuk mendeklarasikan sebuah array kosong?', 'options' => ['array();', 'var arr = [];', 'var arr = {};', 'var arr = null;', 'var arr = new Object();'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'JavaScript', 'major_id' => 'RPL'],
    // TypeScript (rpl-21 to rpl-30)
    ['id' => 'rpl-21', 'question' => 'Apa fungsi utama type annotation di TypeScript?', 'options' => ['Mengkompresi ukuran file JavaScript', 'Menentukan tipe data variabel, parameter, dan return value untuk deteksi error saat compile time', 'Menambahkan komentar otomatis pada kode', 'Mengubah semua variabel menjadi konstanta', 'Mengaktifkan mode debug pada kode'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'TypeScript', 'major_id' => 'RPL'],
    ['id' => 'rpl-22', 'question' => 'Bagaimana cara mendeklarasikan sebuah interface di TypeScript?', 'options' => ['type NamaInterface { properti: tipe }', 'interface NamaInterface { properti: tipe }', 'class NamaInterface { properti: tipe }', 'struct NamaInterface { properti: tipe }', 'enum NamaInterface { properti: tipe }'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'TypeScript', 'major_id' => 'RPL'],
    // React/Next.js (rpl-31 to rpl-40)
    ['id' => 'rpl-31', 'question' => 'Apa fungsi utama hook useState di React?', 'options' => ['Mengelola efek samping seperti fetching data', 'Mengelola dan memperbarui state lokal di functional component', 'Mengelola routing antar halaman', 'Mengelola context global aplikasi', 'Mengoptimasi performa rendering komponen'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'React/Next.js', 'major_id' => 'RPL'],
    ['id' => 'rpl-32', 'question' => 'Bagaimana cara mengimpor komponen React dari file lain?', 'options' => ['require("./Komponen")', 'import Kompanen from "./Komponen"', 'load Kompanen from "./Komponen"', 'include Kompanen from "./Komponen"', 'fetch Kompanen from "./Komponen"'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'React/Next.js', 'major_id' => 'RPL'],
    // Node.js (rpl-41 to rpl-50)
    ['id' => 'rpl-41', 'question' => 'Apa fungsi module.exports di Node.js?', 'options' => ['Menghapus modul dari cache', 'Mengekspor fungsi, objek, atau variabel agar bisa digunakan di file lain dengan require atau import', 'Mengimpor modul dari package eksternal', 'Mengompresi modul agar lebih ringan', 'Menjalankan modul secara otomatis saat server dimulai'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Node.js', 'major_id' => 'RPL'],
    ['id' => 'rpl-42', 'question' => 'Perintah apa yang digunakan untuk menginstall sebuah package dari npm?', 'options' => ['node install nama-package', 'npm install nama-package', 'npm start nama-package', 'node add nama-package', 'npm get nama-package'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Node.js', 'major_id' => 'RPL'],
    // Python (rpl-51 to rpl-60)
    ['id' => 'rpl-51', 'question' => 'Apa keyword yang digunakan untuk mendeklarasikan sebuah fungsi di Python?', 'options' => ['function', 'def', 'func', 'fun', 'define'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Python', 'major_id' => 'RPL'],
    // SQL/Database (rpl-61 to rpl-70)
    ['id' => 'rpl-61', 'question' => 'Apa fungsi utama perintah SELECT?', 'options' => ['Membuat tabel baru di database', 'Mengambil dan menampilkan data dari satu atau lebih tabel', 'Menghapus data dari tabel', 'Memodifikasi struktur tabel', 'Membuat user baru di database'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'SQL/Database', 'major_id' => 'RPL'],
    // Git (rpl-71 to rpl-80)
    ['id' => 'rpl-71', 'question' => 'Apa fungsi utama perintah git clone?', 'options' => ['Membuat branch baru dari branch yang sedang aktif', 'Membuat salinan lengkap dari repository remote ke komputer lokal', 'Menggabungkan dua branch menjadi satu', 'Menghapus repository dari remote', 'Melihat perbedaan antara dua commit'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Git', 'major_id' => 'RPL'],
    // Docker (rpl-81 to rpl-90)
    ['id' => 'rpl-81', 'question' => 'Apa fungsi utama Dockerfile?', 'options' => ['Mengelola jaringan antar container', 'Mendefinisikan instruksi dan konfigurasi untuk membangun sebuah Docker image secara otomatis', 'Menjalankan container di production', 'Mengelola volume data di container', 'Mengatur akses user ke Docker Hub'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Docker', 'major_id' => 'RPL'],
    // REST API (rpl-91 to rpl-100)
    ['id' => 'rpl-91', 'question' => 'Apa fungsi metode HTTP GET?', 'options' => ['Membuat data baru di server', 'Mengambil atau membaca data dari resource di server', 'Memperbarui data yang sudah ada di server', 'Menghapus data dari server', 'Mengganti seluruh data di server'], 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'REST API', 'major_id' => 'RPL'],
    // More RPL questions can be added here...
];

// Insert RPL questions
foreach ($rplQuestions as $q) {
    // Validate major_id
    if (!isset($q['major_id'])) {
        error_log("Missing major_id for question: " . $q['id']);
        continue;
    }
    $stmt = $pdo->prepare("INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES (?, ?, ?, ?, ?, ?)");
    $optionsJson = json_encode($q['options']);
    $stmt->execute([
        $q['major_id'],
        $q['question'],
        $optionsJson,
        $q['correct'],
        $q['difficulty'],
        $q['skill']
    ]);
}

// DKV questions
$dkvQuestions = [
    ['id' => 'dkv-01', 'question' => 'Dasar-dasar teori warna dan harmoni warna?', 'options' => ['Ya, sepenuhnya', 'Sedikit', 'Tidak pernah'], 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Color Theory', 'major_id' => 'DKV'],
    ['id' => 'dkv-02', 'question' => 'Penggunaan tipografi yang efektif?', 'options' => ['Ya, sepenuhnya', 'Sedikit', 'Tidak pernah'], 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Typography', 'major_id' => 'DKV'],
    ['id' => 'dkv-03', 'question' => 'Penerapan desain compositing?', 'options' => ['Ya, sepenuhnya', 'Sedikit', 'Tidak pernah'], 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Layout', 'major_id' => 'DKV'],
];

foreach ($dkvQuestions as $q) {
    $stmt = $pdo->prepare("INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES (?, ?, ?, ?, ?, ?)");
    $optionsJson = json_encode($q['options']);
    $stmt->execute([
        $q['major_id'],
        $q['question'],
        $optionsJson,
        $q['correct'],
        $q['difficulty'],
        $q['skill']
    ]);
}

// TKJ questions
$tkjQuestions = [
    ['id' => 'tkj-01', 'question' => 'Pengelolaan jaringan dasar dengan model OSI dan TCP/IP?', 'options' => ['Ya, sepenuhnya', 'Sedikit', 'Tidak pernah'], 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Networking', 'major_id' => 'TKJ'],
    ['id' => 'tkj-02', 'question' => 'Konfigurasi dasar Cisco router dan switch?', 'options' => ['Ya, sepenuhnya', 'Sedikit', 'Tidak pernah'], 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Cisco Networking', 'major_id' => 'TKJ'],
];

foreach ($tkjQuestions as $q) {
    $stmt = $pdo->prepare("INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES (?, ?, ?, ?, ?, ?)");
    $optionsJson = json_encode($q['options']);
    $stmt->execute([
        $q['major_id'],
        $q['question'],
        $optionsJson,
        $q['correct'],
        $q['difficulty'],
        $q['skill']
    ]);
}

// TT questions
$ttQuestions = [
    ['id' => 'tt-01', 'question' => 'Konsep dasar sinyal analog/digital dan modulasi?', 'options' => ['Ya, sepenuhnya', 'Sedikit', 'Tidak pernah'], 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Radio Frequency', 'major_id' => 'TT'],
    ['id' => 'tt-02', 'question' => 'Struktur kabel fiber optik dan jenisnya?', 'options' => ['Ya, sepenuhnya', 'Sedikit', 'Tidak pernah'], 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Fiber Optics', 'major_id' => 'TT'],
];

foreach ($ttQuestions as $q) {
    $stmt = $pdo->prepare("INSERT INTO assessment_questions (major_id, question, options, correct, difficulty, skill) VALUES (?, ?, ?, ?, ?, ?)");
    $optionsJson = json_encode($q['options']);
    $stmt->execute([
        $q['major_id'],
        $q['question'],
        $optionsJson,
        $q['correct'],
        $q['difficulty'],
        $q['skill']
    ]);
}

$pdo->exec("SET FOREIGN_KEY_CHECKS=1");

$stmt = $pdo->query("SELECT COUNT(*) as count FROM assessment_questions");
$row = $stmt->fetch();
echo "Total assessment_questions in DB: " . $row['count'] . "\n";
echo "Questions by major:\n";
$stmt2 = $pdo->query("SELECT major_id, COUNT(*) as cnt FROM assessment_questions GROUP BY major_id");
while ($row2 = $stmt2->fetch()) {
    echo "  " . $row2['major_id'] . ": " . $row2['cnt'] . "\n";
}