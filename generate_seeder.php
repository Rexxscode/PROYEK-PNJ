<?php
$content = file_get_contents('C:\laragon\www\PROYEK-PNJ\frontend\app\lib\major-quiz.ts');

// Extract all QuizQuestion objects using a comprehensive regex
// The format is: id: "xxx", question: "...", options: [...], correct: n, difficulty: "xxx", skill: "xxx"
$pattern = '/"id":"(rpl|dkv|tkj|tt)-\d+","question":"(.*?)","options":\[(.*?)\],"correct":(\d+),"difficulty":"(basic|intermediate|advanced|expert)","skill":"([^"]+)"/s';

$matches = [];
preg_match_all($pattern, $content, $matches, PREG_SET_ORDER);

$byMajor = ['RPL' => 0, 'DKV' => 0, 'TKJ' => 0, 'TT' => 0];
$seedCode = "// Auto-generated AssessmentQuestionSeeder from major-quiz.ts`n`n";
$seedCode .= "use App\Models\\AssessmentQuestion;`n";
$seedCode .= "use Illuminate\\Database\\Seeders\\Seeder;`n`n";
$seedCode .= "class AssessmentQuestionSeeder extends Seeder `{n";
$seedCode .= "    public function run(): void{n";
    
foreach ($matches as $match) {
    $id = $match[1];
    $question = addcslashes($match[2], "\\'\"\n\r");
    $options = json_decode('[' . $match[3] . ']');
    $correct = $match[4];
    $difficulty = $match[5];
    $skill = $match[6];
    
    $prefix = substr($id, 0, 3);
    $byMajor[$prefix]++;
    
    $optionsJson = json_encode($options, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    
    $seedCode .= "        AssessmentQuestion::updateOrCreate(
            ['id' => '$id'],
            ['major_id' => '$prefix', 'question' => json_encode('$question'), 'options' => $optionsJson, 'correct' => $correct, 'difficulty' => '$difficulty', 'skill' => '$skill"])
        ;";
}

$seedCode .= "    }n";
$seedCode .= "}`n;

// Write the seeder file
file_put_contents('C:\laragon\www\PROYEK-PNJ\backend\database\seeders\AssessmentQuestionSeeder.php', $seedCode);

// Report results
echo "Questions extracted: " . count($matches) . "\n";
echo "By major:\n";
foreach ($byMajor as $major => $count) {
    echo "  $major: $count\n";
}
echo "Total: " . array_sum($byMajor) . "\n";
echo "Seeder written to: C:\laragon\www\PROYEK-PNJ\backend\database\seeders\AssessmentQuestionSeeder.php\n";
?>