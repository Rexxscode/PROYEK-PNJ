<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;

class DocsController extends Controller
{
    /**
     * Menampilkan antarmuka Swagger UI dengan spesifikasi OpenAPI statis dalam Bahasa Indonesia.
     */
    public function index(Request $request): Response
    {
        return response(
            view('vendor.l5-swagger.docs', [
                'documentationTitle' => 'SkillMatch API — Dokumentasi Swagger',
                'specUrl' => url('/api/docs/openapi.yaml'),
            ])->render()
        );
    }

    /**
     * Menyajikan file OpenAPI YAML statis dalam Bahasa Indonesia.
     */
    public function spec(): Response
    {
        $yaml = File::get(base_path('docs/openapi.yaml'));

        return response($yaml, 200, [
            'Content-Type' => 'application/x-yaml; charset=utf-8',
            'Content-Disposition' => 'inline; filename="openapi.yaml"',
        ]);
    }
}