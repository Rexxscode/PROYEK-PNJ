<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
// Show lines around line numbers where tt- IDs should be
// The TT questions should be around lines 1500-1600 based on the 400 total
// Let me check specific areas
$lines = file("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
// Show lines 1500-1510
for ($i = 1500; $i < min(1510, count($lines)); $i++) {
    echo "$i: " . substr($lines[$i], 0, 100) . "\n";
}
?>