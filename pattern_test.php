<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
// Extract using the exact format: id: "rpl-01", etc.
// The format in the file is: id: "rpl-01",
// with possible leading whitespace
$pattern = '/id:\s*"(rpl|dkv|tkj|tt)-\d+"/';
$matches = [];
$count = preg_match_all($pattern, $content, $matches);
echo "Matches: $count\n";
// Show first 3
print_r(array_slice($matches[0], 0, 3));
?>