<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
// Very simple: just count lines with "id:" and "rpl-" etc.
$lines = explode("\n", $content);
$rplLines = 0; $dkvLines = 0; $tkjLines = 0; $ttLines = 0;
foreach ($lines as $line) {
    if (strpos($line, 'rpl-') !== false) $rplLines++;
    if (strpos($line, 'dkv-') !== false) $dkvLines++;
    if (strpos($line, 'tkj-') !== false) $tkjLines++;
    if (strpos($line, 'tt-') !== false && strpos($line, 'id:') !== false) $ttLines++;
}
echo "Lines with rpl-: $rplLines\n";
echo "Lines with dkv-: $dkvLines\n";
echo "Lines with tkj-: $tkjLines\n";
echo "Lines with tt- and id: $ttLines\n";
// Also count the transmisiQuiz section
$ttSection = "";
$start = strpos($content, "const transmisiQuiz");
if ($start !== false) {
    $ttSection = substr($content, $start);
    $ttSectionLines = explode("\n", $ttSection);
    $ttCount = 0;
    foreach ($ttSectionLines as $l) {
        if (strpos($l, "id:") !== false && strpos($l, "tt-") !== false) $ttCount++;
    }
    echo "TT in section: $ttCount\n";
}
echo "Total unique question IDs approach: " . ($rplLines + $dkvLines + $tkjLines + $ttLines) . "\n";