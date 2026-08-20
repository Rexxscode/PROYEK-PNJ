"use client";

import { BarChart3, TrendingUp, Users, Download } from "lucide-react";
import Card from "../../components/ui/card";
import SkillBarChart from "../../components/charts/barchart";
import DoughnutChart from "../../components/charts/doughnutchart";
import LineChart from "../../components/charts/linechart";
import SkillRadar from "../../components/charts/skillradar";
import DashboardHeader from "../../components/layout/dashboardheader";
import { studentStats } from "../../lib/mock-data";

const monthlyData = [
  { month: "Jan", students: 12 },
  { month: "Feb", students: 18 },
  { month: "Mar", students: 25 },
  { month: "Apr", students: 32 },
  { month: "Mei", students: 28 },
  { month: "Jun", students: 35 },
];

export default function StatisticsPage() {
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
            data={[15, 35, 30, 20]}
            title="Distribusi Readiness"
            colors={["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]}
            centerLabel="100%"
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
