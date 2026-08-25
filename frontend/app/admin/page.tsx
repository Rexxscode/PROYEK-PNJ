"use client";

import { useState, useEffect } from "react";
import {
  Users,
  ClipboardCheck,
  TrendingUp,
  GraduationCap,
  Eye,
} from "lucide-react";
import Card from "../components/ui/card";
import Badge from "../components/ui/badge";
import ProgressBar from "../components/ui/progressbar";
import dynamic from "next/dynamic";
import DashboardHeader from "../components/layout/dashboardheader";
import { adminAPI, getStoredToken } from "../lib/api";
import { useCountUp } from "../lib/use-count-up";
import type { StudentStats } from "../lib/type";

const SkillBarChart = dynamic(() => import("../components/charts/barchart"), { ssr: false });

interface AdminStudent {
  id: string;
  name: string;
  major: string | null;
  grade: string | null;
  score: number;
  status: "assessed" | "pending";
  topCareer: string | null;
}

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");
  const [studentStats, setStudentStats] = useState<StudentStats | null>(null);
  const [recentStudents, setRecentStudents] = useState<AdminStudent[]>([]);

  useEffect(() => {
    const token = getStoredToken();
    const load = token
      ? Promise.all([adminAPI.getStats(token), adminAPI.getStudents(token)])
      : Promise.reject(new Error("Sesi tidak ditemukan"));

    load
      .then(([stats, students]) => {
        setStudentStats(stats);
        setRecentStudents(students.slice(0, 8));
        setError("");
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Gagal memuat data"))
      .finally(() => setMounted(true));
  }, []);

  const assessedPercentage = studentStats
    ? Math.round((studentStats.assessedStudents / studentStats.totalStudents) * 100)
    : 0;
  const animTotal = useCountUp(studentStats?.totalStudents ?? 0);
  const animAssessed = useCountUp(studentStats?.assessedStudents ?? 0);
  const animAvgScore = useCountUp(studentStats?.avgReadinessScore ?? 0);
  const animPercentage = useCountUp(assessedPercentage);

  if (!mounted) return null;

  if (error || !studentStats) {
    return (
      <div>
        <DashboardHeader
          title="Dashboard Admin"
          subtitle="Pantau kesiapan kerja siswa secara keseluruhan"
          role="admin"
          showNotifications
        />
        <Card className="text-center py-12">
          <p className="text-foreground font-medium">{error || "Memuat data..."}</p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader
        title="Dashboard Admin"
        subtitle="Pantau kesiapan kerja siswa secara keseluruhan"
        role="admin"
        showNotifications
      />

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-in">
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
      </div>

      <ProgressBar
        value={assessedPercentage}
        label="Progres Asesmen Siswa"
        animate
        className="mb-8"
      />

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <SkillBarChart
            labels={studentStats.topCareers.map((c) => c.name)}
            data={studentStats.topCareers.map((c) => c.count)}
            title="Top Karier Pilihan Siswa"
            color="rgba(37, 99, 235, 0.8)"
          />
        </Card>
        <Card>
          <SkillBarChart
            labels={studentStats.readinessByMajor.map((m) => m.major)}
            data={studentStats.readinessByMajor.map((m) => m.score)}
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
                <tr key={student.id} className="border-b border-border/50 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-2 font-medium text-foreground">{student.name}</td>
                  <td className="py-3 px-2 text-muted">{student.major || "-"}</td>
                  <td className="py-3 px-2">
                    {student.status === "assessed" ? (
                      <span className={`font-semibold ${student.score >= 70 ? "text-emerald-600 dark:text-emerald-400" : student.score >= 50 ? "text-amber-600 dark:text-amber-400" : "text-red-500 dark:text-red-400"}`}>
                        {student.score}%
                      </span>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant={student.status === "assessed" ? "success" : "warning"}>
                      {student.status === "assessed" ? "Dinilai" : "Belum"}
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
            <div key={student.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-foreground text-sm">{student.name}</p>
                <Badge variant={student.status === "assessed" ? "success" : "warning"}>
                  {student.status === "assessed" ? "Dinilai" : "Belum"}
                </Badge>
              </div>
              <p className="text-xs text-muted mb-1">{student.major || "-"}</p>
              {student.status === "assessed" && (
                <p className={`text-sm font-semibold ${student.score >= 70 ? "text-emerald-600 dark:text-emerald-400" : student.score >= 50 ? "text-amber-600 dark:text-amber-400" : "text-red-500 dark:text-red-400"}`}>
                  Readiness: {student.score}%
                </p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}