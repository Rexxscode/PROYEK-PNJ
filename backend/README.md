# SkillMatch — Backend API

REST API backend untuk platform **SkillMatch**, dibangun dengan **Laravel 13** menggunakan arsitektur Service-Repository.

## Tech Stack

| Komponen | Versi |
|---|---|
| PHP | >= 8.3 |
| Laravel | 13.17 |
| Laravel Sanctum | 4.3 (API token auth) |
| Database | MySQL / SQLite |
| API Docs | L5-Swagger (OpenAPI 3.0) |

## Persyaratan

- PHP >= 8.3 (dengan ext-mbstring, ext-openssl, ext-pdo, ext-tokenizer)
- Composer
- MySQL 8+ atau SQLite
- Node.js (opsional, untuk frontend)

## Instalasi

```bash
# Clone repo
git clone <url>
cd SKILLBRIDGE/backend

# Install dependencies
composer install

# Copy .env
cp .env.example .env

# Generate app key
php artisan key:generate

# Konfigurasi database di .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=pnj
# DB_USERNAME=root
# DB_PASSWORD=

# Jalankan migrasi
php artisan migrate

# Seed database
php artisan db:seed

# Buat storage symlink
php artisan storage:link

# Jalankan server
php artisan serve
```

Server berjalan di `http://127.0.0.1:8000`.

## Struktur Proyek

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # 16 controller (Auth, Student, Assessment, dll)
│   │   └── Middleware/        # CheckRole, CheckCardApproval
│   ├── Models/                # 17 model Eloquent
│   ├── Repositories/          # 14 repository (Repository Pattern)
│   ├── Services/              # 14 service class
│   └── Swagger/               # OpenAPI annotations (Paths.php, OpenApi.php)
├── config/
│   ├── l5-swagger.php         # Konfigurasi Swagger
│   ├── sanctum.php            # Token auth config
│   └── cors.php               # CORS config
├── database/
│   ├── migrations/            # 30 migration files
│   └── seeders/               # 10 seeder
├── docs/
│   └── openapi.yaml           # Static OpenAPI 3.0 spec (Bahasa Indonesia)
├── routes/
│   └── api.php                # Semua route API
└── tests/
    ├── Feature/               # 3 feature test
    └── Unit/                  # 1 unit test
```

## Arsitektur

Menggunakan pola **Service-Repository**:

- **Controller** → menerima request, memanggil Service
- **Service** → logika bisnis, memanggil Repository
- **Repository** → akses database via Eloquent
- **Model** → representasi tabel

## Autentikasi & Role

Autentikasi menggunakan **Laravel Sanctum** (Bearer Token). Tiga role:

| Role | Deskripsi |
|---|---|
| `student` | Siswa SMK — bisa ambil asesmen, unggah kartu, lamar kerja |
| `admin` | Admin/Guru — kelola data siswa, industri, verifikasi kartu |
| `industry` | HRD/Perusahaan — post lowongan, cari kandidat |

### Middleware

| Alias | Fungsi |
|---|---|
| `role:student` | Cek role user adalah student |
| `role:admin` | Cek role user adalah admin |
| `role:industry` | Cek role user adalah industry |
| `card.approved` | Cek kartu pelajar sudah disetujui (hanya untuk student) |

## API Endpoints

Semua endpoint diawali `/api/v1/`.

### Auth

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/v1/auth/login` | Login (throttle: 5x/menit) |
| POST | `/v1/auth/register` | Registrasi (student/industry) |
| POST | `/v1/auth/logout` | Logout (revoke token) |
| GET | `/v1/auth/me` | Data user login |
| POST | `/v1/auth/change-password` | Ganti password |
| POST | `/v1/auth/forgot-password` | Minta reset password |
| POST | `/v1/auth/reset-password` | Reset password |

### Students

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/v1/students` | Daftar siswa (paginated, searchable) |
| GET | `/v1/students/{slug}` | Detail siswa |
| PUT | `/v1/students/{email}/grade` | Update grade (admin) |
| POST | `/v1/students/avatar` | Unggah foto profil (student) |

### Assessment

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/v1/assessment/questions/{major?}` | Ambil soal asesmen |
| POST | `/v1/assessment/submit` | Submit jawaban |
| GET | `/v1/assessment/results` | Hasil asesmen |
| GET | `/v1/assessment/questions/admin/{major?}` | Soal (admin) |
| PUT | `/v1/assessment/questions` | Update soal (admin) |
| POST | `/v1/assessment/questions/reset` | Reset soal (admin) |

### Materi & Sertifikat

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/v1/materi/majors/{major}` | Daftar materi per jurusan (publik) |
| GET | `/v1/materi/{id}/questions` | Kuis materi (student) |
| POST | `/v1/materi/{id}/submit` | Submit kuis materi (student) |
| GET | `/v1/materi/{id}/questions/admin` | Soal kuis materi (admin) |
| PUT | `/v1/materi/{id}/questions` | Update soal kuis materi (admin) |
| POST | `/v1/materi/{id}/questions/reset` | Reset soal kuis materi (admin) |
| GET | `/v1/certificates` | Daftar sertifikat (student) |
| GET | `/v1/certificates/{materiId}` | Detail sertifikat (student) |

### Roadmap

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/v1/roadmap` | Milestone roadmap |
| GET | `/v1/roadmap/progress` | Progress roadmap |
| POST | `/v1/roadmap/progress` | Update progress |

### Portfolio

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/v1/portfolios/{email}/projects` | Proyek siswa |
| POST | `/v1/portfolios` | Simpan proyek |
| GET | `/v1/portfolios/public/{slug}` | Portfolio publik |

### Jobs & Applications

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/v1/jobs` | Daftar lowongan (publik) |
| GET | `/v1/jobs/{id}` | Detail lowongan |
| POST | `/v1/jobs` | Buat lowongan (industry) |
| GET | `/v1/jobs/mine` | Lowongan saya (industry) |
| PUT | `/v1/jobs/{id}` | Update lowongan (industry) |
| DELETE | `/v1/jobs/{id}` | Hapus lowongan (industry) |
| POST | `/v1/jobs/{id}/apply` | Lamar pekerjaan (student) |
| GET | `/v1/jobs/applications/mine` | Lamaran saya (student) |
| GET | `/v1/jobs/{id}/applications` | Pelamar (industry) |
| PUT | `/v1/jobs/{id}/applications/{appId}/status` | Terima/tolak pelamar |

### Admin & Industry

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/v1/admins` | Daftar admin |
| POST | `/v1/admins` | Buat admin |
| GET | `/v1/industries` | Daftar industri (admin) |
| POST | `/v1/industries/{email}/approval` | Setujui/tolak industri |
| GET | `/v1/industries/me` | Profil industri (industry) |
| GET | `/v1/industries/profile` | Profil industri (industry) |
| PUT | `/v1/industries/profile` | Update profil industri (industry) |
| PATCH | `/v1/industries/profile` | Update profil industri, parsial (industry) |
| GET | `/v1/industries/candidates` | Cari kandidat (industry) |
| GET | `/v1/majors` | Daftar jurusan (admin) |
| GET | `/v1/majors/{major}/materi` | Materi per jurusan (admin) |
| GET | `/v1/admin/statistics` | Statistik dashboard (admin) |
| GET | `/v1/admin/statistics/readiness` | Distribusi kesiapan (admin) |

### Registrations (Verifikasi Kartu)

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/v1/registrations/students` | Daftar siswa menunggu verifikasi kartu (admin) |
| POST | `/v1/registrations/students/{email}/approve` | Setujui kartu siswa (admin) |
| POST | `/v1/registrations/students/{email}/reject` | Tolak kartu siswa (admin) |
| POST | `/v1/registrations/students/card` | Unggah kartu pelajar (student) |

### Notifications

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/v1/notifications` | Daftar notifikasi |
| GET | `/v1/notifications/unread-count` | Jumlah belum dibaca |
| POST | `/v1/notifications` | Buat notifikasi (internal) |
| POST | `/v1/notifications/{id}/read` | Tandai sudah dibaca |
| POST | `/v1/notifications/read-all` | Tandai semua sudah dibaca |

### Documentation

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/docs` | Swagger UI (static YAML) |
| GET | `/api/docs/openapi.yaml` | Download OpenAPI YAML |
| GET | `/api/documentation` | L5-Swagger auto-generated docs |

## Akun Test

| Role | Email | Password |
|---|---|---|
| Student | budi@student.smk.id | Budi@2026! |
| Student | rina@student.smk.id | Rina@2026! |
| Student | hendra@student.smk.id | Hendra@2026! |
| Student | fajar@student.smk.id | Fajar@2026! |
| Student | andi@student.smk.id | Andi@2026! |
| Student | rizky@student.smk.id | Rizky@2026! |
| Student | lestari@student.smk.id | Lestari@2026! |
| Student | dedi@student.smk.id | Dedi@2026! |
| Admin | admin@smk.id | Admin@2026! |
| Industry | hrd@techcorp.com | TechCorp@2026! |
| Industry | recruit@creativestudio.com | Creative@2026! |
| Industry | info@telkom.co.id | Telkom@2026! |
| Industry | hrd@digitaloutsource.co.id | Digital@2026! |

## Database

Tabel utama:

| Tabel | Deskripsi |
|---|---|
| `users` | User accounts (dengan role: student/admin/industry) |
| `students` | Profil siswa (major, grade, avatar, card_status) |
| `industries` | Profil industri (company, status approval) |
| `majors` | Jurusan (RPL, DKV, TJKT) |
| `skills` | Skill (hard/soft) |
| `student_skills` | Pivot siswa-skill |
| `assessment_questions` | Soal asesmen per jurusan |
| `assessment_results` | Hasil asesmen siswa |
| `materi` | Materi pembelajaran |
| `materi_questions` | Soal kuis materi |
| `certificates` | Sertifikat siswa |
| `job_opportunities` | Lowongan kerja |
| `job_skills` | Pivot lowongan-skill |
| `job_applications` | Lamaran kerja |
| `roadmap_milestones` | Milestone roadmap |
| `roadmap_resources` | Resource roadmap |
| `student_roadmap_progress` | Progress roadmap siswa |
| `projects` | Proyek portfolio siswa |
| `notifications` | Notifikasi |

## Testing

```bash
# Jalankan semua test
php artisan test

# Jalankan test tertentu
php artisan test --filter=AssessmentFeatureTest
```

## API Documentation

Dokumentasi tersedia dalam dua format:

1. **Static OpenAPI YAML** (`docs/openapi.yaml`)
   - Akses via: `http://127.0.0.1:8000/api/docs`
   - Download: `http://127.0.0.1:8000/api/docs/openapi.yaml`

2. **L5-Swagger Auto-generated** (`app/Swagger/`)
   - Akses via: `http://127.0.0.1:8000/api/documentation`
   - Regenerate: `php artisan l5-swagger:generate`

## License

MIT
