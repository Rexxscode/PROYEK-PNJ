<?php
$content = file_get_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php");

// Map ID prefixes to major short codes
$majorMap = [
    'rpl' => 'RPL',
    'dkv' => 'DKV', 
    'tkj' => 'TKJ',
    'tt' => 'TT'
];

// The seeder has 400 AssessmentQuestion::updateOrCreate blocks
// Each block has: ['id' => 'XXX', 'major_id' => '', 'question' => ..., ...]
// I need to replace 'major_id' => '' with the correct major based on the ID

// Split by AssessmentQuestion::updateOrCreate to process each question
$blocks = preg_split("/AssessmentQuestion::updateOrCreate/", $content, -1, PREG_SPLIT_NO_EMPTY);

// Rebuild the seeder
$newContent = "<?php\n\n";
$newContent .= "namespace Database\\Seeders;\n";
$newContent .= "use App\\Models\\AssessmentQuestion;\n";
$newContent .= "use Illuminate\\Database\\Seeders\\Seeder;\n\n";
$newContent .= "class AssessmentQuestionSeeder extends Seeder\n";
$newContent .= "{\n";
$newContent .= "    public function run(): void\n";
$newContent .= "    {\n";

// Process each block (starting from index 1, as index 0 might be empty or the namespace)
for ($b = 1; $b < count($blocks); $b++) {
    $block = $blocks[$b];
    
    // Extract the ID from the block
    if (preg_match("/'id' => '([^']+)'/", $block, $idMatch)) {
        $id = $idMatch[1];
        $prefix = substr($id, 0, 3);
        $major = isset($majorMap[$prefix]) ? $majorMap[$prefix] : 'RPL';
        
        // The block should have 'major_id' => '' which we need to replace
        // Find and replace the major_id line
        $block = preg_replace("/'major_id' => ''/", "'major_id' => '$major'", $block);
    }
    
    $newContent .= "AssessmentQuestion::updateOrCreate" . $block;
}

$newContent .= "    }\n";
$newContent .= "}\n";

// Write the fixed seeder
file_put_contents("C:/laragon/www/PROYEK-PNJ/backend/database/seeders/AssessmentQuestionSeeder.php", $newContent);
echo "Seeder rewritten with correct major_ids\n";
?>