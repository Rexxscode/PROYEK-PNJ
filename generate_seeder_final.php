<?php
// Complete seeder generator with proper major_id mapping
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");

// Pattern to find all question ID lines
$idPattern = '/id:\s*"(rpl|dkv|tkj|tt)-\d+"/';
preg_match_all($idPattern, $content, $idMatches);

$majorMap = ['rpl' => 'RPL', 'dkv' => 'DKV', 'tkj' => 'TKJ', 'tt' => 'TT'];

$questions = [];
$extracted = 0;
$ids = $idMatches[0];

foreach ($ids as $idLine) {
    // Extract the ID value
    preg_match('/"([^"]+)"$/', $idLine, $idVal);
    $currentId = $idVal[1];
    
    // Find the question block
    $pos = strpos($content, $idLine);
    if ($pos === false) continue;
    
    $nextIdPos = strpos($content, 'id: "', $pos + 1);
    $questionBlock = '';
    if ($nextIdPos !== false) {
        $questionBlock = substr($content, $pos, $nextIdPos - $pos);
    } else {
        $questionBlock = substr($content, $pos);
    }
    
    // Extract data
    $questionText = '';
    $options = [];
    $correct = 0;
    $difficulty = '';
    $skill = '';
    
    if (preg_match('/question:\s*"([^"]+)"/', $questionBlock, $qm)) {
        $questionText = addslashes($qm[1]);
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
    
    // Determine major from ID prefix
    $prefix = substr($currentId, 0, 3);
    $majorShort = $majorMap[$prefix] ?? 'RPL';
    
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

echo "Total extracted: $extracted\n";

// Generate seeder code
$seederCode = "<?php\n\n";
$seederCode .= "namespace Database\\Seeders;\n";
$seederCode .= "use App\\Models\\AssessmentQuestion;\n";
$seederCode .= "use Illuminate\\Database\\Seeders\\Seeder;\n\n";
$seederCode .= "class AssessmentQuestionSeeder extends Seeder\n";
$seederCode .= "{\n";
$seederCode .= "    public function run(): void\n";
$seederCode .= "    {\n";

foreach ($questions as $q) {
    $id = $q['id'];
    $major = $q['major'];
    $question = $q['question'];
    $correct = $q['correct'];
    $difficulty = $q['difficulty'];
    $skill = $q['skill'];
    $optionsJson = json_encode($q['options'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    
    $seederCode .= "        AssessmentQuestion::updateOrCreate(\n";
    $seiderCode .= "            ['id' => '$id'],\n";
    $seiderCode .= "            ['major_id' => '$major', 'question' => json_encode('$question'), 'options' => $optionsJson, 'correct' => $correct, 'difficulty' => '$difficulty', 'skill' => '$skill']\n";
    $seederCode .= "        ];\n";
}

$seederCode .= "    }\n";
$seederCode .= "}\n";

// Write to file
$focus = 1; // Set to 1 to write, 0 to just report
if ($focus == 1) {
    $targetFile = "C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php";
    file_put_contents($targetFile, $seederCode);
    echo "Seeder written to $targetFile\n";
}

// Verify distribution
$byMajor = ['RPL' => 0, 'DKV' => 0, 'TKJ' => 0, 'TT' => 0];
foreach ($questions as $q) {
    if (isset($byMajor[$q['major']])) $byMajor[$q['major']]++;
}
echo "Distribution: RPL=" . $byMajor["RPL"] . " DKV=" . $byMajor["DKV"] . " TKJ=" . $byMajor["TKJ"] . " TT=" . $byMajor["TT"] . "\n";
echo "Total: " . array_sum($byMajor) . "\n";