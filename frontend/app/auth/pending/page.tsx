"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";

function PendingContent() {
  const params = useSearchParams();
  const role = params.get("role");

  const isStudent = role !== "industry";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Menunggu Persetujuan</h1>
          <p className="text-sm text-muted mb-6">
            {isStudent
              ? "Akun siswa kamu sudah berhasil dibuat dan sedang menunggu persetujuan dari admin sebelum kamu bisa masuk."
              : "Akun perusahaan kamu sudah berhasil dibuat. Saat ini sedang menunggu persetujuan dari admin untuk dapat mengakses platform."}
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {isStudent
                ? "Admin akan meninjau dan menyetujui akun kamu. Setelah disetujui, masuk dan unggah kartu pelajar di halaman Profil agar fitur asesmen, sertifikat, dan lowongan terbuka."
                : "Admin akan meninjau dan menyetujui akun kamu. Setelah disetujui, kamu bisa masuk menggunakan email dan password yang sudah didaftarkan."}
            </p>
          </div>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PendingPage() {
  return (
    <Suspense fallback={null}>
      <PendingContent />
    </Suspense>
  );
}