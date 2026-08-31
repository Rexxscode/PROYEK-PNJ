<?php

namespace Database\Seeders;

use App\Models\Materi;
use App\Models\MateriQuestion;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MateriQuestionSeeder extends Seeder
{
    public function run(): void
    {
        // truncate first to ensure fresh data on each run
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('materi_questions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        // Map: 4 majors, each with their quiz file and corresponding materi IDs
        $assessmentMap = [
            'rpl' => [
                'major_id' => 'RPL',
                'file' => base_path('../frontend/app/lib/materi-quiz-rpl.ts'),
                'materiIds' => ['rpl-fullstack', 'rpl-frontend', 'rpl-backend', 'rpl-devops', 'rpl-mobile'],
            ],
            'dkv' => [
                'major_id' => 'DKV',
                'file' => base_path('../frontend/app/lib/materi-quiz-dkv.ts'),
                'materiIds' => ['dkv-motion', 'dkv-graphic', 'dkv-uiux', 'dkv-product', 'dkv-brand'],
            ],
            'tkj' => [
                'major_id' => 'TKJ',
                'file' => base_path('../frontend/app/lib/materi-quiz-tkj.ts'),
                'materiIds' => ['tkj-sysadmin', 'tkj-cloud', 'tkj-support', 'tkj-network', 'tkj-security'],
            ],
            'tt' => [
                'major_id' => 'TT',
                'file' => base_path('../frontend/app/lib/materi-quiz-tt.ts'),
                'materiIds' => ['tt-fiber', 'tt-rf', 'tt-noc', 'tt-network', 'tt-telecom'],
            ],
        ];

        $questionCounter = 0;

        foreach ($assessmentMap as $key => $map) {
            $file = $map['file'];
            $majorId = $map['major_id'];
            $materiIds = $map['materiIds'];

            if (!file_exists($file)) {
                continue;
            }

            $quizContent = file_get_contents($file);

            // Extract question data
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

            // Parse options
            $parsedOptions = [];
            foreach ($optionsRaw as $optionsStr) {
                preg_match_all('/"([^"]+)"/', $optionsStr, $optMatches);
                $parsedOptions[] = $optMatches[1] ?? [];
            }

            $totalQuestions = min(count($ids), count($questions), count($parsedOptions), count($corrects), count($difficulties));
            $totalQuestions = min($totalQuestions, 100);

            // Get all materi for this major
            $materiList = Materi::where('major_id', $map['major_id'])
                ->orderBy('id')
                ->get();

            // Distribute questions across all materi for this major
            $questionsPerMateri = ceil($totalQuestions / count($materiList));

            $qIndex = 0;
            foreach ($materiList as $materi) {
                $questionsForThisMateri = min($questionsPerMateri, $totalQuestions - $qIndex);
                if ($questionsForThisMateri <= 0) break;

                for ($i = 0; $i < $questionsForThisMateri; $i++) {
                    $globalIndex = $questionCounter + $i;
                    $correctIdx = (int)($corrects[$globalIndex] ?? 0);
                    $difficulty = $difficulties[$globalIndex] ?? 'basic';

                    $question = new MateriQuestion([
                        'materi_id' => $materi->id,
                        'question' => $questions[$globalIndex] ?? '',
                        'options' => json_encode($parsedOptions[$globalIndex] ?? []),
                        'correct_index' => $correctIdx,
                        'difficulty' => $difficulty,
                    ]);

                    $question->save();
                }

                $qIndex += $questionsForThisMateri;
            }

            $questionCounter += $totalQuestions;
        }
    }
}