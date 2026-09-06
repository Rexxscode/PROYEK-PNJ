# SkillMatch — Frontend

Frontend web application untuk platform **SkillMatch**, dibangun dengan **Next.js 16** (App Router) dan **React 19**.

## Tech Stack

| Komponen | Versi |
|---|---|
| Next.js | 16.3.1 (App Router) |
| React | 19.2.8 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x (CSS-first config) |
| Chart.js | 4.5 (via react-chartjs-2) |
| Lucide React | 1.31 (icons) |
| jsPDF | 4.2 (PDF sertifikat) |

## Persyaratan

- Node.js >= 18
- npm / yarn / pnpm
- Backend SkillMatch berjalan di `http://127.0.0.1:8000`

## Instalasi

```bash
# Clone repo
git clone <url>
cd SKILLBRIDGE/frontend

# Install dependencies
npm install

# Buat .env.local
echo "NEXT_PUBLIC_API_URL=http://127.0.0.1:8000" > .env.local

# Jalankan development server
npm run dev
```

Buka `http://localhost:3000` di browser.

## Script

| Command | Deskripsi |
|---|---|
| `npm run dev` | Development server (dengan banner ASCII) |
| `npm run build` | Production build |
| `npm run start` | Jalankan production server |
| `npm run lint` | ESLint check |

## Struktur Proyek

```
frontend/
├── app/
│   ├── layout.tsx                 # Root layout (ThemeProvider > AuthProvider > ToastProvider)
│   ├── page.tsx                   # Landing page (publik)
│   ├── globals.css                # Global styles, Tailwind v4 config, animasi
│   ├── not-found.tsx              # Halaman 404
│   │
│   ├── auth/                      # Halaman autentikasi
│   │   ├── login/                 # Login (generic + per role)
│   │   └── register/              # Registrasi (student/industry)
│   │
│   ├── student/                   # Dashboard siswa
│   │   ├── layout.tsx             # Sidebar + Navbar siswa
│   │   ├── page.tsx               # Dashboard home
│   │   ├── assessment/            # Know Yourself (asesmen skill)
│   │   ├── career-match/          # Know Your Path (career matching)
│   │   ├── roadmap/               # Roadmap belajar
│   │   ├── portfolio/             # Portfolio siswa
│   │   ├── sertifikat/            # Sertifikat
│   │   ├── jobs/                  # Lowongan kerja
│   │   ├── applications/          # Lamaran saya
│   │   ├── profile/               # Profil & foto profil
│   │   └── notifications/         # Notifikasi
│   │
│   ├── admin/                     # Dashboard admin
│   │   ├── layout.tsx             # Sidebar + Navbar admin
│   │   ├── page.tsx               # Dashboard home
│   │   ├── students/              # Data siswa
│   │   ├── card-verification/     # Verifikasi kartu pelajar
│   │   ├── quiz/                  # Kelola soal (materi + jurusan)
│   │   ├── industries/            # Data industri
│   │   ├── accounts/              # Kelola akun admin
│   │   ├── statistics/            # Statistik dashboard
│   │   ├── profile/               # Profil admin
│   │   └── notifications/         # Notifikasi
│   │
│   ├── industry/                  # Dashboard industri/HRD
│   │   ├── layout.tsx             # Sidebar + Navbar industri
│   │   ├── page.tsx               # Dashboard home
│   │   ├── candidates/            # Cari kandidat
│   │   ├── my-jobs/               # Lowongan saya
│   │   ├── post-job/              # Buat lowongan
│   │   └── profile/               # Profil industri
│   │
│   ├── portfolio/                 # Portfolio publik
│   │   └── [slug]/                # Portfolio berdasarkan slug
│   │
│   └── lib/                       # Business logic & utilities
│       ├── api.ts                 # HTTP client (fetch-based)
│       ├── api-contract.ts        # Endpoint URLs & types
│       ├── auth-context.tsx       # Auth state management
│       ├── theme-context.tsx      # Dark/light theme
│       ├── toast-context.tsx      # Toast notifications
│       ├── type.ts                # TypeScript types
│       └── utils.ts               # Utility functions
│
├── app/components/
│   ├── layout/                    # Layout components
│   │   ├── navbar.tsx             # Navbar landing page
│   │   ├── sidebar.tsx            # Sidebar dashboard (per role)
│   │   ├── dashboard-navbar.tsx   # Top navbar dashboard
│   │   └── dashboardheader.tsx    # Header component
│   │
│   ├── ui/                        # UI primitives
│   │   ├── badge.tsx, card.tsx    # Badge, Card
│   │   ├── skeleton.tsx           # Loading skeleton
│   │   ├── confirm-dialog.tsx     # Modal konfirmasi
│   │   ├── progressbar.tsx        # Progress bar
│   │   ├── counter.tsx            # Animated counter
│   │   └── reveal.tsx             # Scroll-reveal animation
│   │
│   ├── charts/                    # Chart components
│   │   ├── barchart.tsx           # Bar chart
│   │   ├── linechart.tsx          # Line chart
│   │   └── skillradar.tsx         # Radar chart (skill)
│   │
│   ├── auth-guard.tsx             # Route protection (role-based)
│   ├── student-card-gate.tsx      # Gate fitur di belakang verifikasi kartu
│   └── change-password-form.tsx   # Form ganti password
│
├── public/                        # Static assets
│   ├── logo-skillmatch-baru.png
│   └── certificates/              # Template sertifikat
│
└── scripts/
    └── skillmatch-banner.mjs      # ASCII banner untuk dev server
```

## Fitur Utama

### Tiga Role Pengguna

| Role | Fitur |
|---|---|
| **Student** | Asesmen skill, career matching, roadmap belajar, materi & sertifikat, portfolio, lamar kerja |
| **Admin** | Kelola siswa, verifikasi kartu, kelola soal, kelola industri, statistik |
| **Industry** | Cari kandidat, post lowongan, kelola lamaran |

### Halaman Publik

- **Landing page** (`/`) — marketing page dengan statistik, fitur, CTA
- **Login/Register** — form autentikasi per role
- **Portfolio publik** (`/portfolio/{slug}`)

### Dashboard Siswa

- **Know Yourself** — asesmen 100 soal per jurusan
- **Know Your Path** — career matching dengan match percentage
- **Roadmap Belajar** — milestone 3 tier (fundamental → intermediate → advanced)
- **Portfolio** — CRUD proyek
- **Sertifikat** — PDF sertifikat via jsPDF
- **Lowongan** — browse & lamar pekerjaan

### State Management

Tiga React Context:

1. **AuthProvider** — autentikasi, user state, token management
2. **ThemeProvider** — dark/light mode (View Transitions API)
3. **ToastProvider** — notifikasi toast (success/error/warning/info)

### Styling

- **Tailwind CSS v4** dengan CSS-first configuration (`globals.css`)
- Custom CSS variables untuk light/dark mode
- Custom animasi: `fadeIn`, `slideIn`, `reveal`, `hover-lift`
- `prefers-color-scheme` sebagai default theme
- `prefers-reduced-motion` dihormati

## Environment Variables

| Variable | Default | Deskripsi |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://127.0.0.1:8000` | Backend API base URL |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Frontend base URL (SEO, sitemap) |

## Koneksi ke Backend

Frontend menghubungi backend via REST API:

```typescript
// app/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
```

Semua request menggunakan Bearer token dari localStorage (`auth_token`). 401 response otomatis redirect ke login.

## Testing

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint
```

## Build & Deploy

```bash
# Production build
npm run build

# Jalankan production server
npm run start
```

## License

MIT
