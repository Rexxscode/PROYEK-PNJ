<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
// Check for TT-related lines
$lines = file("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
$ttCount = 0;
foreach ($lines as $line) {
    if (strpos($line, "tt-") !== false) {
        $ttCount++;
        // Extract major_id from the line
        if (strpos($line, "major_id' => 'TT'") !== false) {
            echo "TT with correct major_id found: " . substr($line, 0, 60) . "\n";
        }
    }
}
echo "Lines with tt-: $ttCount\n";

// Check what major_id is used for tt- questions
$ttMajorCount = ["RPL"=>0, "DKV"=>0, "TKJ"=>0, "TT"=>0];
foreach ($lines as $line) {
    if (strpos($line, "tt-") !== false && strpos($line, "major_id") !== false) {
        if (strpos($line, "major_id' => 'TT'") !== false) $ttMajorCount["TT"]++;
        if (strpos($line, "major_id' => 'TKJ'") !== false) $ttMajorCount["TKJ"]++;
        if (strpos($line, "major_id' => 'RPL'") !== false) $ttMajorCount["RPL"]++;
        if (strpos($line, "major_id' => 'DKV'") !== false) $ttMajorCount["DKV"]++;
    }
}
echo "TT major distribution: RPL=" . $ttMajorCount["RPL"] . " DKV=" . $ttMajorCount["DKV"] . " TKJ=" . $ttMajorCount["TKJ"] . " TT=" . $ttMajorCount["TT"] . "\n";
?>