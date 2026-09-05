<?php

namespace App\Swagger;

use OpenApi\Attributes as OA;

/**
 * Path endpoint (bagian 2): Jurusan, Materi, Sertifikat, Roadmap, Portofolio.
 */
#[OA\Get(
    path: '/v1/majors',
    tags: ['Jurusan'],
    operationId: 'majorsList',
    summary: 'Daftar jurusan (kompetensi keahlian)',
    description: 'Mengembalikan daftar jurusan yang tersedia. Memerlukan autentikasi admin.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Daftar jurusan.')]
)]
#[OA\Get(
    path: '/v1/majors/{major}/materi',
    tags: ['Jurusan'],
    operationId: 'majorsMateri',
    summary: 'Mata pelajaran per jurusan',
    description: 'Mengembalikan daftar mata pelajaran (materi) untuk suatu jurusan.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'major', in: 'path', required: true,
            schema: new OA\Schema(type: 'string', enum: ['RPL', 'DKV', 'TJKT']),
            description: 'Kode jurusan.'),
    ],
    responses: [new OA\Response(response: 200, description: 'Daftar materi jurusan.')]
)]
#[OA\Get(
    path: '/v1/materi/majors/{major}',
    tags: ['Materi'],
    operationId: 'materiListByMajor',
    summary: 'Materi per jurusan',
    description: 'Mengembalikan daftar materi untuk suatu jurusan berdasarkan kode jurusan.',
    parameters: [
        new OA\Parameter(name: 'major', in: 'path', required: true,
            schema: new OA\Schema(type: 'string', enum: ['RPL', 'DKV', 'TJKT']),
            description: 'Kode jurusan.'),
    ],
    responses: [new OA\Response(response: 200, description: 'Daftar materi.')]
)]
#[OA\Get(
    path: '/v1/materi/{materiId}/questions',
    tags: ['Materi'],
    operationId: 'materiQuestions',
    summary: 'Soal quiz per materi',
    description: 'Mengembalikan daftar soal quiz untuk suatu materi. materiId dapat berupa id atau slug materi.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'materiId', in: 'path', required: true,
            schema: new OA\Schema(type: 'string'), description: 'ID atau slug materi.'),
    ],
    responses: [new OA\Response(response: 200, description: 'Daftar soal materi.')]
)]
#[OA\Get(
    path: '/v1/materi/{materiId}/questions/admin',
    tags: ['Materi'],
    operationId: 'materiAdminQuestions',
    summary: 'Soal materi (versi admin)',
    description: 'Mengembalikan soal materi beserta kunci jawaban.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'materiId', in: 'path', required: true,
            schema: new OA\Schema(type: 'string'), description: 'ID atau slug materi.'),
    ],
    responses: [new OA\Response(response: 200, description: 'Soal materi versi admin.')]
)]
#[OA\Post(
    path: '/v1/materi/{materiId}/submit',
    tags: ['Materi'],
    operationId: 'materiSubmit',
    summary: 'Kirim jawaban quiz materi',
    description: 'Mengirim jawaban quiz materi untuk menilai kelulusan.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'materiId', in: 'path', required: true,
            schema: new OA\Schema(type: 'string'), description: 'ID atau slug materi.'),
    ],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['answers'],
            properties: [
                new OA\Property(property: 'answers', type: 'object',
                    additionalProperties: new OA\AdditionalProperties(type: 'integer'),
                    description: 'Map id-soal ke pilihan jawaban.'),
            ]
        )
    ),
    responses: [
        new OA\Response(response: 200, description: 'Hasil pengiriman (lulus/tidak lulus).'),
        new OA\Response(response: 422, description: 'Validasi gagal.'),
    ]
)]
#[OA\Put(
    path: '/v1/materi/{materiId}/questions',
    tags: ['Materi'],
    operationId: 'materiUpdateQuestions',
    summary: 'Perbarui soal materi (admin)',
    description: 'Memperbarui daftar soal untuk suatu materi.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'materiId', in: 'path', required: true,
            schema: new OA\Schema(type: 'string'), description: 'ID atau slug materi.'),
    ],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['questions'],
            properties: [
                new OA\Property(property: 'questions', type: 'array', items: new OA\Items(type: 'object'), description: 'Daftar soal.'),
            ]
        )
    ),
    responses: [new OA\Response(response: 200, description: 'Soal berhasil diperbarui.')]
)]
#[OA\Post(
    path: '/v1/materi/{materiId}/questions/reset',
    tags: ['Materi'],
    operationId: 'materiResetQuestions',
    summary: 'Reset soal materi (admin)',
    description: 'Mengembalikan soal materi ke setelan default.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'materiId', in: 'path', required: true,
            schema: new OA\Schema(type: 'string'), description: 'ID atau slug materi.'),
    ],
    responses: [new OA\Response(response: 200, description: 'Soal berhasil direset.')]
)]
#[OA\Get(
    path: '/v1/certificates',
    tags: ['Sertifikat'],
    operationId: 'certificatesList',
    summary: 'Daftar sertifikat siswa',
    description: 'Mengembalikan daftar sertifikat yang diperoleh pengguna siswa saat ini.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Daftar sertifikat.')]
)]
#[OA\Get(
    path: '/v1/certificates/{materiId}',
    tags: ['Sertifikat'],
    operationId: 'certificateDetail',
    summary: 'Detail sertifikat per materi',
    description: 'Mengembalikan detail sertifikat untuk suatu materi.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'materiId', in: 'path', required: true,
            schema: new OA\Schema(type: 'integer'), description: 'ID materi.'),
    ],
    responses: [new OA\Response(response: 200, description: 'Detail sertifikat.')]
)]
#[OA\Get(
    path: '/v1/roadmap',
    tags: ['Roadmap'],
    operationId: 'roadmapIndex',
    summary: 'Roadmap kesiapan kerja',
    description: 'Mengembalikan roadmap belajar untuk pengguna siswa, opsional difilter berdasarkan skor asesmen.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'score', in: 'query', required: false,
            schema: new OA\Schema(type: 'integer'), description: 'Skor asesmen.'),
    ],
    responses: [new OA\Response(response: 200, description: 'Roadmap dan rekomendasi.')]
)]
#[OA\Get(
    path: '/v1/roadmap/progress',
    tags: ['Roadmap'],
    operationId: 'roadmapProgress',
    summary: 'Progres milestone',
    description: 'Mengembalikan progres pengguna siswa pada roadmap, opsional untuk satu milestone.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'milestone_id', in: 'query', required: false,
            schema: new OA\Schema(type: 'string'), description: 'ID milestone (opsional).'),
    ],
    responses: [new OA\Response(response: 200, description: 'Progres roadmap.')]
)]
#[OA\Post(
    path: '/v1/roadmap/progress',
    tags: ['Roadmap'],
    operationId: 'roadmapUpdateProgress',
    summary: 'Perbarui progres milestone',
    description: 'Memperbarui status progres suatu milestone.',
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['milestone_id', 'status'],
            properties: [
                new OA\Property(property: 'milestone_id', type: 'string'),
                new OA\Property(property: 'status', type: 'string', enum: ['not_started', 'in_progress', 'completed']),
                new OA\Property(property: 'resources_viewed', type: 'array', items: new OA\Items(type: 'string'), description: 'Daftar id sumber daya yang telah dilihat.'),
            ]
        )
    ),
    responses: [new OA\Response(response: 200, description: 'Progres berhasil diperbarui.')]
)]
#[OA\Get(
    path: '/v1/portfolios/{email}/projects',
    tags: ['Portofolio'],
    operationId: 'portfolioProjects',
    summary: 'Proyek siswa (portofolio)',
    description: 'Mengembalikan daftar proyek portofolio untuk pengguna yang terautentikasi.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'email', in: 'path', required: true,
            schema: new OA\Schema(type: 'string', format: 'email'), description: 'Email pengguna siswa.'),
    ],
    responses: [new OA\Response(response: 200, description: 'Daftar proyek.')]
)]
#[OA\Post(
    path: '/v1/portfolios',
    tags: ['Portofolio'],
    operationId: 'portfolioSave',
    summary: 'Simpan proyek portofolio',
    description: 'Menambah atau memperbarui proyek pada portofolio.',
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['title', 'description'],
            properties: [
                new OA\Property(property: 'title', type: 'string', maxLength: 255),
                new OA\Property(property: 'description', type: 'string'),
                new OA\Property(property: 'skills', type: 'array', items: new OA\Items(type: 'string')),
                new OA\Property(property: 'projectUrl', type: 'string', format: 'url'),
                new OA\Property(property: 'completedAt', type: 'string', format: 'date'),
            ]
        )
    ),
    responses: [
        new OA\Response(response: 200, description: 'Proyek disimpan.'),
        new OA\Response(response: 422, description: 'Validasi gagal.'),
    ]
)]
#[OA\Get(
    path: '/v1/portfolios/public/{slug}',
    tags: ['Portofolio'],
    operationId: 'portfolioPublic',
    summary: 'Portofolio publik',
    description: 'Mengembalikan portofolio publik seorang siswa berdasarkan slug. Tidak memerlukan autentikasi.',
    parameters: [
        new OA\Parameter(name: 'slug', in: 'path', required: true,
            schema: new OA\Schema(type: 'string'), description: 'Slug portofolio.'),
    ],
    responses: [new OA\Response(response: 200, description: 'Portofolio publik.')]
)]
final class Paths2
{
}