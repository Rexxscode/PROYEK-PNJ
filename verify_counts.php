<?php
// Step 1: Extract all questions from major-quiz.ts
// We know there are 400 questions: 100 per major (RPL, DKV, TKJ, TT)

// Since programmatic extraction from TypeScript has proven complex in this environment,
// I'll use a verified approach: read the file and use PHP's built-in DOM/JSON handling
// But first, let me verify the exact question counts one more time using a simple count

$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/frontend/app/lib/major-quiz.ts");
// Count each major's questions by their ID prefix patterns
$rplCount = preg_match_all("/rpl-/", $content, $m);
$dkvCount = preg_match_all("/dkv-/", $content, $m);
$tkjCount = preg_match_all("/tkj-/", $content, $m);
// For TT, they're in the transmisiQuiz section at the end
$ttSectionStart = strpos($content, "const transmisiQuiz");
$ttSection = $ttSectionStart !== false ? substr($content, $ttSectionStart) : "";
$ttCount = preg_match_all("/tt-/", $ttSection, $m);

echo "RPL: $rplCount, DKV: $dkvCount, TKJ: $tkjCount, TT: $ttCount\n";
echo "Total: " . ($rplCount + $dkvCount + $tkjCount + $ttCount) . "\n";
?>