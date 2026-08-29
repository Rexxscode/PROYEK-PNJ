<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
$idPattern = '/id:\s*"(rpl|dkv|tkj|tt)-\d+"/';
preg_match_all($idPattern, $content, $idMatches);

$majorMap = ['rpl' => 'RPL', 'dkv' => 'DKV', 'tkj' => 'TKJ', 'tt' => 'TT'];

$questions = [];
$extracted = 0;
$ids = $idMatches[0];

foreach ($ids as $idLine) {
    preg_match('/"([^"]+)"$/', $idLine, $idVal);
    $currentId = $idVal[1];
    $prefix = explode('-', $currentId)[0];
    $majorShort = $majorMap[$prefix] ?? 'RPL';
    
    $pos = strpos($content, $idLine);
    if ($pos === false) continue;
    
    $nextIdPos = strpos($content, 'id: "', $pos + 1);
    $questionBlock = '';
    if ($nextIdPos !== false) {
        $questionBlock = substr($content, $pos, $nextIdPos - $pos);
    } else {
        $questionBlock = substr($content, $pos);
    }
    
    $questionText = '';
    $options = [];
    $correct = 0;
    $difficulty = '';
    $skill = '';
    
    if (preg_match('/question:\s*"([^"]+)"/', $questionBlock, $qm)) {
        $questionText = $qm[1];
    }
    if (preg_match('/correct:\s*(\d+)/', $questionBlock, $cm)) {
        $correct = (int)$cm[1];
    }
    if (preg_match('/difficulty:\s*"(basic|intermediate|advanced|expert)"/', $questionBlock, $dm)) {
        $difficulty = $dm[1];
    }
    if (preg_match('/skill:\s*"([^"]+)"/', $questionBlock, $sm)) {
        $skill = $sm[1];
    }
    if (preg_match('/options:\s*\[(.*?)\]/s', $questionBlock, $om)) {
        preg_match_all('/"([^"]+)"/', $om[1], $opts);
        $options = $opts[1];
    }
    
    $questions[] = [
        'id' => $currentId,
        'question' => $questionText,
        'correct' => $correct,
        'difficulty' => $difficulty,
        'skill' => $skill,
        'major' => $majorShort,
        'options' => $options
    ];
    $extracted++;
}

// Use var_export for proper PHP string escaping
$seederCode = "<?php\n\n";
$seederCode .= "namespace Database\\Seeders;\n";
$seederCode .= "use App\\Models\\AssessmentQuestion;\n";
$seederCode .= "use Illuminate\\Database\\Seeder;\n\n";
$seederCode .= "class AssessmentQuestionSeeder extends Seeder\n";
$seederCode .= "{\n";
$seederCode .= "    public function run(): void\n";
$seederCode .= "    {\n";

foreach ($questions as $q) {
    $id = $q['id'];
    $major = $q['major'];
    // Use var_export for proper PHP string escaping (includes quotes)
    $question = var_export($q['question'], true);
    $correct = $q['correct'];
    $difficulty = var_export($q['difficulty'], true);
    $skill = var_export($q['skill'], true);
    $options = var_export($q['options'], true);
    
    $seederCode .= "        AssessmentQuestion::updateOrCreate(\n";
    $seederCode .= "            ['id' => " . var_export($q['id'], true) . "],\n";
    $seederCode .= "            ['major_id' => " . var_export($q['major'], true) . ", 'question' => $question, 'options' => $options, 'correct' => {$q['correct']}, 'difficulty' => $difficulty, 'skill' => $skill]\n";
    $seederCode .= "        );\n";
}

$seederCode .= "    }\n";
$seederCode .= "}\n";

$targetFile = "C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php";
file_put_contents($targetFile, $seederCode);
echo "Seeder written\n";

$byMajor = ['RPL' => 0, 'DKV' => 0, 'TKJ' => 0, 'TT' => 0];
foreach ($questions as $q) {
    if (isset($byMajor[$q['major']])) $byMajor[$q['major']]++;
}
echo "Distribution: RPL=" . $byMajor["RPL"] . " DKV=" . $byMajor["DKV"] . " TKJ=" . $byMajor["TKJ"] . " TT=" . $byMajor["TT"] . "\n";
echo "Total: " . array_sum($byMajor) . "\n";