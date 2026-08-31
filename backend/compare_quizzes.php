<?php
$files = [
    "C:\\laragon\\www\\PROYEK-PNJ\\frontend\\app\\lib\\major-quiz.ts",
    "C:\\laragon\\www\\PROYEK-PNJ\\frontend\\app\\lib\\materi-quiz-rpl.ts",
    "C:\\laragon\\www\\PROYEK-PNJ\\frontend\\app\\lib\\materi-quiz-dkv.ts",
    "C:\\laragon\\www\\PROYEK-PNJ\\frontend\\app\\lib\\materi-quiz-tkj.ts",
    "C:\\laragon\\www\\PROYEK-PNJ\\frontend\\app\\lib\\materi-quiz-tt.ts"
];

$allIds = [];

foreach ($files as $file) {
    $content = file_get_contents($file);
    preg_match_all("/\"id\": \"([^\"]+)\"/", $content, $matches);
    $ids = $matches[1];
    echo $file . ": " . count($ids) . " IDs\n";
    foreach ($ids as $id) {
        $allIds[$id] = true;
    }
    // Show first 5 IDs
    echo "  First 5: " . implode(", ", array_slice($ids, 0, 5)) . "\n";
}

echo "\nTotal unique IDs across all files: " . count($allIds) . "\n";

// Check overlap between major-quiz and materi quizzes
$majorQuizFile = $files[0];
$content = file_get_contents($majorQuizFile);
preg_match_all("/\"id\": \"([^\"]+)\"/", $content, $majorMatches);
$majorIds = $majorMatches[1];

foreach ($files as $i => $file) {
    if ($i === 0) continue; // Skip major-quiz.ts
    $content = file_get_contents($file);
    preg_match_all("/\"id\": \"([^\"]+)\"/", $content, $matches);
    $materiIds = $matches[1];
    
    $overlap = array_intersect($majorIds, $materiIds);
    echo "Overlap major-quiz vs " . basename($file) . ": " . count($overlap) . " IDs\n";
    
    // Show a few overlapping IDs
    if (count($overlap) > 0) {
        echo "  Overlapping IDs: " . implode(", ", array_slice($overlap, 0, min(5, count($overlap)))) . "\n";
    }
}
?>