"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users } from "lucide-react";
import Card from "../../components/ui/card";
import dynamic from "next/dynamic";
import DashboardHeader from "../../components/layout/dashboardheader";
import { getStudentStats, getAllStudentsList, getStudentReadiness } from "../../lib/mock-data";

const SkillBarChart = dynamic(() => import("../../components/charts/barchart"), { ssr: false });
const LineChart = dynamic(() => import("../../components/charts/linechart"), { ssr: false });

const monthlyData = [
  { month: "Jan", students: 12 },
  { month: "Feb", students: 18 },
  { month: "Mar", students: 25 },
  { month: "Apr", students: 32 },
  { month: "Mei", students: 28 },
  { month: "Jun", students: 35 },
];

function getReadinessDistribution() {
  const allStudents = getAllStudentsList();
  const tierKeys = ["Siap Kerja (85-100%)", "Hampir Siap (70-84%)", "Berkembang (50-69%)", "Eksplorasi (0-49%)"] as const;
  const tierCounts: Record<(typeof tierKeys)[number], number> = { "Siap Kerja (85-100%)": 0, "Hampir Siap (70-84%)": 0, "Berkembang (50-69%)": 0, "Eksplorasi (0-49%)": 0 };
  allStudents.forEach((s) => {
    const avg = getStudentReadiness(s.email);
    if (avg === null) return;
    if (avg >= 85) tierCounts["Siap Kerja (85-100%)"]++;
    else if (avg >= 70) tierCounts["Hampir Siap (70-84%)"]++;
    else if (avg >= 50) tierCounts["Berkembang (50-69%)"]++;
    else tierCounts["Eksplorasi (0-49%)"]++;
  });
  return tierCounts;
}

export default function StatisticsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const stats = getStudentStats();
  const distribution = getReadinessDistribution();
  const distLabels = Object.keys(distribution);
  const distData = Object.values(distribution);

  if (!mounted) return <div className="min-h-[300px]" />

  return (
    <div>
      <DashboardHeader
        title="Statistik"
        subtitle="Analisis data kesiapan kerja siswa"
        role="admin"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Siswa</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalStudents}</p>
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
              <p className="text-2xl font-bold text-foreground">{stats.avgReadinessScore}%</p>
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
              <p className="text-2xl font-bold text-foreground">{stats.readinessByMajor.length}</p>
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
              <p className="text-2xl font-bold text-foreground">{stats.topCareers.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <LineChart
            labels={monthlyData.map((d) => d.month)}
            datasets={[{ label: "Pendaftar", data: monthlyData.map((d) => d.students), fill: true }]}
            title="Pendaftar per Bulan"
          />
        </Card>
        <Card>
          <SkillBarChart
            labels={stats.topCareers.map((c) => c.name)}
            data={stats.topCareers.map((c) => c.count)}
            title="Top Karier Pilihan Siswa"
            color="rgba(124, 58, 237, 0.8)"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <SkillBarChart
            labels={stats.readinessByMajor.map((m) => m.major)}
            data={stats.readinessByMajor.map((m) => m.score)}
            title="Readiness Score per Jurusan"
            color="rgba(16, 185, 129, 0.8)"
          />
        </Card>
        <Card>
          <SkillBarChart
            labels={distLabels}
            data={distData}
            title="Distribusi Readiness Siswa"
            color="rgba(245, 158, 11, 0.8)"
          />
        </Card>
        <Card>
          <SkillBarChart
            labels={stats.readinessByMajor.map((m) => m.major)}
            data={stats.readinessByMajor.map((m) => m.score)}
            title="Readiness per Jurusan"
            color="rgba(37, 99, 235, 0.8)"
          />
        </Card>
      </div>
    </div>
  );
}
