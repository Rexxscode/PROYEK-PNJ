<?php
$file = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
// More specific pattern: match objects starting with id:
$pattern = "/\{[\s\S]{0,600}id:\s\"[^\"]+\"\}/";
preg_match_all($pattern, $file, $matches, PREG_SET_ORDER);
echo "Matches: " . count($matches) . "\n";
if (count($matches) > 0) {
    echo "First match preview: " . substr($matches[0][0], 0, 200) . "\n";
}