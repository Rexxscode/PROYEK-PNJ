"use client";

import { useState, useEffect } from "react";
import {
  Users,
  ClipboardCheck,
  TrendingUp,
  GraduationCap,
  Eye,
  Building2,
  IdCard,
} from "lucide-react";
import Card from "../components/ui/card";
import Badge from "../components/ui/badge";
import ProgressBar from "../components/ui/progressbar";
import { SkeletonDashboard } from "../components/ui/skeleton";
import dynamic from "next/dynamic";
import DashboardHeader from "../components/layout/dashboardheader";
import { api, BACKEND_ENDPOINTS } from "../lib/api";
import { useCountUp } from "../lib/use-count-up";

const SkillBarChart = dynamic(() => import("../components/charts/barchart"), { ssr: false });

type DashboardStats = {
  totalStudents: number;
  assessedStudents: number;
  assessedPercentage: number;
  avgReadinessScore: number;
  totalIndustries: number;
  pendingIndustries: number;
  pendingCards: number;
  topCareers: { name: string; count: number }[];
  readinessByMajor: { major: string; score: number }[];
  monthlyRegistrations: { month: string; count: number }[];
};

type StudentRow = {
  name: string;
  email: string;
  major: string;
  readiness: number;
  assessed: boolean;
};

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentStudents, setRecentStudents] = useState<StudentRow[]>([]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, studentsRes] = await Promise.all([
          api.get<{ success: boolean; data: DashboardStats }>(BACKEND_ENDPOINTS.statistics.dashboard),
          api.get<{
            success: boolean;
            data: { name: string; user?: { email?: string } | null; major?: { name?: string } | null; readiness?: number | null; assessed?: boolean | null }[];
          }>(BACKEND_ENDPOINTS.students.list),
        ]);
        if (statsRes.success) setStats(statsRes.data);
        if (studentsRes.success) {
          setRecentStudents(studentsRes.data.map((s) => ({
            name: s.name ?? "",
            email: s.user?.email ?? "",
            major: s.major?.name ?? "-",
            readiness: s.readiness ?? (s.assessed ? 0 : 0),
            assessed: !!s.assessed,
          })));
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (!mounted || loading) return <div className="p-6 lg:pl-72"><SkeletonDashboard /></div>;

  const statsValue = stats || {
    totalStudents: 0,
    assessedStudents: 0,
    assessedPercentage: 0,
    avgReadinessScore: 0,
    totalIndustries: 0,
    pendingIndustries: 0,
    pendingCards: 0,
    topCareers: [],
    readinessByMajor: [],
    monthlyRegistrations: [],
  };

  const assessedPercentage = statsValue.totalStudents ? Math.round((statsValue.assessedStudents / statsValue.totalStudents) * 100) : 0;
  const pendingIndustries = statsValue.pendingIndustries;
  const pendingCards = statsValue.pendingCards;
  const animTotal = useCountUp(statsValue.totalStudents);
  const animAssessed = useCountUp(statsValue.assessedStudents);
  const animAvgScore = useCountUp(statsValue.avgReadinessScore);
  const animPercentage = useCountUp(assessedPercentage);
  const animIndustries = useCountUp(statsValue.totalIndustries);

  return (
    <div>
      <DashboardHeader
        title="Dashboard Admin"
        subtitle="Pantau kesiapan kerja siswa secara keseluruhan"
        role="admin"
        showNotifications
      />

      {/* Pending Industry Alert */}
      {pendingIndustries > 0 && (
        <a href="/admin/industries" className="block mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center animate-pulse">
              <Building2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                {pendingIndustries} akun industry menunggu persetujuan
              </p>
              <p className="text-xs text-amber-600/70 dark:text-amber-400/70">Klik untuk meninjau dan menyetujui</p>
            </div>
          </div>
        </a>
      )}

      {/* Pending Student Card Alert */}
      {pendingCards > 0 && (
        <a href="/admin/card-verification" className="block mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center animate-pulse">
              <IdCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                {pendingCards} siswa mengirim kartu pelajar menunggu verifikasi
              </p>
              <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70">Klik untuk memverifikasi kartu pelajar</p>
            </div>
          </div>
        </a>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 stagger-in">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Siswa</p>
              <p className="text-2xl font-bold text-foreground">{animTotal}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Sudah Dinilai</p>
              <p className="text-2xl font-bold text-foreground">{animAssessed}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Avg Readiness</p>
              <p className="text-2xl font-bold text-foreground">{animAvgScore}%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted">% Dinilai</p>
              <p className="text-2xl font-bold text-foreground">{animPercentage}%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Industry</p>
              <p className="text-2xl font-bold text-foreground">{animIndustries}</p>
            </div>
          </div>
        </Card>
      </div>

      <ProgressBar
        value={assessedPercentage}
        label="Progres Asesmen Siswa"
        animate
        className="mb-8"
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <SkillBarChart
            labels={statsValue.topCareers.map((c) => c.name)}
            data={statsValue.topCareers.map((c) => c.count)}
            title="Top Karier Pilihan Siswa"
            color="rgba(37, 99, 235, 0.8)"
          />
        </Card>
        <Card>
          <SkillBarChart
            labels={statsValue.readinessByMajor.map((m) => m.major)}
            data={statsValue.readinessByMajor.map((m) => m.score)}
            title="Readiness Score per Jurusan"
            color="rgba(124, 58, 237, 0.8)"
          />
        </Card>
      </div>

      {/* Recent Students */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Data Siswa Terbaru</h3>
          <a href="/admin/students" className="text-sm text-primary hover:text-primary-dark flex items-center gap-1">
            Lihat semua <Eye className="w-3 h-3" />
          </a>
        </div>

        {recentStudents.length === 0 ? (
          <div className="text-center py-10 text-sm text-muted">Belum ada data siswa.</div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium text-muted">Nama</th>
                    <th className="text-left py-3 px-2 font-medium text-muted">Jurusan</th>
                    <th className="text-left py-3 px-2 font-medium text-muted">Readiness</th>
                    <th className="text-left py-3 px-2 font-medium text-muted">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((student) => (
                    <tr key={student.email} className="border-b border-border/50 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3 px-2 font-medium text-foreground">{student.name}</td>
                      <td className="py-3 px-2 text-muted">{student.major}</td>
                      <td className="py-3 px-2">
                        {student.assessed ? (
                          <span className={`font-semibold ${student.readiness >= 70 ? "text-emerald-600 dark:text-emerald-400" : student.readiness >= 50 ? "text-amber-600 dark:text-amber-400" : "text-red-500 dark:text-red-400"}`}>
                            {student.readiness}%
                          </span>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={student.assessed ? "success" : "warning"}>
                          {student.assessed ? "Dinilai" : "Belum"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden space-y-3">
              {recentStudents.map((student) => (
                <div key={student.email} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-foreground text-sm">{student.name}</p>
                    <Badge variant={student.assessed ? "success" : "warning"}>
                      {student.assessed ? "Dinilai" : "Belum"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted mb-1">{student.major}</p>
                  {student.assessed && (
                    <p className={`text-sm font-semibold ${student.readiness >= 70 ? "text-emerald-600 dark:text-emerald-400" : student.readiness >= 50 ? "text-amber-600 dark:text-amber-400" : "text-red-500 dark:text-red-400"}`}>
                      Readiness: {student.readiness}%
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}