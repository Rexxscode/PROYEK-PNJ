"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users } from "lucide-react";
import Card from "../../components/ui/card";
import dynamic from "next/dynamic";
import DashboardHeader from "../../components/layout/dashboardheader";
import { adminAPI, getStoredToken } from "../../lib/api";
import type { StudentStats } from "../../lib/type";

const SkillBarChart = dynamic(() => import("../../components/charts/barchart"), { ssr: false });
const DoughnutChart = dynamic(() => import("../../components/charts/doughnutchart"), { ssr: false });
const LineChart = dynamic(() => import("../../components/charts/linechart"), { ssr: false });
const SkillRadar = dynamic(() => import("../../components/charts/skillradar"), { ssr: false });

interface AdminStudent {
  id: string;
  name: string;
  score: number;
  status: "assessed" | "pending";
}

const monthlyData = [
  { month: "Jan", students: 12 },
  { month: "Feb", students: 18 },
  { month: "Mar", students: 25 },
  { month: "Apr", students: 32 },
  { month: "Mei", students: 28 },
  { month: "Jun", students: 35 },
];

function readinessDistribution(students: AdminStudent[]): [number, number, number, number] {
  const assessed = students.filter((s) => s.status === "assessed");
  return [
    assessed.filter((s) => s.score >= 80).length,
    assessed.filter((s) => s.score >= 60 && s.score < 80).length,
    assessed.filter((s) => s.score >= 40 && s.score < 60).length,
    assessed.filter((s) => s.score < 40).length,
  ];
}

export default function StatisticsPage() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");
  const [studentStats, setStudentStats] = useState<StudentStats | null>(null);
  const [students, setStudents] = useState<AdminStudent[]>([]);

  useEffect(() => {
    const token = getStoredToken();
    const load = token
      ? Promise.all([adminAPI.getStats(token), adminAPI.getStudents(token)])
      : Promise.reject(new Error("Sesi tidak ditemukan"));

    load
      .then(([stats, list]) => {
        setStudentStats(stats);
        setStudents(list);
        setError("");
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Gagal memuat data"))
      .finally(() => setMounted(true));
  }, []);

  if (!mounted || !studentStats) {
    return (
      <div>
        <DashboardHeader title="Statistik" subtitle="Analisis data kesiapan kerja siswa" role="admin" />
        <Card className="text-center py-12">
          <p className="text-foreground font-medium">{error || "Memuat data..."}</p>
        </Card>
      </div>
    );
  }

  const distribution = readinessDistribution(students);
  const totalAssessed = distribution.reduce((a, b) => a + b, 0);

  return (
    <div>
      <DashboardHeader
        title="Statistik"
        subtitle="Analisis data kesiapan kerja siswa"
        role="admin"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Siswa</p>
              <p className="text-2xl font-bold text-foreground">{studentStats.totalStudents}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Avg Readiness</p>
              <p className="text-2xl font-bold text-foreground">{studentStats.avgReadinessScore}%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Jurusan</p>
              <p className="text-2xl font-bold text-foreground">{studentStats.readinessByMajor.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Karier Populer</p>
              <p className="text-2xl font-bold text-foreground">{studentStats.topCareers.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <LineChart
            labels={monthlyData.map((d) => d.month)}
            datasets={[{ label: "Pendaftar", data: monthlyData.map((d) => d.students), fill: true }]}
            title="Pendaftar per Bulan"
          />
        </Card>
        <Card>
          <SkillBarChart
            labels={studentStats.topCareers.map((c) => c.name)}
            data={studentStats.topCareers.map((c) => c.count)}
            title="Top Karier Pilihan Siswa"
            color="rgba(124, 58, 237, 0.8)"
          />
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <SkillBarChart
            labels={studentStats.readinessByMajor.map((m) => m.major)}
            data={studentStats.readinessByMajor.map((m) => m.score)}
            title="Readiness Score per Jurusan"
            color="rgba(16, 185, 129, 0.8)"
          />
        </Card>
        <Card>
          <DoughnutChart
            labels={["Sangat Siap", "Siap", "Perlu Persiapan", "Mulai Belajar"]}
            data={distribution}
            title="Distribusi Readiness"
            colors={["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]}
            centerLabel={`${totalAssessed}`}
          />
        </Card>
        <Card>
          <SkillRadar
            skills={studentStats.readinessByMajor.map((m) => ({
              id: m.major,
              name: m.major.split(" ").slice(0, 2).join(" "),
              category: "hard" as const,
              level: m.score,
            }))}
            title="Readiness per Jurusan"
            max={100}
            color="rgba(16, 185, 129, 0.8)"
          />
        </Card>
      </div>
    </div>
  );
}
