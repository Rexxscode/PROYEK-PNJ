<?php
// Quick fix: rewrite the seeder with correct major codes
// Map from ID prefix to major short code
$majorMap = [
    'rpl' => 'RPL',
    'dkv' => 'DKV', 
    'tkj' => 'TKJ',
    'tt' => 'TT'
];

$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");

// Replace 'major_id' => '$prefix' with 'major_id' => '$majorMap[$prefix]'
// But this is a text replacement - let me just rewrite the file properly

// Actually, let me just check what needs fixing and do a targeted replacement
// Read the file
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");

// The issue is lines like: 'major_id' => 'rpl'
// Need to change to: 'major_id' => 'RPL'
// Let me find and replace these

// Count occurrences of major_id patterns
if (preg_match_all("/'major_id' => '(\\w+)'/", $content, $m)) {
    foreach ($m[1] as $key => $val) {
        if (array_key_exists($val, $majorMap)) {
            $content = str_replace("'major_id' => '$val'", "'major_id' => '$majorMap[$val]'", $content);
        }
    }
}

file_put_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php", $content);
echo "File fixed\n";

// Now verify the distribution
// Count by checking the major_id values
$counts = ['RPL' => 0, 'DKV' => 0, 'TKJ' => 0, 'TT' => 0];
if (preg_match_all("/'major_id' => '($ma)/", $content, $m)) {
    foreach ($m[1] as $val) {
        if (isset($counts[$val])) $counts[$val]++;
    }
}
echo "Distribution after fix:\n";
foreach ($counts as $k => $v) echo "  $k: $v\n";
echo "Total: " . array_sum($counts) . "\n";
?>