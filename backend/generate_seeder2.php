<?php
// Generator: Creates AssessmentQuestionSeeder from major-quiz.ts

$tsFile = 'C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts';
$content = file_get_contents($tsFile);

// Extract question objects
$pattern = '/\{[^}]*id:\s"[^"]+"[^}]*\}/';
preg_match_all($pattern, $content, $rawMatches, PREG_SET_ORDER);

$questions = [];
foreach ($rawMatches as $raw) {
    $text = $raw[0];
    $id = $q = $opts = $corr = $diff = $skl = '';
    
    if (preg_match('/id:\s"([^"]+)"/', $text, $m)) $id = $m[1];
    if (preg_match('/question:\s"([^"]+)"/', $text, $m)) $q = $m[1];
    if (preg_match('/options:\s"([^"]+)"/', $text, $m)) {
        $optStr = $m[1];
        preg_match_all('/"([^"]+)"/', $optStr, $optMatches);
        $opts = $optMatches[1];
    }
    if (preg_match('/correct:\s(\d+)/', $text, $m)) $corr = (int)$m[1];
    if (preg_match('/difficulty:\s"([^"]+)"/', $text, $m)) $diff = $m[1];
    if (preg_match('/skill:\s"([^"]+)"/', $text, $m)) $skl = $m[1];
    
    if ($id && $q && count($opts) === 5 && $corr !== null && $diff && $skl) {
        $questions[] = [
            'id' => $id,
            'question' => $q,
            'options' => array_values($opts),
            'correct' => $corr,
            'difficulty' => $diff,
            'skill' => $skl
        ];
    }
}

$byMajor = [];
foreach ($questions as $q) {
    $prefix = substr($q['id'], 0, 4);
    if (!isset($byMajor[$prefix])) $byMajor[$prefix] = [];
    $byMajor[$prefix][] = $q;
}

// Build seeder content
$lines = [];
$lines[] = '<?php';
$lines[] = 'namespace Database\\Seeders;';
$lines[] = 'use App\\Models\\AssessmentQuestion;';
$lines[] = 'use App\\Models\\Major;';
$lines[] = 'use Illuminate\\Database\\Seeder;';
$lines[] = '';
$lines[] = 'class AssessmentQuestionSeeder extends Seeder';
$lines[] = '{';
$lines[] = '    public function run(): void';
$lines[] = '    {';
$lines[] = '        $majors = Major::all()->keyBy("short_code");';
$lines[] = '';

foreach ($byMajor as $prefix => $qs) {
    $shortCode = substr($prefix, 0, 3);
    foreach ($qs as $q) {
        $lines[] = '        // ' . $q['id'];
        $lines[] = '        AssessmentQuestion::updateOrCreate([';
        $lines[] = "            'id' => '" . $q['id'] . "',";
        $lines[] = "            'major_id' => Major::where('short_code', '" . $shortCode . "')->value('id'),";
        $lines[] = "            'question' => '" . addslashes($q['question']) . "',";
        $lines[] = '            ' . 'options => ' . json_encode(array_values($q['options'])) . ',';
        $lines[] = "            'correct' => " . $q['correct'] . ",";
        $lines[] = "            'difficulty' => '" . $q['difficulty'] . "',";
        $lines[] = "            'skill' => '" . $q['skill'] . "'";
        $lines[] = '        ];';
    }
}

$lines[] = '    }';
$lines[] = '}';

$output = implode("\n", $lines) . "\n";
$outputFile = 'C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php';
file_put_contents($outputFile, $output);

echo "Seeder written successfully.\n";
echo "Total questions: " . count($questions) . "\n";
echo "By major:\n";
foreach ($byMajor as $prefix => $qs) {
    echo "  " . substr($prefix, 0, 3) . ": " . count($qs) . "\n";
}