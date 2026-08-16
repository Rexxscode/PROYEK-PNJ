# PROYEK-PNJ

Monorepo untuk proyek Politeknik Negeri Jakarta (PNJ) yang terdiri dari **Frontend** (Next.js) dan **Backend** (Laravel).

## Teknologi

| Bagian | Teknologi | Versi |
| ------ | --------- | ----- |
| Frontend | [Next.js](https://nextjs.org/) + TypeScript + Tailwind CSS | Next.js 15+ |
| Backend | [Laravel](https://laravel.com/) | Laravel 13 |
| Database | SQLite (default) / MySQL | - |

## Struktur Proyek

```
PROYEK-PNJ/
├── frontend/   # Next.js (React, TypeScript, Tailwind)
├── backend/    # Laravel (REST API)
└── README.md
```

## Prasyarat

Sebelum menjalankan proyek, pastikan tools berikut sudah terinstal:

- [Node.js](https://nodejs.org/) v18+ dan npm
- [PHP](https://www.php.net/) v8.2+
- [Composer](https://getcomposer.org/)
- [Git](https://git-scm.com/)

## Instalasi

### 1. Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env       # Windows: copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve          # Server berjalan di http://localhost:8000
```

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev                # Server berjalan di http://localhost:3000
```

> **Catatan:** Atur URL API backend pada file `.env.local` di folder `frontend`
> (buat jika belum ada):

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Perintah Penting

| Aksi | Frontend | Backend |
| ---- | -------- | ------- |
| Menjalankan dev server | `npm run dev` | `php artisan serve` |
| Build produksi | `npm run build` | - |
| Lint | `npm run lint` | - |
| Migrasi database | - | `php artisan migrate` |
| Seeder data | - | `php artisan db:seed` |

## Keamanan

- File `.env` (backend) dan `.env.local` (frontend) **tidak pernah dikomit** ke repository.
- Selalu gunakan `php artisan key:generate` setelah menyalin `.env`.
- Jangan pernah memasukkan kredensial, API key, atau token ke dalam source code.

## Lisensi

MIT
