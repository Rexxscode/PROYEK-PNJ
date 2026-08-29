<?php
// Script to extract questions from major-quiz.ts and generate AssessmentQuestionSeeder

$filePath = 'C:\laragon\www\PROYEK-PNJ\frontend\app\lib\major-quiz.ts';
$content = file_get_contents($filePath);

// Use regex to find each quiz array
$pattern = '/const (rplQuiz|dkvQuiz|tkjQuiz|transmisiQuiz): QuizQuestion = \[(.*?)\];/s';
preg_match_all($pattern, $content, $matches, PREG_SET_ORDER);

$allQuestions = [];
$majorMap = ['rplQuiz' => 'RPL', 'dkvQuiz' => 'DKV', 'tkjQuiz' => 'TKJ', 'transmisiQuiz' => 'TT'];

foreach ($matches as $match) {
    $quizName = $match[1];
    $questionsText = $match[2];
    $majorCode = $majorMap[$quizName];
    
    // Extract individual questions using regex
    // Pattern to find each question object
    $qPattern = '/\{[\s\S]{1,600}\}/';
    preg_match_all($qPattern, $questionsText, $questionMatches, PREG_SET_ORDER);
    
    foreach ($questionMatches as $qMatch) {
        $questionText = $qMatch[0];
        
        // Extract fields
        $id = '';
        $question = '';
        $options = [];
        $correct = 0;
        $difficulty = '';
        $skill = '';
        
        if (preg_match('/id:\s"([^"]+)"/', $questionText, $m)) $id = $m[1];
        if (preg_match('/question:\s"([^"]+)"/', $questionText, $m)) $question = $m[1];
        if (preg_match('/options:\s"([^"]+)"/', $questionText, $m)) {
            $optStr = $m[1];
            // Parse the options array
            if (preg_match_all('/"([^"]+)"/', $optStr, $optMatches)) {
                foreach ($optMatches[1] as $opt) $options[] = $opt;
            }
        }
        if (preg_match('/correct:\s(\d+)/', $questionText, $m)) $correct = (int)$m[1];
        if (preg_match('/difficulty:\s"([^"]+)"/', $questionText, $m)) $difficulty = $m[1];
        if (preg_match('/skill:\s"([^"]+)"/', $questionText, $m)) $skill = $m[1];
        
        // Only add if we have the essential fields
        if ($id && $question && count($options) >= 2) {
            $allQuestions[] = [
                'id' => $id,
                'question' => $question,
                'options' => $options,
                'correct' => $correct,
                'difficulty' => $difficulty,
                'skill' => $skill,
                'major_id' => $majorCode
            ];
        }
    }
}

// Now generate the seeder content
$seederContent = '<?php' . "\n";
$seederContent .= 'namespace Database\\Seeders;' . "\n";
$seederContent .= 'use App\\Models\\AssessmentQuestion;' . "\n";
$seederContent .= 'use App\\Models\\Major;' . "\n";
$seederContent .= 'use Illuminate\\Database\\Seeder;' . "\n";
$seederContent .= '' . "\n";
$seederContent .= 'class AssessmentQuestionSeeder extends Seeder' . "\n";
$seederContent .= '{' . "\n";
$seederContent .= '    public function run(): void' . "\n";
$seederContent .= '    {' . "\n";
$seederContent .= '        // Get all majors' . "\n";
$seederContent .= '        $majors = Major::all()->keyBy("short_code");' . "\n";
$seederContent .= '' . "\n";

// Write each question
foreach ($allQuestions as $q) {
    $major = 'Major::where("short_code", "'.$q['major_id'].'")->first(); // placeholder
    // We'll use a different approach - directly reference the major short_code in the query
    
    $seederContent .= "        // " . $q['id'] . " - " . substr($q['question'], 0, 50) . "...\n";
    
    // Build the options JSON
    $optionsJson = json_encode(array_slice($q['options'], 0, 5));
    
    $seederContent .= "        AssessmentQuestion::updateOrCreate([" . "\n";
    $seederContent .= "            'id' => '" . $q['id'] . "'," . "\n";
    $seederContent .= "            'major_id' => Major::where('short_code', '" . $q['major_id'] . "')->id," . "\n";
    $seederContent .= "            'question' => '" . addslashes($q['question']) . "'," . "\n";
    $seederContent .= "            'options' => " . $optionsJson . "," . "\n";
    $seederContent .= "            'correct' => " . $q['correct'] . "," . "\n";
    $seederContent .= "            'difficulty' => '" . $q['difficulty'] . "'," . "\n";
    $seederContent .= "            'skill' => '" . $q['skill'] . "'" . "\n";
    $seederContent .= "        ];" . "\n";
}

$seederContent .= '    }' . "\n";
$seederContent .= '}' . "\n";

$outputPath = 'C:\laragon\www\PROYEK-PNJ\backend\database\seeders\AssessmentQuestionSeeder.php';
file_put_contents($outputPath, $seederContent);

echo "Seeder generated with " . count($allQuestions) . " questions.\n";

// Verify counts per major
$majorCounts = [];
foreach ($allQuestions as $q) {
    $majorCounts[$q['major_id']] = ($majorCounts[$q['major_id']] ?? 0) + 1;
}

foreach ($majorCounts as $code => $count) {
    echo "{$code}: {$count} questions\n";
}