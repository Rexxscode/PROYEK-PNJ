<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
// Count question IDs specifically
// Use preg_match_all which returns the count in [0] when using PREG_SET_ORDER, or just use the count
$rplCount = preg_match_all("/\"id\".*?rpl-\d+\"/", $content);
$dkvCount = preg_match_all("/\"id\".*?dkv-\d+\"/", $content);
$tkjCount = preg_match_all("/\"id\".*?tkj-\d+\"/", $content);
// For TT, use the transmisi section
$ttStart = strpos($content, "const transmisiQuiz");
$ttSection = $ttStart !== false ? substr($content, $ttStart) : "";
$ttCount = preg_match_all("/\"id\".*?tt-\d+\"/", $ttSection);

echo "RPL: $rplCount\n";
echo "DKV: $dkvCount\n";
echo "TKJ: $tkjCount\n";
echo "TT: $ttCount\n";
echo "Total: " . ($rplCount + $dkvCount + $tkjCount + $ttCount) . "\n";