<?php

namespace App\Swagger;

use OpenApi\Attributes as OA;

/**
 * Definisi spesifikasi OpenAPI (Swagger) untuk API SkillMatch.
 *
 * File ini berisi annotasi (attributes) yang dipindai oleh l5-swagger / swagger-php
 * untuk menghasilkan dokumentasi otomatis pada UI /api/documentation.
 * Deskripsi ditulis dalam Bahasa Indonesia (semi-teknis).
 */
#[OA\Info(
    title: 'SkillMatch API — Dokumentasi Swagger',
    version: '1.0.0',
    description: "Dokumentasi REST API resmi untuk platform SkillMatch (Platform Kesiapan Kerja Siswa SMK).\n\n" .
        "Layanan: Autentikasi, Jurusan, Asesmen, Materi, Sertifikat, Roadmap, Portofolio, Industri, Lowongan Kerja, Notifikasi, dan Admin.\n\n" .
        "Autentikasi menggunakan Bearer Token (Sanctum). Setelah login, gunakan tombol Authorize dan isi token dengan format: Bearer <token>.",
    contact: new OA\Contact(name: 'Tim SkillMatch'),
)]
#[OA\Server(
    url: '/api',
    description: 'Server API default (prefix /api)',
)]
#[OA\SecurityScheme(
    securityScheme: 'sanctum',
    type: 'apiKey',
    in: 'header',
    name: 'Authorization',
    description: 'Masukkan token dengan format: Bearer <token>',
)]
#[OA\Tag(
    name: 'Autentikasi',
    description: 'Endpoint untuk login, registrasi, logout, dan manajemen kata sandi.',
)]
#[OA\Tag(
    name: 'Asesmen',
    description: 'Soal asesmen kesiapan kerja dan pengiriman jawaban.',
)]
#[OA\Tag(
    name: 'Materi',
    description: 'Materi belajar dan quiz per materi.',
)]
#[OA\Tag(
    name: 'Lowongan Kerja',
    description: 'CRUD lowongan, lamaran siswa, dan pelamar.',
)]
final class OpenApi
{
}