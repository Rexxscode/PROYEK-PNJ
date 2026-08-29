<?php
$content = file_get_contents('C:\laragon\www\PROYEK-PNJ\frontend\app\lib\major-quiz.ts');
// Count tt- IDs
$count = 0;
if (preg_match_all('/"id"[:]?"(tt)-\d+"/', $content, $matches)) {
    $count = count($matches[0]);
}
echo "TT IDs found: $count\n";

// Also check the full structure
// Find where transmisiQuiz starts
$pos = strpos($content, 'const transmisiQuiz');
if ($pos !== false) {
    $after = substr($content, $pos);
    // Count tt- IDs in the transmisi section
    if (preg_match_all('/"id"[:]?"tt-\d+"/', $after, $matches)) {
        echo "TT IDs in transmisi section: " . count($matches[0]) . "\n";
    }
}
?>