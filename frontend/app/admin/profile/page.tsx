"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Mail, KeyRound, Calendar } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import { SkeletonDashboard } from "../../components/ui/skeleton";
import DashboardHeader from "../../components/layout/dashboardheader";
import { useAuth } from "../../lib/auth-context";
import ChangePasswordForm from "../../components/change-password-form";

export default function AdminProfilePage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || !user) return <div className="p-6"><SkeletonDashboard /></div>;

  return (
    <div>
      <DashboardHeader
        title="Profil Saya"
        subtitle="Informasi akun admin dan pengaturan keamanan"
        role="admin"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Info */}
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
              <p className="text-xs text-muted">{user.email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="primary">Admin / Guru</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <Mail className="w-4 h-4 text-muted flex-shrink-0" />
              <span className="text-muted break-all">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <KeyRound className="w-4 h-4 text-muted flex-shrink-0" />
              <span className="text-foreground">Akses penuh: kelola siswa, verifikasi kartu, soal, data industri, dan statistik.</span>
            </div>
            {user.created_at && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <Calendar className="w-4 h-4 text-muted flex-shrink-0" />
                <span className="text-foreground">Terdaftar sejak {new Date(user.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
            )}
          </div>
        </Card>

        <ChangePasswordForm />
      </div>
    </div>
  );
}