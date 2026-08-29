<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
// Count question IDs specifically: "id: "rpl-XX", etc.
// Using pattern that matches the exact format from the file
$rpl = preg_match_all("/\"id\".*?rpl-\d+\"/", $content, $matchesRPL);
$dkv = preg_match_all("/\"id\".*?dkv-\d+\"/", $content, $matchesDKV);
$tkj = preg_match_all("/\"id\".*?tkj-\d+\"/", $content, $matchesTKJ);
// For TT, use the transmisi section
$ttStart = strpos($content, "const transmisiQuiz");
$ttSection = $ttStart !== false ? substr($content, $ttStart) : "";
$tt = preg_match_all("/\"id\".*?tt-\d+\"/", $ttSection, $matchesTT);

echo "RPL: " . $matchesRPL[0] . "\n";
echo "DKV: " . $matchesDKV[0] . "\n";
echo "TKJ: " . $matchesTKJ[0] . "\n";
echo "TT: " . $matchesTT[0] . "\n";
echo "Total: " . ($matchesRPL[0] + $matchesDKV[0] + $matchesTKJ[0] + $matchesTT[0]) . "\n";