<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
$lines = explode("\n", $content);
$questions = [];
$current = [];
$inQ = false;

foreach ($lines as $line) {
    // Start of new question (line with { and id:)
    if (preg_match("/^\s*\{/", $line)) {
        // Check if this line also has id:
        if (preg_match("/id:\s*\"([^\"]+)\"/", $line, $m)) {
            $inQ = true;
            $current = [];
            $current['id'] = $m[1];
        } else {
            $inQ = true;
            $current = [];
        }
        continue;
    }
    
    if ($inQ) {
        // Extract question text - may be on same line as { or next line
        if (preg_match("/question:\s*\"(.+?)\"/", $line, $m)) {
            $current['question'] = $m[1];
        }
        // Extract correct
        if (preg_match("/correct:\s*(\d+)/", $line, $m)) {
            $current['correct'] = (int)$m[1];
        }
        // Extract difficulty
        if (preg_match("/difficulty:\s*\"([^\"]+)\"/", $line, $m)) {
            $current['difficulty'] = $m[1];
        }
        // Extract skill
        if (preg_match("/skill:\s*\"([^\"]+)\"/", $line, $m)) {
            $current['skill'] = $m[1];
        }
        // Extract/accumulate options
        if (preg_match("/\"([^\"]+)\"/", $line, $m)) {
            if (isset($current['opts'])) {
                $current['opts'][] = $m[1];
            } else {
                $current['opts'] = [$m[1]];
            }
        }
        
        // Check for end of question - line with } followed by comma or end
        if (preg_match("/^\s*\},?\s*$/", $line) || preg_match("/^\s*\},/", $line)) {
            // Make sure we have all required fields
            if (isset($current['id'], $current['question'], $current['correct'], $current['difficulty'], $current['skill'])) {
                $current['options'] = json_encode($current['opts']);
                $questions[] = $current;
            }
            $inQ = false;
            $current = [];
        }
    }
}

echo "Total: " . count($questions) . "\n";
$byMajor = ['RPL' => 0, 'DKV' => 0, 'TKJ' => 0, 'TT' => 0];
foreach ($questions as $q) {
    $p = substr($q['id'], 0, 3);
    if (isset($byMajor[$p])) $byMajor[$p]++;
}
foreach ($byMajor as $m => $c) echo "$m: $c\n";
echo "First: " . $questions[0]['id'] . " - " . substr($questions[0]['question'], 0, 40) . "\n";
echo "Sample opts: " . json_encode(array_slice($questions[0]['opts'] ?? [], 0, 3)) . "\n";
?>