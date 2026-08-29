<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
$lines = explode("\n", $content);
// Test regex on first few lines with id:
foreach ($lines as $i => $line) {
    if (strpos($line, 'id:') !== false && $i < 20) {
        $m1 = [];
        $r1 = preg_match("/id:\s*\"([^\"]+)\"/", $line, $m1);
        echo "Line $i: match=" . ($r1 ? "yes" : "no") . " id=" . ($r1 ? $m1[1] : "n/a") . " line=" . substr($line, 0, 60) . "\n";
    }
}
?>