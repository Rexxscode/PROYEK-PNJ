<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
$lines = file("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
$counts = ["RPL"=>0, "DKV"=>0, "TKJ"=>0, "TT"=>0];
foreach ($lines as $line) {
    if (strpos($line, "major_id' => 'RPL'") !== false) $counts["RPL"]++;
    if (strpos($line, "major_id' => 'DKV'") !== false) $counts["DKV"]++;
    if (strpos($line, "major_id' => 'TKJ'") !== false) $counts["TKJ"]++;
    if (strpos($line, "major_id' => 'TT'") !== false) $counts["TT"]++;
}
echo "Distribution: RPL=" . $counts["RPL"] . " DKV=" . $counts["DKV"] . " TKJ=" . $counts["TKJ"] . " TT=" . $counts["TT"] . "\n";
echo "Total: " . array_sum($counts) . "\n";
?>