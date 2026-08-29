<?php
// Simple generator for AssessmentQuestionSeeder from major-quiz.ts
// Extracts questions and outputs them in seeder format

$file = file_get_contents('C:\laragon\www\PROYEK-PNJ\frontend\app\lib\major-quiz.ts');

// Find all question objects - pattern: { id: "..." question: "..." options: [...] correct: N difficulty: "..." skill: "..." }
preg_match_all('/\{[\s\S]{0,800}\}/', $file, $matches, PREG_SET_ORDER);

$questions = [];
foreach ($matches as $m) {
    $text = $m[0];
    
    // Extract each field
    $id = null; $question = null; $options = []; $correct = null; $difficulty = null; $skill = null;
    
    if (preg_match('/id:\s"([^"]+)"/', $text, $m)) $id = $m[1];
    if (preg_match('/question:\s"([^"]+)"/', $text, $m)) $question = $m[1];
    if (preg_match('/options:\s"([^"]+)"/', $text, $m)) {
        $optStr = $m[1];
        preg_match_all('/"([^"]+)"/', $optStr, $optMatches);
        $options = $optMatches[1];
    }
    if (preg_match('/correct:\s(\d+)/', $text, $m)) $correct = (int)$m[1];
    if (preg_match('/difficulty:\s"([^"]+)"/', $text, $m)) $difficulty = $m[1];
    if (preg_match('/skill:\s"([^"]+)"/', $text, $m)) $skill = $m[1];
    
    // Validate: must have essential fields, exactly 5 options
    if ($id && $question && count($options) === 5 && $correct !== null && $difficulty && $skill) {
        $questions[] = [
            'id' => $id,
            'question' => $question,
            'options' => $options,
            'correct' => $correct,
            'difficulty' => $difficulty,
            'skill' => $skill
        ];
    }
}

// Determine major_id based on question id prefix
function getMajorId($id) {
    $prefix = substr($id, 0, 4);
    return $prefix; // rpl-, dkv-, tkj-, tt-
}

// Group questions by major
$byMajor = [];
foreach ($questions as $q) {
    $major = getMajorId($q['id']);
    $byMajor[$major][] = $q;
}

echo "Total questions extracted: " . count($questions) . "\n";
foreach ($byMajor as $major => $qs) {
    echo "{$major}: " . count($qs) . " questions\n";
}

// Generate seeder content
$seeder = "<?php\n";
$seeder .= "namespace Database\\Seeders;\n";
$seeder .= "use App\\Models\\AssessmentQuestion;\n";
$seeder .= "use App\\Models\\Major;\n";
$seeder .= "use Illuminate\\Database\\Seeder;\n";
$seeder .= "\n";
$seeder .= "class AssessmentQuestionSeeder extends Seeder\n";
$seeder .= "{\n";
$seeder .= "    public function run(): void\n";
$seeder .= "    {\n";
$seeder .= "        // Get all majors\n";
$seeder .= "        $majors = Major::all()->keyBy('short_code');\n";
$seeder .= "\n";

// Generate updateOrCreate for each question
foreach ($byMajor as $majorCode => $qs) {
    foreach ($qs as $q) {
        $seeder .= "        // " . $q['id'] . "\n";
        $seeder .= "        AssessmentQuestion::updateOrCreate([\n";
        $seeder .= "            'id' => '" . $q['id'] . "',\n";
        $seeder .= "            'major_id' => Major::where('short_code', '" . $majorCode . "')->value('id'),\n";
        $seeder .= "            'question' => '" . addslashes($q['question']) . "',\n";
        
        // Options as JSON array
        $optJson = json_encode(array_values($q['options']));
        $seeder .= "            'options' => " . $optJson . ",\n";
        
        $seeder .= "            'correct' => " . $q['correct'] . ",\n";
        $seeder .= "            'difficulty' => '" . $q['difficulty'] . "',\n";
        $seeder .= "            'skill' => '" . $q['skill'] . "'\n";
        $seeder .= "        ];\n";
    }
}

$seeder .= "    }\n";
$seeder .= "}\n";

// Write to file
file_put_contents('C:\laragon\www\PROYEK-PNJ\backend\database\\seeders\\AssessmentQuestionSeeder.php', $seeder);

echo "Seeder written successfully.\n";
echo "Expected DB counts after seed:\n";
foreach ($byMajor as $major => $qs) {
    echo "  {$major}: " . count($qs) . "\n";
}