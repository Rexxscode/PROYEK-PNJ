<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public const MAJOR_MAP = [
        'rpl' => 'Rekayasa Perangkat Lunak',
        'dkv' => 'Desain Komunikasi Visual',
        'tt' => 'Teknik Transmisi',
        'tkj' => 'Teknik Komputer dan Jaringan',
    ];

    public const GRADE_MAP = [
        'x' => 'X',
        'xi' => 'XI',
        'xii' => 'XII',
        'alumni' => 'Alumni',
    ];

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'major' => ['required', 'in:rpl,dkv,tt,tkj'],
            'grade' => ['required', 'in:x,xi,xii,alumni'],
        ];
    }

    public function majorName(): string
    {
        return self::MAJOR_MAP[$this->validated('major')];
    }

    public function gradeName(): string
    {
        return self::GRADE_MAP[$this->validated('grade')];
    }
}
