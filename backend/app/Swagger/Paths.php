<?php

namespace App\Swagger;

use OpenApi\Attributes as OA;

/**
 * Definisi path endpoint API SkillMatch yang dipindai l5-swagger.
 * Deskripsi dalam Bahasa Indonesia (semi-teknis).
 */
#[OA\Post(
    path: '/v1/auth/login',
    tags: ['Autentikasi'],
    operationId: 'authLogin',
    summary: 'Login pengguna',
    description: 'Melakukan autentikasi dengan email dan kata sandi untuk mendapatkan token akses.',
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['email', 'password'],
            properties: [
                new OA\Property(property: 'email', type: 'string', format: 'email', example: 'budi@student.smk.id'),
                new OA\Property(property: 'password', type: 'string', format: 'password', example: 'Budi@2026!'),
            ]
        )
    ),
    responses: [
        new OA\Response(response: 200, description: 'Login berhasil. Token diberikan untuk akses endpoint terlindungi.'),
        new OA\Response(response: 401, description: 'Kredensial tidak valid.'),
        new OA\Response(response: 403, description: 'Akses ditolak (mis. akun belum disetujui).'),
    ]
)]
#[OA\Post(
    path: '/v1/auth/register',
    tags: ['Autentikasi'],
    operationId: 'authRegister',
    summary: 'Registrasi pengguna baru',
    description: 'Membuat akun baru untuk siswa atau perusahaan.',
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            description: 'Data pendaftaran (siswa atau perusahaan).',
            properties: [
                new OA\Property(property: 'name', type: 'string', description: 'Nama lengkap.'),
                new OA\Property(property: 'email', type: 'string', format: 'email', description: 'Alamat email unik.'),
                new OA\Property(property: 'password', type: 'string', format: 'password', minLength: 8),
                new OA\Property(property: 'password_confirmation', type: 'string', format: 'password'),
                new OA\Property(property: 'role', type: 'string', enum: ['student', 'industry']),
                new OA\Property(property: 'major', type: 'string', description: 'Kode jurusan (wajib untuk siswa).'),
                new OA\Property(property: 'grade', type: 'string', description: 'Tingkat/kelas (wajib untuk siswa).'),
                new OA\Property(property: 'company', type: 'string', description: 'Nama perusahaan (wajib untuk industri).'),
            ]
        )
    ),
    responses: [
        new OA\Response(response: 201, description: 'Registrasi berhasil.'),
        new OA\Response(response: 422, description: 'Validasi gagal.'),
    ]
)]
#[OA\Post(
    path: '/v1/auth/logout',
    tags: ['Autentikasi'],
    operationId: 'authLogout',
    summary: 'Keluar dari sesi',
    description: 'Menghapus token akses pengguna saat ini.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Logout berhasil.')]
)]
#[OA\Get(
    path: '/v1/auth/me',
    tags: ['Autentikasi'],
    operationId: 'authMe',
    summary: 'Profil pengguna saat ini',
    description: 'Mengembalikan data pengguna yang terautentikasi.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Data pengguna saat ini.')]
)]
#[OA\Post(
    path: '/v1/auth/change-password',
    tags: ['Autentikasi'],
    operationId: 'authChangePassword',
    summary: 'Ubah kata sandi',
    description: 'Mengubah kata sandi pengguna saat ini. Berlaku untuk semua peran.',
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['current_password', 'new_password', 'new_password_confirmation'],
            properties: [
                new OA\Property(property: 'current_password', type: 'string', format: 'password', description: 'Kata sandi lama.'),
                new OA\Property(property: 'new_password', type: 'string', format: 'password', minLength: 8, description: 'Kata sandi baru (minimal 8 karakter).'),
                new OA\Property(property: 'new_password_confirmation', type: 'string', format: 'password'),
            ]
        )
    ),
    responses: [
        new OA\Response(response: 200, description: 'Kata sandi berhasil diubah.'),
        new OA\Response(response: 422, description: 'Validasi gagal atau kata sandi lama salah.'),
    ]
)]
#[OA\Post(
    path: '/v1/auth/forgot-password',
    tags: ['Autentikasi'],
    operationId: 'authForgotPassword',
    summary: 'Lupa kata sandi',
    description: 'Mengirim tautan/instruksi reset kata sandi ke email pengguna.',
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['email'],
            properties: [new OA\Property(property: 'email', type: 'string', format: 'email')]
        )
    ),
    responses: [new OA\Response(response: 200, description: 'Instruksi reset terkirim.')]
)]
#[OA\Post(
    path: '/v1/auth/reset-password',
    tags: ['Autentikasi'],
    operationId: 'authResetPassword',
    summary: 'Atur ulang kata sandi',
    description: 'Mengatur ulang kata sandi menggunakan token yang dikirim ke email.',
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['email', 'token', 'password', 'password_confirmation'],
            properties: [
                new OA\Property(property: 'email', type: 'string', format: 'email'),
                new OA\Property(property: 'token', type: 'string'),
                new OA\Property(property: 'password', type: 'string', format: 'password', minLength: 8),
                new OA\Property(property: 'password_confirmation', type: 'string', format: 'password'),
            ]
        )
    ),
    responses: [
        new OA\Response(response: 200, description: 'Kata sandi berhasil diatur ulang.'),
        new OA\Response(response: 422, description: 'Validasi gagal.'),
    ]
)]
#[OA\Get(
    path: '/v1/assessment/questions/{major}',
    tags: ['Asesmen'],
    operationId: 'assessmentQuestions',
    summary: 'Daftar soal asesmen',
    description: 'Mengembalikan daftar soal asesmen kesiapan kerja, opsional difilter per jurusan.',
    parameters: [
        new OA\Parameter(name: 'major', in: 'path', required: false,
            schema: new OA\Schema(type: 'string', enum: ['RPL', 'DKV', 'TJKT']),
            description: 'Kode jurusan (opsional).'),
    ],
    responses: [new OA\Response(response: 200, description: 'Daftar soal asesmen.')]
)]
#[OA\Get(
    path: '/v1/assessment/questions/admin/{major}',
    tags: ['Asesmen'],
    operationId: 'assessmentAdminQuestions',
    summary: 'Daftar soal asesmen (versi admin)',
    description: 'Mengembalikan daftar soal beserta kunci jawaban untuk administrasi.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'major', in: 'path', required: false,
            schema: new OA\Schema(type: 'string', enum: ['RPL', 'DKV', 'TJKT']),
            description: 'Kode jurusan (opsional).'),
    ],
    responses: [new OA\Response(response: 200, description: 'Daftar soal versi admin.')]
)]
#[OA\Post(
    path: '/v1/assessment/submit',
    tags: ['Asesmen'],
    operationId: 'assessmentSubmit',
    summary: 'Kirim jawaban asesmen',
    description: 'Mengirim jawaban asesmen untuk mendapatkan skor kesiapan kerja.',
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['major', 'answers'],
            properties: [
                new OA\Property(property: 'major', type: 'string', enum: ['RPL', 'DKV', 'TJKT']),
                new OA\Property(property: 'answers', type: 'object',
                    additionalProperties: new OA\AdditionalProperties(type: 'integer'),
                    description: 'Map id-soal ke pilihan jawaban.'),
            ]
        )
    ),
    responses: [
        new OA\Response(response: 200, description: 'Hasil asesmen.'),
        new OA\Response(response: 422, description: 'Validasi gagal.'),
    ]
)]
#[OA\Get(
    path: '/v1/assessment/results',
    tags: ['Asesmen'],
    operationId: 'assessmentResults',
    summary: 'Hasil asesmen pengguna',
    description: 'Mengembalikan riwayat hasil asesmen pengguna saat ini.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Hasil asesmen.')]
)]
#[OA\Put(
    path: '/v1/assessment/questions',
    tags: ['Asesmen'],
    operationId: 'assessmentUpdateQuestions',
    summary: 'Perbarui soal asesmen (admin)',
    description: 'Memperbarui daftar soal asesmen untuk suatu jurusan.',
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['major', 'questions'],
            properties: [
                new OA\Property(property: 'major', type: 'string', enum: ['RPL', 'DKV', 'TJKT']),
                new OA\Property(property: 'questions', type: 'array', items: new OA\Items(type: 'object'), description: 'Daftar soal.'),
            ]
        )
    ),
    responses: [
        new OA\Response(response: 200, description: 'Soal berhasil diperbarui.'),
        new OA\Response(response: 422, description: 'Validasi gagal.'),
    ]
)]
#[OA\Post(
    path: '/v1/assessment/questions/reset',
    tags: ['Asesmen'],
    operationId: 'assessmentResetQuestions',
    summary: 'Reset soal asesmen (admin)',
    description: 'Mengembalikan soal asesmen ke setelan default untuk suatu jurusan.',
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['major'],
            properties: [new OA\Property(property: 'major', type: 'string', enum: ['RPL', 'DKV', 'TJKT'])]
        )
    ),
    responses: [
        new OA\Response(response: 200, description: 'Soal berhasil direset.'),
        new OA\Response(response: 422, description: 'Validasi gagal.'),
    ]
)]
final class Paths
{
}