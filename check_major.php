<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
// Find lines with major_id
$lines = file("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
foreach ($lines as $i => $line) {
    if (strpos($line, "major_id") !== false) {
        echo "$i: " . substr($line, 0, 100) . "\n";
    }
}
?>