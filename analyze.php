<?php
$content = file_get_contents('C:\laragon\www\PROYEK-PNJ\frontend\app\lib\major-quiz.ts');
// Find the tt- section
$pos = strpos($content, 'const transmisiQuiz');
if ($pos !== false) {
    $tmSection = substr($content, $pos);
    // Print first 1000 chars of transmisi section
    echo "Transmisi section (first 2000 chars):\n";
    echo substr($tmSection, 0, 2000);
    echo "\n\n";
    
    // Count id: tt- patterns
    if (preg_match_all("/id: \"tt-\d+\"/", $tmSection, $matches)) {
        echo "\nTT IDs in section: " . count($matches[0]) . "\n";
        print_r(array_slice($matches[0], 0, 5));
    }
}
?>