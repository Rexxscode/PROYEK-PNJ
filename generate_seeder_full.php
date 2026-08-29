<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
$pattern = '/id:\s*"(rpl|dkv|tkj|tt)-\d+"/';
preg_match_all($pattern, $content, $idMatches);

// We also need to extract the full question data for each ID
$questions = [];
$extracted = 0;

// For each ID, find the full question block in the file
$ids = $idMatches[0];
foreach ($ids as $idLine) {
    // Extract the ID value
    preg_match('/"([^"]+)"$/', $idLine, $idVal);
    $currentId = $idVal[1];
    
    // Find the question block starting from this ID
    $pos = strpos($content, $idLine);
    if ($pos === false) continue;
    
    $nextIdPos = strpos($content, 'id: "', $pos + 1);
    $questionBlock = '';
    if ($nextIdPos !== false) {
        $questionBlock = substr($content, $pos, $nextIdPos - $pos);
    } else {
        $questionBlock = substr($content, $pos);
    }
    
    // Extract question data
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
        $optionsStr = $om[1];
        preg_match_all('/"([^"]+)"/', $optionsStr, $opts);
        $options = $opts[1];
    }
    
    $questions[] = [
        'id' => $currentId,
        'question' => addslashes($questionText),
        'correct' => $correct,
        'difficulty' => $difficulty,
        'skill' => $skill,
        'options' => $options
    ];
    $extracted++;
}

// Generate seeder code
$seederCode = "<?php\n\n";
$seederCode .= "namespace Database\\Seeders;\n";
$seederCode .= "use App\\Models\\AssessmentQuestion;\n";
$seederCode .= "use Illuminate\\Database\\Seeders\\Seeder;\n\n";
$seederCode .= "class AssessmentQuestionSeeder extends Seeder\n";
$seederCode .= "{\n";
$seederCode .= "    public function run(): void\n";
$seederCode .= "    {\n";

// Add all questions using updateOrCreate
foreach ($questions as $q) {
    $id = $q['id'];
    $major = substr($id, 0, 3);
    $question = $q['question'];
    $correct = $q['correct'];
    $difficulty = $q['difficulty'];
    $skill = $q['skill'];
    $optionsJson = json_encode($q['options'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    
    $seederCode .= "        AssessmentQuestion::updateOrCreate(\n";
    $seederCode .= "            ['id' => '$id'],\n";
    $seederCode .= "            ['major_id' => '$major', 'question' => json_encode('$question'), 'options' => $optionsJson, 'correct' => $correct, 'difficulty' => '$difficulty', 'skill' => '$skill']\n";
    $seederCode .= "        ];\n";
}

$seederCode .= "    }\n";
$seederCode .= "}\n";

// Write to the seeder file
$targetFile = "C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php";
file_put_contents($targetFile, $seederCode);

echo "Seeder written to: $targetFile\n";
echo "Total questions: " . count($questions) . "\n";

// Verify distribution
$byMajor = ['RPL' => 0, 'DKV' => 0, 'TKJ' => 0, 'TT' => 0];
foreach ($questions as $q) {
    $p = substr($q['id'], 0, 3);
    if (isset($byMajor[$p])) $byMajor[$p]++;
}
echo "Distribution:\n";
foreach ($byMajor as $m => $c) echo "  $m: $c\n";
echo "Total: " . array_sum($byMajor) . "\n";
?>