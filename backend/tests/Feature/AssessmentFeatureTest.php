<?php

namespace Tests\Feature;

use App\Models\AssessmentQuestion;
use App\Models\Student;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class AssessmentFeatureTest extends TestCase
{
    use WithFaker;

    private function studentUser()
    {
        $student = Student::first();
        return $student->user;
    }

    private function allAnswersForMajor(string $major): array
    {
        $questions = AssessmentQuestion::where('major_id', $major)->get();
        $answers = [];
        foreach ($questions as $question) {
            $answers[(string) $question->id] = $question->correct;
        }
        return $answers;
    }

    public function test_get_questions_public_no_token()
    {
        $response = $this->get('/api/v1/assessment/questions');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data',
            'meta'
        ]);
    }

    public function test_get_questions_with_token()
    {
        $this->actingAs($this->studentUser());

        $response = $this->get('/api/v1/assessment/questions');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data',
            'meta'
        ]);
    }

    public function test_get_questions_by_major()
    {
        $this->actingAs($this->studentUser());

        $response = $this->get('/api/v1/assessment/questions/RPL');

        $response->assertStatus(200);
        $response->assertJsonCount(100, 'data');
    }

    public function test_correct_answer_not_in_response()
    {
        $this->actingAs($this->studentUser());

        $response = $this->get('/api/v1/assessment/questions/RPL');

        $response->assertStatus(200);

        $data = $response->json('data');
        foreach ($data as $question) {
            $this->assertArrayNotHasKey('correct', $question);
        }
    }

    public function test_submit_assessment_valid()
    {
        $this->actingAs($this->studentUser());

        $answers = $this->allAnswersForMajor('RPL');

        $response = $this->postJson('/api/v1/assessment/submit', [
            'major' => 'RPL',
            'answers' => $answers,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                'score',
                'total',
                'percentage',
                'level',
                'skill_scores',
                'answered_at'
            ]
        ]);
    }

    public function test_score_calculated_server_side()
    {
        $this->actingAs($this->studentUser());

        $answers = $this->allAnswersForMajor('RPL');

        $response = $this->postJson('/api/v1/assessment/submit', [
            'major' => 'RPL',
            'answers' => $answers,
        ]);

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertIsNumeric($data['score']);
        $this->assertIsNumeric($data['percentage']);
        $this->assertEquals(100, $data['score']);
        $this->assertEquals(100, $data['percentage']);
    }

    public function test_result_saved_to_assessment_results()
    {
        $this->actingAs($this->studentUser());

        $answers = $this->allAnswersForMajor('RPL');

        $this->postJson('/api/v1/assessment/submit', [
            'major' => 'RPL',
            'answers' => $answers,
        ]);

        $student = Student::first();
        $this->assertDatabaseHas('assessment_results', [
            'student_id' => $student->id,
            'major_id' => 'RPL',
        ]);
    }

    public function test_result_student_lain_tidak_boleh_diakses()
    {
        $this->actingAs($this->studentUser());

        $response = $this->get('/api/v1/assessment/results');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertIsArray($data);
    }

    public function test_partial_answers_rejected()
    {
        $this->actingAs($this->studentUser());

        $response = $this->postJson('/api/v1/assessment/submit', [
            'major' => 'RPL',
            'answers' => [1 => 0, 2 => 1],
        ]);

        $response->assertStatus(422);
    }

    public function test_question_dari_major_lain_ditolak()
    {
        $this->actingAs($this->studentUser());

        $response = $this->get('/api/v1/assessment/questions/DKV');

        $response->assertStatus(200);
        $response->assertJsonCount(100, 'data');
    }

    public function test_hasil_assessment_dapat_didapat()
    {
        $this->actingAs($this->studentUser());

        $answers = $this->allAnswersForMajor('RPL');

        $this->postJson('/api/v1/assessment/submit', [
            'major' => 'RPL',
            'answers' => $answers,
        ]);

        $response = $this->get('/api/v1/assessment/results');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertIsArray($data);
    }
}
