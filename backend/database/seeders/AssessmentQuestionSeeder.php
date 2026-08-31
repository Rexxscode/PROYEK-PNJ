<?php

namespace Database\Seeders;

use App\Models\AssessmentQuestion;
use Illuminate\Database\Seeder;

class AssessmentQuestionSeeder extends Seeder
{
    public function run(): void
    {
        // Extract 100 questions per major from the materi quiz files
        // RPL: materi-quiz-rpl.ts, DKV: materi-quiz-dkv.ts, TKJ: materi-quiz-tkj.ts, TT: materi-quiz-tt.ts
        // Each file has 5 sub-majors × 20 questions = 100 questions total

        $assessmentMap = [
            'rpl' => [
                'major_id' => 'RPL',
                'file' => base_path('../frontend/app/lib/materi-quiz-rpl.ts'),
            ],
            'dkv' => [
                'major_id' => 'DKV',
                'file' => base_path('../frontend/app/lib/materi-quiz-dkv.ts'),
            ],
            'tkj' => [
                'major_id' => 'TKJ',
                'file' => base_path('../frontend/app/lib/materi-quiz-tkj.ts'),
            ],
            'tt' => [
                'major_id' => 'TT',
                'file' => base_path('../frontend/app/lib/materi-quiz-tt.ts'),
            ],
        ];

        $totalAsked = 0;

        foreach ($assessmentMap as $key => $map) {
            $file = $map['file'];
            $majorId = $map['major_id'];

            if (!file_exists($file)) {
                continue;
            }

            $quizContent = file_get_contents($file);

            // Extract question data - TypeScript format: id: "rpl-fullstack-01"
            preg_match_all('/id:\s*"([^"]+)"/', $quizContent, $idMatches);
            preg_match_all('/question:\s*"([^"]+)"/', $quizContent, $questionMatches);
            preg_match_all('/options:\s*\[([^\]]+)\]/', $quizContent, $optionsMatches);
            preg_match_all('/correct:\s*(\d+)/', $quizContent, $correctMatches);
            preg_match_all('/difficulty:\s*"([^"]+)"/', $quizContent, $difficultyMatches);

            $ids = $idMatches[1] ?? [];
            $questions = $questionMatches[1] ?? [];
            $optionsRaw = $optionsMatches[1] ?? [];
            $corrects = $correctMatches[1] ?? [];
            $difficulties = $difficultyMatches[1] ?? [];

            // Parse options from raw string - extract option texts
            $parsedOptions = [];
            foreach ($optionsRaw as $optionsStr) {
                preg_match_all('/"([^"]+)"/', $optionsStr, $optMatches);
                $parsedOptions[] = $optMatches[1] ?? [];
            }

            $totalQuestions = min(count($ids), count($questions), count($parsedOptions), count($corrects), count($difficulties));

            // Only take first 100 questions per major to match the target
            $totalQuestions = min($totalQuestions, 100);

            for ($i = 0; $i < $totalQuestions; $i++) {
                $correctVal = (int)($corrects[$i] ?? 0);
                $difficulty = $difficulties[$i] ?? 'basic';

                $question = new AssessmentQuestion([
                    'major_id' => $majorId,
                    'question' => $questions[$i] ?? '',
                    'options' => $parsedOptions[$i] ?? [],
                    'correct' => $correctVal,
                    'difficulty' => $difficulty,
                    'skill' => '',
                ]);

                $question->save();
            }

            $totalAsked += $totalQuestions;
        }
    }
}