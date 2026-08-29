<?php
$content = file_get_contents('C:\laragon\www\PROYEK-PNJ\frontend\app\lib\major-quiz.ts');

// Use regex to find all QuizQuestion objects
// Pattern: id: "xxx", question: "...", options: [...], correct: n, difficulty: "xxx", skill: "xxx"
$pattern = '/"id": " (rpl|dkv|tkj|tt)-\d+ ", "question": " (.*?) ", "options": \[ (.*?) \], "correct": (\d+), "difficulty": " (basic|intermediate|advanced|expert) ", "skill": " ([^"]+)" }/sx';

 // Remove spaces in the regex for clarity - use actual pattern
$pattern = '/"id":"(rpl|dkv|tkj|tt)-\d+","question":"(.*?)","options":\[(.*?)\],"correct":(\d+),"difficulty":"(basic|intermediate|advanced|expert)","skill":"([^"]+)"/s';

$matches = [];
preg_match_all($pattern, $content, $matches, PREG_SET_ORDER);

echo "Total questions found: " . count($matches) . "\n\n";

$byMajor = ['RPL' => 0, 'DKV' => 0, 'TKJ' => 0, 'TT' => 0];
$seedLines = [];

foreach ($matches as $match) {
    $id = $match[1];
    $question = $match[2];
    $options = json_decode('[' . $match[3] . ']');
    $correct = $match[4];
    $difficulty = $match[5];
    $skill = $match[6];
    
    $prefix = substr($id, 0, 3);
    if (isset($byMajor[$prefix])) {
        $byMajor[$prefix]++;
    }
    
    // Generate seeder line
    $optionsJson = json_encode($options);
    $seedLines[] = "        AssessmentQuestion::updateOrCreate(
            ['id' => '$id'],
            ['major_id' => '$prefix', 'question' => json_encode('$question'), 'options' => $optionsJson, 'correct' => $correct, 'difficulty' => '$difficulty', 'skill' => '$skill'])
        ;";
}

echo "By major:\n";
foreach ($byMajor as $major => $count) {
    echo "  $major: $count\n";
}

echo "\nFirst 5 seeder lines:\n";
foreach (array_slice($seedLines, 0, 5) as $line) {
    echo "$line\n";
}