<?php
// Read first 20 lines of each file and show ID patterns
$files = [
    "C:\\laragon\\www\\PROYEK-PNJ\\frontend\\app\\lib\\major-quiz.ts",
    "C:\\laragon\\www\\PROYEK-PNJ\\frontend\\app\\lib\\materi-quiz-rpl.ts",
    "C:\\laragon\\www\\PROYEK-PNJ\\frontend\\app\\lib\\materi-quiz-dkv.ts",
    "C:\\laragon\\www\\PROYEK-PNJ\\frontend\\app\\lib\\materi-quiz-tkj.ts",
    "C:\\laragon\\www\\PROYEK-PNJ\\frontend\\app\\lib\\materi-quiz-tt.ts"
];

foreach ($files as $file) {
    $content = file_get_contents($file);
    $lines = explode("\n", $content);
    echo "=== " . basename($file) . " ===\n";
    for ($i = 0; $i < min(20, count($lines)); $i++) {
        $line = $lines[$i];
        if (preg_match("/id.*?(\\S+)/", $line, $m)) {
            echo "  Line " . ($i+1) . ": " . $m[1] . "\n";
        }
    }
    echo "\n";
}
