<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
// Count lines with tt-
$lines = file("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
$ttLines = 0;
foreach ($lines as $line) {
    if (strpos($line, "tt-") !== false) $ttLines++;
}
echo "Lines with tt-: $ttLines\n";

// Show a sample of lines around the TT section
// The TT questions should be near the end of the 400 questions
// Let me look at the last 50 lines
echo "\nLast 50 lines:\n";
$start = max(0, count($lines) - 50);
for ($i = $start; $i < count($lines); $i++) {
    if (strpos($lines[$i], "tt-") !== false || strpos($lines[$i], "major_id") !== false) {
        echo "$i: " . substr($lines[$i], 0, 80) . "\n";
    }
}
?>