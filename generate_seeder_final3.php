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
    
    $questions[] = [
        'id' => $currentId,
        'question' => addslashes($questionText),
        'correct' => $correct,
        'difficulty' => $difficulty,
        'skill' => $skill,
        'major' => $majorShort,
        'options' => $options
    ];
    $extracted++;
}

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
    $question = $q['question'];
    $correct = $q['correct'];
    $difficulty = $q['difficulty'];
    $skill = $q['skill'];
    $optionsJson = json_encode($q['options'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    
    $seederCode .= "        AssessmentQuestion::updateOrCreate(\n";
    $seederCode .= "            ['id' => '$id'],\n";
    $seederCode .= "            ['major_id' => '$major', 'question' => '$question', 'options' => $optionsJson, 'correct' => $correct, 'difficulty' => '$difficulty', 'skill' => '$skill']\n";
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