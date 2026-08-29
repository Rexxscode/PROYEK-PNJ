<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
$lines = explode("\n", $content);
$questions = [];
$i = 0;
$total = count($lines);

while ($i < $total) {
    $line = $lines[$i];
    
    // Look for "id: " pattern
    if (preg_match("/id:\s*\"([^\"]+)\"/", $line, $m)) {
        $id = $m[1];
        $question = '';
        $correct = 0;
        $difficulty = '';
        $skill = '';
        $options = [];
        
        // Move to next line for {
        $i++;
        if ($i < $total) {
            $next = $lines[$i];
            // Look for question on this line or next
            if (preg_match("/question:\s*\"(.+?)\"/", $next, $m2)) {
                $question = $m2[1];
            }
        }
        
        // Continue through the question properties
        // Keep reading lines until we find the closing }
        $foundEnd = false;
        while ($i < $total && !$foundEnd) {
            $l = $lines[$i];
            
            if (preg_match("/correct:\s*(\d+)/", $l, $m)) {
                $correct = (int)$m[1];
            }
            if (preg_match("/difficulty:\s*\"([^\"]+)\"/", $l, $m)) {
                $difficulty = $m[1];
            }
            if (preg_match("/skill:\s*\"([^\"]+)\"/", $l, $m)) {
                $skill = $m[1];
            }
            // Collect options
            if (preg_match("/\"([^\"]+)\"/", $l, $m)) {
                $options[] = $m[1];
            }
            
            // Check for end of question
            if (preg_match("/^\s*\},?\s*$/", $l) || preg_match("/^\s*\},/", $l)) {
                $foundEnd = true;
            }
        }
        
        $questions[] = [
            'id' => $id,
            'question' => $question,
            'correct' => $correct,
            'difficulty' => $difficulty,
            'skill' => $skill,
            'options' => json_encode($options)
        ];
    }
    
    $i++;
}

echo "Total: " . count($questions) . "\n";
$byMajor = ['RPL' => 0, 'DKV' => 0, 'TKJ' => 0, 'TT' => 0];
foreach ($questions as $q) {
    $p = substr($q['id'], 0, 3);
    if (isset($byMajor[$p])) $byMajor[$p]++;
}
foreach ($byMajor as $m => $c) echo "$m: $c\n";
echo "First: " . $questions[0]['id'] . " - " . substr($questions[0]['question'], 0, 40) . "\n";
echo "Opts: " . $questions[0]['options'] . "\n";