<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
$lines = explode("\n", $content);
$count = 0;
$majorCounts = ["RPL"=>0, "DKV"=>0, "TKJ"=>0, "TT"=>0];
foreach ($lines as $line) {
    if (strpos($line, "major_id") !== false && strpos($line, "'question'") !== false) {
        $count++;
        if (strpos($line, "major_id' => 'RPL'") !== false) $majorCounts["RPL"]++;
        if (strpos($line, "major_id' => 'DKV'") !== false) $majorCounts["DKV"]++;
        if (strpos($line, "major_id' => 'TKJ'") !== false) $majorCounts["TKJ"]++;
        if (strpos($line, "major_id' => 'TT'") !== false) $majorCounts["TT"]++;
    }
}
echo "updateOrCreate calls: $count\n";
echo "Distribution: RPL=" . $majorCounts["RPL"] . " DKV=" . $majorCounts["DKV"] . " TKJ=" . $majorCounts["TKJ"] . " TT=" . $majorCounts["TT"] . "\n";
?>