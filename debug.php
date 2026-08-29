<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
$lines = explode("\n", $content);
// Check first few lines with id:
foreach ($lines as $i => $line) {
    if (strpos($line, 'id:') !== false) {
        echo "Line $i: " . substr($line, 0, 80) . "\n";
        if ($i > 5) break;
    }
}
?>