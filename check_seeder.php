<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
$lines = explode("\n", $content);
$count = 0;
foreach ($lines as $line) {
    if (strpos($line, "updateOrCreate") !== false) {
        $count++;
    }
}
echo "updateOrCreate calls: $count\n";
// Check first few
for ($i = 0; $i < min(5, count($lines)); $i++) {
    echo "$i: " . substr($lines[$i], 0, 80) . "\n";
}
// Check last few
echo "\nLast 5:\n";
$start = max(0, count($lines) - 5);
for ($i = $start; $i < count($lines); $i++) {
    echo "$i: " . substr($lines[$i], 0, 80) . "\n";
}
?>