"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Building2, ShieldCheck } from "lucide-react";

const roleOptions = [
  {
    role: "student" as const,
    title: "Siswa / SMK",
    desc: "Asesmen skill, sertifikat, roadmap, dan lowongan kerja.",
    icon: GraduationCap,
  },
  {
    role: "industry" as const,
    title: "Perusahaan / Industry",
    desc: "Posting lowongan dan cari kandidat sesuai kebutuhan.",
    icon: Building2,
  },
  {
    role: "admin" as const,
    title: "Admin",
    desc: "Kelola siswa, industri, soal, dan verifikasi akun.",
    icon: ShieldCheck,
  },
];

export default function LoginRoleSelect() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/5 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <img src="/logo-skillmatch-baru.png" alt="SkillMatch" className="w-10 h-10 rounded-xl object-contain" />
            <span className="text-2xl font-bold text-primary">
              SkillMatch
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Masuk</h1>
          <p className="text-sm text-muted mt-2">Pilih peran kamu untuk melanjutkan login.</p>
        </div>

        <div className="flex flex-col gap-3">
          {roleOptions.map((opt) => (
            <button
              key={opt.role}
              type="button"
              onClick={() => router.push(`/auth/login/${opt.role}`)}
              className="w-full flex items-center gap-4 bg-card border border-border rounded-2xl p-4 text-left hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <opt.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground">{opt.title}</p>
                <p className="text-sm text-muted truncate">{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted">
            Belum punya akun?{" "}
            <Link href="/auth/register" className="font-medium text-primary hover:text-primary-dark transition-colors">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}