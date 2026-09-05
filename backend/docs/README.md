# Dokumentasi API (Swagger) — SkillMatch

Dokumentasi REST API SkillMatch disediakan dalam dua bentuk yang saling melengkapi.
Entri bahasa Indonesia (semi-teknis), mencakup seluruh endpoint versi `v1`.

## Cara mengakses

Jalankan backend, lalu buka di browser:

| Uraian | URL |
| --- | --- |
| **Dokumentasi statis (YAML) — Swagger UI** | `/api/docs` |
| Sumber YAML (dapat diunduh) | `/api/docs/openapi.yaml` |
| **Dokumentasi otomatis l5-swagger** | `/api/documentation` |

Contoh bila backend berjalan di `php artisan serve` dengan port 8000:
- `http://127.0.0.1:8000/api/docs`
- `http://127.0.0.1:8000/api/documentation`

## Autentikasi

Sebagian besar endpoint memerlukan **Bearer Token** (Laravel Sanctum).
Pada Swagger UI, klik **Authorize**, lalu isi dengan:
```
Bearer <token>
```
Token diperoleh dari endpoint `POST /v1/auth/login`.

## Isi berkas ini

- `openapi.yaml` — spesifikasi OpenAPI 3.0 lengkap (semua endpoint), menjadi sumber
  untuk halaman `/api/docs`. Ditulis manual dan divalidasi.
- `/api/documentation` — dokumentasi yang dihasilkan otomatis oleh `l5-swagger`
  dari annotasi PHP (attributes) pada:
  - `app/Swagger/OpenApi.php` — info, tag, dan security scheme.
  - `app/Swagger/Paths.php`, `Paths2.php`, `Paths3.php` — definisi seluruh path.

## Cara memperbarui / men-generate ulang

Setelah mengubah annotasi di `app/Swagger/`, jalankan:

```bash
# dari direktori backend
php artisan l5-swagger:generate
```

Hasil generate tersimpan di `storage/api-docs/api-docs.json` dan disajikan oleh
l5-swagger (`/api/documentation`). Jika `generate_always=true`, dokumen otomatis
diperbarui pada setiap permintaan selama mode dev (lihat `config/l5-swagger.php`).

Untuk memperbarui dokumentasi statis, edit `docs/openapi.yaml` langsung.

## Catatan

- Spesifikasi OpenAPI keduanya mereferensikan **server default `/api`** (prefix
  seluruh rute API). Otorisasi memakai skema keamanan bernama `sanctum`.
- Simpan file YAML tetap valid YAML; gunakan parser/validator saat mengubahnya.