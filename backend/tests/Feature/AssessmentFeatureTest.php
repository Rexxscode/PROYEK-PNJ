<?php

namespace Tests\Feature;

use App\Models\AssessmentQuestion;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;

class AssessmentFeatureTest extends TestCase
{
    use WithFaker;

    public function test_get_questions_without_token()
    {
        $response = $this->get('/api/v1/assessment/questions');

        $response->assertStatus(401);
    }

    public function test_get_questions_with_token()
    {
        $this->actingAs($this->student());

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
        $this->actingAs($this->student());

        $response = $this->get('/api/v1/assessment/questions/RPL');

        $response->assertStatus(200);
        $response->assertJsonCount(100, 'data');
    }

    public function test_correct_answer_not_in_response()
    {
        $this->actingAs($this->student());

        $response = $this->get('/api/v1/assessment/questions/RPL');

        $response->assertStatus(200);

        $data = $response->json('data');
        foreach ($data as $question) {
            $this->assertArrayNotHasKey('correct', $question);
        }
    }

    public function test_submit_assessment_valid()
    {
        $this->actingAs($this->student());

        $answers = [];
        $questions = AssessmentQuestion::where('major_id', 'RPL')
            ->take(5)
            ->get();

        foreach ($questions as $question) {
            $answers[$question->id] = $question->correct;
        }

        $response = $this->post('/api/v1/assessment/submit', [
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
        $this->actingAs($this->student());

        $answers = [];
        $questions = AssessmentQuestion::where('major_id', 'RPL')
            ->take(10)
            ->get();

        foreach ($questions as $question) {
            $answers[$question->id] = $question->correct;
        }

        $response = $this->post('/api/v1/assessment/submit', [
            'major' => 'RPL',
            'answers' => $answers,
        ]);

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertIsNumeric($data['score']);
        $this->assertIsNumeric($data['percentage']);
    }

    public function test_result_saved_to_assessment_results()
    {
        $this->actingAs($this->student());

        $answers = [];
        $questions = AssessmentQuestion::where('major_id', 'RPL')
            ->take(5)
            ->get();

        foreach ($questions as $question) {
            $answers[$question->id] = $question->correct;
        }

        $this->post('/api/v1/assessment/submit', [
            'major' => 'RPL',
            'answers' => $answers,
        ]);

        $this->assertDatabaseHas('assessment_results', [
            'student_id' => $this->student()->id,
            'major_id' => 'RPL',
        ]);
    }

    public function test_result_student_lain_tidak_boleh_diakses()
    {
        $this->actingAs($this->student());

        $response = $this->get('/api/v1/assessment/results');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertIsArray($data);
    }

    public function test_invalid_question_id_422()
    {
        $this->actingAs($this->student());

        $response = $this->post('/api/v1/assessment/submit', [
            'major' => 'RPL',
            'answers' => [999 => 1],
        ]);

        $response->assertStatus(422);
    }

    public function test_question_dari_major_lain_ditolak()
    {
        $this->actingAs($this->student());

        $response = $this->get('/api/v1/assessment/questions/DKV');

        $response->assertStatus(200);
        $response->assertJsonCount(100, 'data');
    }

    public function test_hasil_assessment_dapat_didapat()
    {
        $this->actingAs($this->student());

        $answers = [];
        $questions = AssessmentQuestion::where('major_id', 'RPL')
            ->take(3)
            ->get();

        foreach ($questions as $question) {
            $answers[$question->id] = $question->correct;
        }

        $this->post('/api/v1/assessment/submit', [
            'major' => 'RPL',
            'answers' => $answers,
        ]);

        $response = $this->get('/api/v1/assessment/results');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertIsArray($data);
    }

    private function student()
    {
        return \App\Models\Student::first();
    }
}