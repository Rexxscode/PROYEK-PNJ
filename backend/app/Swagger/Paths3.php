<?php

namespace App\Swagger;

use OpenApi\Attributes as OA;

/**
 * Path endpoint (bagian 3): Industri, Lowongan Kerja, Notifikasi, Admin, Registrasi, Siswa, Statistik.
 */
#[OA\Get(
    path: '/v1/industries/me',
    tags: ['Industri'],
    operationId: 'industryMe',
    summary: 'Profil perusahaan (me)',
    description: 'Mengembalikan profil perusahaan pengguna industri saat ini.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Profil perusahaan.')]
)]
#[OA\Get(
    path: '/v1/industries/profile',
    tags: ['Industri'],
    operationId: 'industryProfile',
    summary: 'Profil perusahaan',
    description: 'Mengembalikan profil perusahaan pengguna industri saat ini.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Profil perusahaan.')]
)]
#[OA\Put(
    path: '/v1/industries/profile',
    tags: ['Industri'],
    operationId: 'industryUpdateProfile',
    summary: 'Perbarui profil perusahaan',
    description: 'Memperbarui profil perusahaan.',
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['company', 'industry'],
            properties: [
                new OA\Property(property: 'company', type: 'string', maxLength: 255),
                new OA\Property(property: 'industry', type: 'string'),
                new OA\Property(property: 'location', type: 'string'),
                new OA\Property(property: 'website', type: 'string', format: 'url'),
                new OA\Property(property: 'description', type: 'string'),
                new OA\Property(property: 'founded', type: 'string'),
                new OA\Property(property: 'employee_count', type: 'string'),
            ]
        )
    ),
    responses: [
        new OA\Response(response: 200, description: 'Profil berhasil diperbarui.'),
        new OA\Response(response: 422, description: 'Validasi gagal.'),
    ]
)]
#[OA\Get(
    path: '/v1/industries/candidates',
    tags: ['Industri'],
    operationId: 'industryCandidates',
    summary: 'Daftar kandidat siswa',
    description: 'Mengembalikan daftar kandidat siswa, opsional difilter berdasarkan keahlian.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'skills', in: 'query', required: false,
            schema: new OA\Schema(type: 'string'), description: 'Filter daftar keahlian.'),
    ],
    responses: [new OA\Response(response: 200, description: 'Daftar kandidat.')]
)]
#[OA\Get(
    path: '/v1/jobs',
    tags: ['Lowongan Kerja'],
    operationId: 'jobsIndex',
    summary: 'Daftar lowongan (publik)',
    description: 'Mengembalikan daftar lowongan kerja. Dapat difilter berdasarkan tipe dan pencarian.',
    parameters: [
        new OA\Parameter(name: 'type', in: 'query', required: false,
            schema: new OA\Schema(type: 'string', enum: ['magang', 'fulltime', 'parttime', 'freelance']), description: 'Tipe lowongan.'),
        new OA\Parameter(name: 'search', in: 'query', required: false,
            schema: new OA\Schema(type: 'string'), description: 'Kata kunci pencarian.'),
        new OA\Parameter(name: 'page', in: 'query', required: false, schema: new OA\Schema(type: 'integer')),
        new OA\Parameter(name: 'per_page', in: 'query', required: false, schema: new OA\Schema(type: 'integer')),
    ],
    responses: [new OA\Response(response: 200, description: 'Daftar lowongan.')]
)]
#[OA\Get(
    path: '/v1/jobs/{id}',
    tags: ['Lowongan Kerja'],
    operationId: 'jobsShow',
    summary: 'Detail lowongan',
    description: 'Mengembalikan detail satu lowongan berdasarkan id.',
    parameters: [
        new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
    ],
    responses: [new OA\Response(response: 200, description: 'Detail lowongan.')]
)]
#[OA\Get(
    path: '/v1/jobs/mine',
    tags: ['Lowongan Kerja'],
    operationId: 'jobsMine',
    summary: 'Lowongan milik perusahaan',
    description: 'Mengembalikan daftar lowongan yang dibuat oleh perusahaan pengguna.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Daftar lowongan milik perusahaan.')]
)]
#[OA\Post(
    path: '/v1/jobs',
    tags: ['Lowongan Kerja'],
    operationId: 'jobsStore',
    summary: 'Buat lowongan kerja',
    description: 'Membuat lowongan kerja baru.',
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['title', 'location', 'type', 'description', 'skills'],
            properties: [
                new OA\Property(property: 'title', type: 'string', maxLength: 255),
                new OA\Property(property: 'location', type: 'string'),
                new OA\Property(property: 'type', type: 'string', enum: ['magang', 'fulltime', 'parttime', 'freelance']),
                new OA\Property(property: 'description', type: 'string'),
                new OA\Property(property: 'skills', type: 'array', items: new OA\Items(type: 'string')),
                new OA\Property(property: 'deadline', type: 'string', format: 'date'),
                new OA\Property(property: 'salary', type: 'string', maxLength: 255),
            ]
        )
    ),
    responses: [
        new OA\Response(response: 201, description: 'Lowongan berhasil dibuat.'),
        new OA\Response(response: 422, description: 'Validasi gagal.'),
    ]
)]
#[OA\Put(
    path: '/v1/jobs/{id}',
    tags: ['Lowongan Kerja'],
    operationId: 'jobsUpdate',
    summary: 'Perbarui lowongan',
    description: 'Memperbarui lowongan kerja. Hanya pemilik perusahaan.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
    ],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'title', type: 'string', maxLength: 255),
                new OA\Property(property: 'location', type: 'string'),
                new OA\Property(property: 'type', type: 'string', enum: ['magang', 'fulltime', 'parttime', 'freelance']),
                new OA\Property(property: 'description', type: 'string'),
                new OA\Property(property: 'skills', type: 'array', items: new OA\Items(type: 'string')),
                new OA\Property(property: 'deadline', type: 'string', format: 'date'),
                new OA\Property(property: 'salary', type: 'string', maxLength: 255),
            ]
        )
    ),
    responses: [new OA\Response(response: 200, description: 'Lowongan berhasil diperbarui.')]
)]
#[OA\Delete(
    path: '/v1/jobs/{id}',
    tags: ['Lowongan Kerja'],
    operationId: 'jobsDelete',
    summary: 'Hapus lowongan',
    description: 'Menghapus lowongan kerja. Hanya pemilik perusahaan.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
    ],
    responses: [new OA\Response(response: 200, description: 'Lowongan berhasil dihapus.')]
)]
#[OA\Get(
    path: '/v1/jobs/applications/mine',
    tags: ['Lowongan Kerja'],
    operationId: 'jobsMyApplications',
    summary: 'Lamaran saya (siswa)',
    description: 'Mengembalikan daftar lamaran kerja yang diajukan siswa.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Daftar lamaran siswa.')]
)]
#[OA\Post(
    path: '/v1/jobs/{id}/apply',
    tags: ['Lowongan Kerja'],
    operationId: 'jobsApply',
    summary: 'Lamar sebuah lowongan',
    description: 'Mengajukan lamaran pada lowongan tertentu.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
    ],
    responses: [
        new OA\Response(response: 201, description: 'Lamaran berhasil diajukan.'),
        new OA\Response(response: 422, description: 'Gagal (mis. profil siswa tidak ditemukan).'),
    ]
)]
#[OA\Get(
    path: '/v1/jobs/{id}/applications',
    tags: ['Lowongan Kerja'],
    operationId: 'jobsApplicants',
    summary: 'Daftar pelamar lowongan',
    description: 'Mengembalikan daftar pelamar untuk suatu lowongan milik perusahaan.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
    ],
    responses: [new OA\Response(response: 200, description: 'Daftar pelamar.')]
)]
#[OA\Put(
    path: '/v1/jobs/{id}/applications/{applicationId}/status',
    tags: ['Lowongan Kerja'],
    operationId: 'jobsUpdateApplicationStatus',
    summary: 'Perbarui status lamaran',
    description: 'Menyetujui atau menolak lamaran pelamar.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
        new OA\Parameter(name: 'applicationId', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
    ],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['status'],
            properties: [
                new OA\Property(property: 'status', type: 'string', enum: ['pending', 'accepted', 'rejected']),
            ]
        )
    ),
    responses: [new OA\Response(response: 200, description: 'Status lamaran diperbarui.')]
)]
#[OA\Get(
    path: '/v1/notifications',
    tags: ['Notifikasi'],
    operationId: 'notificationsIndex',
    summary: 'Daftar notifikasi',
    description: 'Mengembalikan daftar notifikasi pengguna yang terautentikasi.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Daftar notifikasi.')]
)]
#[OA\Get(
    path: '/v1/notifications/unread-count',
    tags: ['Notifikasi'],
    operationId: 'notificationsUnreadCount',
    summary: 'Jumlah notifikasi belum dibaca',
    description: 'Mengembalikan jumlah notifikasi yang belum dibaca.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Jumlah belum dibaca.')]
)]
#[OA\Post(
    path: '/v1/notifications',
    tags: ['Notifikasi'],
    operationId: 'notificationsStore',
    summary: 'Buat notifikasi',
    description: 'Membuat notifikasi baru.',
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['text', 'type'],
            properties: [
                new OA\Property(property: 'text', type: 'string', maxLength: 500),
                new OA\Property(property: 'type', type: 'string', maxLength: 50),
                new OA\Property(property: 'role', type: 'string', enum: ['student', 'industry', 'admin']),
                new OA\Property(property: 'target_email', type: 'string', format: 'email'),
            ]
        )
    ),
    responses: [new OA\Response(response: 200, description: 'Notifikasi dibuat.')]
)]
#[OA\Post(
    path: '/v1/notifications/{id}/read',
    tags: ['Notifikasi'],
    operationId: 'notificationsMarkRead',
    summary: 'Tandai notifikasi sudah dibaca',
    description: 'Menandai satu notifikasi sudah dibaca.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
    ],
    responses: [new OA\Response(response: 200, description: 'Notifikasi ditandai sudah dibaca.')]
)]
#[OA\Post(
    path: '/v1/notifications/read-all',
    tags: ['Notifikasi'],
    operationId: 'notificationsMarkAllRead',
    summary: 'Tandai semua notifikasi sudah dibaca',
    description: 'Menandai seluruh notifikasi pengguna sudah dibaca.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Semua notifikasi ditandai sudah dibaca.')]
)]
#[OA\Get(
    path: '/v1/admins',
    tags: ['Admin'],
    operationId: 'adminsList',
    summary: 'Daftar admin',
    description: 'Mengembalikan daftar akun admin.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Daftar admin.')]
)]
#[OA\Post(
    path: '/v1/admins',
    tags: ['Admin'],
    operationId: 'adminsCreate',
    summary: 'Buat akun admin',
    description: 'Membuat akun admin baru.',
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['name', 'email', 'password'],
            properties: [
                new OA\Property(property: 'name', type: 'string', maxLength: 255),
                new OA\Property(property: 'email', type: 'string', format: 'email'),
                new OA\Property(property: 'password', type: 'string', format: 'password', minLength: 8),
            ]
        )
    ),
    responses: [
        new OA\Response(response: 201, description: 'Admin berhasil dibuat.'),
        new OA\Response(response: 422, description: 'Validasi gagal.'),
    ]
)]
#[OA\Get(
    path: '/v1/industries',
    tags: ['Admin'],
    operationId: 'industriesListForAdmin',
    summary: 'Daftar perusahaan (admin)',
    description: 'Mengembalikan daftar perusahaan untuk dikelola admin.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Daftar perusahaan.')]
)]
#[OA\Post(
    path: '/v1/industries/{email}/approval',
    tags: ['Admin'],
    operationId: 'industriesSetApproval',
    summary: 'Setujui / tolak perusahaan',
    description: 'Menyetujui atau menolak akun perusahaan.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'email', in: 'path', required: true,
            schema: new OA\Schema(type: 'string', format: 'email'), description: 'Email perusahaan.'),
    ],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['action'],
            properties: [
                new OA\Property(property: 'action', type: 'string', enum: ['approve', 'reject']),
            ]
        )
    ),
    responses: [new OA\Response(response: 200, description: 'Status perusahaan diperbarui.')]
)]
#[OA\Get(
    path: '/v1/registrations/students',
    tags: ['Registrasi Kartu'],
    operationId: 'registrationsListStudents',
    summary: 'Daftar siswa (verifikasi kartu)',
    description: 'Mengembalikan daftar siswa beserta status kartu untuk verifikasi.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Daftar siswa.')]
)]
#[OA\Post(
    path: '/v1/registrations/students/{email}/approve',
    tags: ['Registrasi Kartu'],
    operationId: 'registrationsApproveCard',
    summary: 'Setujui kartu siswa',
    description: 'Menyetujui kartu pelajar siswa sehingga akses penuh dibuka.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'email', in: 'path', required: true, schema: new OA\Schema(type: 'string', format: 'email')),
    ],
    responses: [new OA\Response(response: 200, description: 'Kartu siswa disetujui.')]
)]
#[OA\Post(
    path: '/v1/registrations/students/{email}/reject',
    tags: ['Registrasi Kartu'],
    operationId: 'registrationsRejectCard',
    summary: 'Tolak kartu siswa',
    description: 'Menolak kartu pelajar siswa.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'email', in: 'path', required: true, schema: new OA\Schema(type: 'string', format: 'email')),
    ],
    responses: [new OA\Response(response: 200, description: 'Kartu siswa ditolak.')]
)]
#[OA\Post(
    path: '/v1/registrations/students/card',
    tags: ['Registrasi Kartu'],
    operationId: 'registrationsUploadCard',
    summary: 'Unggah kartu siswa',
    description: 'Mengunggah foto kartu pelajar siswa (base64) untuk verifikasi.',
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['studentCard'],
            properties: [
                new OA\Property(property: 'studentCard', type: 'string', description: 'Data gambar base64 (jpeg/png/webp, maks 2MB).'),
            ]
        )
    ),
    responses: [
        new OA\Response(response: 200, description: 'Kartu berhasil diunggah.'),
        new OA\Response(response: 422, description: 'Validasi gagal / format gambar tidak valid.'),
    ]
)]
#[OA\Get(
    path: '/v1/students',
    tags: ['Manajemen Siswa'],
    operationId: 'studentsIndex',
    summary: 'Daftar siswa',
    description: 'Mengembalikan daftar siswa dengan paginasi dan pencarian.',
    parameters: [
        new OA\Parameter(name: 'page', in: 'query', required: false, schema: new OA\Schema(type: 'integer')),
        new OA\Parameter(name: 'per_page', in: 'query', required: false, schema: new OA\Schema(type: 'integer')),
        new OA\Parameter(name: 'search', in: 'query', required: false, schema: new OA\Schema(type: 'string')),
    ],
    responses: [new OA\Response(response: 200, description: 'Daftar siswa.')]
)]
#[OA\Get(
    path: '/v1/students/{slug}',
    tags: ['Manajemen Siswa'],
    operationId: 'studentsShow',
    summary: 'Detail siswa',
    description: 'Mengembalikan detail siswa berdasarkan slug.',
    parameters: [
        new OA\Parameter(name: 'slug', in: 'path', required: true, schema: new OA\Schema(type: 'string')),
    ],
    responses: [new OA\Response(response: 200, description: 'Detail siswa.')]
)]
#[OA\Put(
    path: '/v1/students/{email}/grade',
    tags: ['Manajemen Siswa'],
    operationId: 'studentsUpdateGrade',
    summary: 'Perbarui tingkat/kelas siswa',
    description: 'Memperbarui tingkat (kelas) seorang siswa.',
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(name: 'email', in: 'path', required: true, schema: new OA\Schema(type: 'string', format: 'email')),
    ],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['grade'],
            properties: [
                new OA\Property(property: 'grade', type: 'string', enum: ['X', 'XI', 'XII', 'Alumni']),
            ]
        )
    ),
    responses: [new OA\Response(response: 200, description: 'Tingkat berhasil diperbarui.')]
)]
#[OA\Post(
    path: '/v1/students/avatar',
    tags: ['Manajemen Siswa'],
    operationId: 'studentsUpdateAvatar',
    summary: 'Unggah avatar siswa',
    description: 'Mengunggah foto avatar siswa.',
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\MediaType(
            mediaType: 'multipart/form-data',
            schema: new OA\Schema(
                type: 'object',
                required: ['avatar'],
                properties: [
                    new OA\Property(property: 'avatar', type: 'string', format: 'binary', description: 'Berkas gambar (jpeg/png/jpg/webp, maks 2MB).'),
                ]
            )
        )
    ),
    responses: [new OA\Response(response: 200, description: 'Avatar berhasil diunggah.')]
)]
#[OA\Get(
    path: '/v1/admin/statistics',
    tags: ['Statistik'],
    operationId: 'statisticsDashboard',
    summary: 'Statistik dashboard',
    description: 'Mengembalikan statistik ringkas untuk dashboard admin.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Statistik dashboard.')]
)]
#[OA\Get(
    path: '/v1/admin/statistics/readiness',
    tags: ['Statistik'],
    operationId: 'statisticsReadinessDistribution',
    summary: 'Distribusi kesiapan kerja',
    description: 'Mengembalikan distribusi tingkat kesiapan kerja siswa.',
    security: [['sanctum' => []]],
    responses: [new OA\Response(response: 200, description: 'Distribusi kesiapan.')]
)]
final class Paths3
{
}