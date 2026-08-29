<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
$pattern = '/id:\s*"(rpl|dkv|tkj|tt)-\d+"/';
preg_match_all($pattern, $content, $idMatches);

// We also need to extract the full question data for each ID
// Let's extract question, options, correct, difficulty, skill for each ID
$questions = [];
$extracted = 0;

// For each ID, find the full question block in the file
$ids = $idMatches[0];
foreach ($ids as $idLine) {
    // Extract the ID value
    preg_match('/"([^"]+)"$/', $idLine, $idVal);
    $currentId = $idVal[1];
    
    // Now find the question block starting from this ID
    // Search forward in the file for the complete question
    $pos = strpos($content, $idLine);
    if ($pos === false) continue;
    
    // Find the end of this question (next question's id or end of file)
    $nextIdPos = strpos($content, 'id: "', $pos + 1);
    $questionBlock = '';
    if ($nextIdPos !== false) {
        $questionBlock = substr($content, $pos, $nextIdPos - $pos);
    } else {
        $questionBlock = substr($content, $pos);
    }
    
    // Extract question data from the block
    $questionText = '';
    $options = [];
    $correct = 0;
    $difficulty = '';
    $skill = '';
    
    // Extract question
    if (preg_match('/question:\s*"([^"]+)"/', $questionBlock, $qm)) {
        $questionText = $qm[1];
    }
    
    // Extract correct answer
    if (preg_match('/correct:\s*(\d+)/', $questionBlock, $cm)) {
        $correct = (int)$cm[1];
    }
    
    // Extract difficulty
    if (preg_match('/difficulty:\s*"(basic|intermediate|advanced|expert)"/', $questionBlock, $dm)) {
        $difficulty = $dm[1];
    }
    
    // Extract skill
    if (preg_match('/skill:\s*"([^"]+)"/', $questionBlock, $sm)) {
        $skill = $sm[1];
    }
    
    // Extract options - they're in an array [ "...", "...", "...", "..." ]
    if (preg_match('/options:\s*\[(.*?)\]/s', $questionBlock, $om)) {
        $optionsStr = $om[1];
        // Parse the options - they're quoted strings separated by commas
        preg_match_all('/"([^"]+)"/', $optionsStr, $opts);
        $options = $opts[1];
    }
    
    $questions[] = [
        'id' => $currentId,
        'question' => $questionText,
        'correct' => $correct,
        'difficulty' => $difficulty,
        'skill' => $skill,
        'options' => $options
    ];
    $extracted++;
    if ($extracted <= 3) {
        echo "ID: $currentId\n";
        echo "  Question: " . substr($questionText, 0, 50) . "...\n";
        echo "  Correct: $correct | Diff: $difficulty | Skill: $skill\n";
        echo "  Options: " . count($options) . "\n";
    }
}

echo "\nTotal extracted: $extracted\n";
// Group by major
$byMajor = ['RPL' => 0, 'DKV' => 0, 'TKJ' => 0, 'TT' => 0];
foreach ($questions as $q) {
    $p = substr($q['id'], 0, 3);
    if (isset($byMajor[$p])) $byMajor[$p]++;
}
echo "By major:\n";
foreach ($byMajor as $m => $c) echo "  $m: $c\n";
echo "Total: " . count($questions) . "\n";
?>