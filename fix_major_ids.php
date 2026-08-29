<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
// The seeder has 400 AssessmentQuestion::updateOrCreate calls
// Each has 'major_id' => '' which needs to be fixed
// We know the ID format is rpl-XX, dkv-XX, tkj-XX, tt-XX
// and the major short codes are RPL, DKV, TKJ, TT

// Use a simpler approach: replace 'major_id' => '' with the correct value
// by looking at the ID in the same line or nearby

// Actually, let me just do a comprehensive fix by rewriting the key parts
// The seeder has: AssessmentQuestion::updateOrCreate(
//     ['id' => 'XXX', 
//      'major_id' => '',  // THIS NEEDS TO BE FIXED
//      'question' => json_encode('...'),
//      ...

// Let me just replace all occurrences of "major_id' => ''" with the proper mapping
// I'll do this by finding each updateOrCreate block and fixing the major_id

// Split by the updateOrCreate pattern
$blocks = preg_split("/AssessmentQuestion::updateOrCreate/", $content, -1, PREG_SPLIT_NO_EMPTY);

// Rebuild the seeder with correct major_ids
$newContent = "AssessmentQuestion::updateOrCreate";

foreach ($blocks as $i => $block) {
    if ($i === 0) {
        // First block might be the namespace or use statements
        $newContent .= $block;
        continue;
    }
    
    // Each block should have the pattern: ['id' => 'XXX'], ['major_id' => '', ...]
    // Extract the ID from the block
    if (preg_match("/'id' => '([^']+)'/", $block, $idMatch)) {
        $id = $idMatch[1];
        $prefix = substr($id, 0, 3);
        $majorMap = ['rpl' => 'RPL', 'dkv' => 'DKV', 'tkj' => 'TKJ', 'tt' => 'TT'];
        $major = isset($majorMap[$prefix]) ? $majorMap[$prefix] : 'RPL';
        
        // Replace major_id => '' with major_id => 'RPL' (or appropriate)
        $block = str_replace("major_id' => ''", "major_id' => '$major'", $block);
    }
    
    $newContent .= "AssessmentQuestion::updateOrCreate" . $block;
}

file_put_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php", $newContent);
echo "Fixed seeder with correct major_ids\n";

// Verify the fix
$lines = file("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");
$counts = ["RPL"=>0, "DKV"=>0, "TKJ"=>0, "TT"=>0];
foreach ($lines as $line) {
    if (strpos($line, "major_id' => 'RPL'") !== false) $counts["RPL"]++;
    if (strpos($line, "major_id' => 'DKV'") !== false) $counts["DKV"]++;
    if (strpos($line, "major_id' => 'TKJ'") !== false) $counts["TKJ"]++;
    if (strpos($line, "major_id' => 'TT'") !== false) $counts["TT"]++;
}
echo "Distribution: RPL=" . $counts["RPL"] . " DKV=" . $counts["DKV"] . " TKJ=" . $counts["TKJ"] . " TT=" . $counts["TT"] . "\n";
echo "Total lines with major_id: " . array_sum($counts) . "\n";
?>