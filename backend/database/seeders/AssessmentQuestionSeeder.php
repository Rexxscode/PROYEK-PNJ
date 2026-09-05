<?php

namespace Database\Seeders;

use App\Models\AssessmentQuestion;
use Illuminate\Database\Seeder;

class AssessmentQuestionSeeder extends Seeder
{
    public function run(): void
    {
        // Extract assessment questions from the relevant quiz files per major.
        // RPL: materi-quiz-rpl.ts, DKV: materi-quiz-dkv.ts
        // TJKT (gabungan TKJ 75% + Transmisi 25%):
        //   - 75 pertanyaan dari materi-quiz-tkj.ts
        //   - 25 pertanyaan dari materi-quiz-tt.ts

        $assessmentMap = [
            'rpl' => [
                'major_id' => 'RPL',
                'sources' => [
                    ['file' => base_path('../frontend/app/lib/materi-quiz-rpl.ts'), 'limit' => 100],
                ],
            ],
            'dkv' => [
                'major_id' => 'DKV',
                'sources' => [
                    ['file' => base_path('../frontend/app/lib/materi-quiz-dkv.ts'), 'limit' => 100],
                ],
            ],
            'tjkt' => [
                'major_id' => 'TJKT',
                'sources' => [
                    ['file' => base_path('../frontend/app/lib/materi-quiz-tkj.ts'), 'limit' => 75],
                    ['file' => base_path('../frontend/app/lib/materi-quiz-tt.ts'), 'limit' => 25],
                ],
            ],
        ];

        foreach ($assessmentMap as $key => $map) {
            $majorId = $map['major_id'];

            foreach ($map['sources'] as $source) {
                $file = $source['file'];
                $limit = $source['limit'];

                if (!file_exists($file)) {
                    continue;
                }

                $quizContent = file_get_contents($file);

                preg_match_all('/id:\s*"([^"]+)"/', $quizContent, $idMatches);
                preg_match_all('/question:\s*"([^"]+)"/', $quizContent, $questionMatches);
                preg_match_all('/options:\s*\[((?:\s*"[^"]*"\s*,?\s*)+)\]/', $quizContent, $optionsMatches);
                preg_match_all('/correct:\s*(\d+)/', $quizContent, $correctMatches);
                preg_match_all('/difficulty:\s*"([^"]+)"/', $quizContent, $difficultyMatches);
                preg_match_all('/skill:\s*"([^"]+)"/', $quizContent, $skillMatches);

                $ids = $idMatches[1] ?? [];
                $questions = $questionMatches[1] ?? [];
                $optionsRaw = $optionsMatches[1] ?? [];
                $corrects = $correctMatches[1] ?? [];
                $difficulties = $difficultyMatches[1] ?? [];
                $skills = $skillMatches[1] ?? [];

                $parsedOptions = [];
                foreach ($optionsRaw as $optionsStr) {
                    preg_match_all('/"([^"]+)"/', $optionsStr, $optMatches);
                    $parsedOptions[] = $optMatches[1] ?? [];
                }

                $totalQuestions = min(count($ids), count($questions), count($parsedOptions), count($corrects), count($difficulties));
                $totalQuestions = min($totalQuestions, $limit);

                for ($i = 0; $i < $totalQuestions; $i++) {
                    $question = new AssessmentQuestion([
                        'major_id' => $majorId,
                        'question' => $questions[$i] ?? '',
                        'options' => $parsedOptions[$i] ?? [],
                        'correct' => (int)($corrects[$i] ?? 0),
                        'difficulty' => $difficulties[$i] ?? 'basic',
                        'skill' => $skills[$i] ?? '',
                    ]);

                    $question->save();
                }
            }
        }
    }
}