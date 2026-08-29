<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
// Find lines with tt- and show the major_id context
$lines = file("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
foreach ($lines as $i => $line) {
    if (strpos($line, "tt-") !== false && strpos($line, "major_id") !== false) {
        echo "Line $i: " . substr($line, 0, 80) . "\n";
    }
}
?>