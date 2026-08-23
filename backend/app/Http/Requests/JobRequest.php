<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $store = $this->isMethod('post');

        return [
            'title' => [$store ? 'required' : 'sometimes', 'string', 'max:150'],
            'company' => [$store ? 'required' : 'sometimes', 'string', 'max:100'],
            'location' => [$store ? 'required' : 'sometimes', 'string', 'max:100'],
            'type' => [$store ? 'required' : 'sometimes', 'in:magang,fulltime,parttime,freelance'],
            'description' => [$store ? 'required' : 'sometimes', 'string'],
            'requiredSkills' => ['sometimes', 'array'],
            'requiredSkills.*' => ['string', 'max:100', 'distinct'],
            'deadline' => ['sometimes', 'nullable', 'date'],
            'salary' => ['sometimes', 'nullable', 'string', 'max:100'],
        ];
    }

    /**
     * posted_by sengaja tidak pernah di-accept dari request.
     */
    public function jobFields(): array
    {
        $fields = $this->validated();

        unset($fields['requiredSkills']);

        return $fields;
    }
}
