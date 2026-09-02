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

        // Quiz files grouped by major. The question id prefix maps directly to the
        // materi slug (e.g. id "tkj-sysadmin-01" -> materi slug "tkj-sysadmin").
        $sources = [
            ['file' => base_path('../frontend/app/lib/materi-quiz-rpl.ts'), 'major' => 'RPL'],
            ['file' => base_path('../frontend/app/lib/materi-quiz-dkv.ts'), 'major' => 'DKV'],
            ['file' => base_path('../frontend/app/lib/materi-quiz-tkj.ts'), 'major' => 'TJKT'],
            ['file' => base_path('../frontend/app/lib/materi-quiz-tt.ts'), 'major' => 'TJKT'],
        ];

        $skillCache = [];
        $skillIdFor = function (string $skillName) use (&$skillCache) {
            if (isset($skillCache[$skillName])) {
                return $skillCache[$skillName];
            }
            $skill = \App\Models\Skill::where('name', $skillName)->first();
            return $skillCache[$skillName] = $skill?->id ?? null;
        };

        foreach ($sources as $source) {
            $file = $source['file'];

            if (!file_exists($file)) {
                continue;
            }

            $quizContent = file_get_contents($file);

            preg_match_all('/id:\s*"([^"]+-[^"]+)"/', $quizContent, $idMatches);
            preg_match_all('/question:\s*"([^"]+)"/', $quizContent, $questionMatches);
            preg_match_all('/options:\s*\[([^\]]+)\]/', $quizContent, $optionsMatches);
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

            $count = min(count($ids), count($questions), count($parsedOptions), count($corrects), count($difficulties), count($skills));

            for ($i = 0; $i < $count; $i++) {
                $materiSlug = $this->slugFromQuestionId($ids[$i]);
                if (!$materiSlug) {
                    continue;
                }

                $materi = Materi::where('slug', $materiSlug)->first();
                if (!$materi) {
                    continue;
                }

                $correctIdx = (int)($corrects[$i] ?? 0);
                $difficulty = $difficulties[$i] ?? 'basic';

                // Skip malformed/empty questions
                $questionText = $questions[$i] ?? '';
                $opts = $parsedOptions[$i] ?? [];
                if ($questionText === '' || count($opts) < 2) {
                    continue;
                }

                MateriQuestion::create([
                    'materi_id' => $materi->id,
                    'skill_id' => !empty($skills[$i]) ? $skillIdFor($skills[$i]) : null,
                    'question' => $questionText,
                    'options' => json_encode($opts),
                    'correct_index' => $correctIdx,
                    'difficulty' => $difficulty,
                ]);
            }
        }
    }

    /**
     * Derive the materi slug from a question id like "tkj-sysadmin-07" -> "tkj-sysadmin".
     * Skips assessment-style ids that only have two segments (e.g. "rpl-91").
     */
    private function slugFromQuestionId(string $id): ?string
    {
        $parts = explode('-', $id);
        // Requires at least three segments: <materi-slug>-<NN>.
        if (count($parts) < 3) {
            return null;
        }
        return implode('-', array_slice($parts, 0, -1));
    }
}