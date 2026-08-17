"use client";

import { BarChart3, TrendingUp, Users, Download } from "lucide-react";
import Card from "../../components/ui/card";
import SkillBarChart from "../../components/charts/barchart";
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
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Siswa</p>
              <p className="text-2xl font-bold text-foreground">{studentStats.totalStudents}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Avg Readiness</p>
              <p className="text-2xl font-bold text-foreground">{studentStats.avgReadinessScore}%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Jurusan</p>
              <p className="text-2xl font-bold text-foreground">{studentStats.readinessByMajor.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600" />
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
          <SkillBarChart
            labels={monthlyData.map((d) => d.month)}
            data={monthlyData.map((d) => d.students)}
            title="Pendaftar per Bulan"
            color="rgba(37, 99, 235, 0.8)"
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

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <SkillBarChart
            labels={studentStats.readinessByMajor.map((m) => m.major)}
            data={studentStats.readinessByMajor.map((m) => m.score)}
            title="Readiness Score per Jurusan"
            color="rgba(16, 185, 129, 0.8)"
          />
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Distribusi Readiness</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Sangat Siap (85-100%)", value: 15, color: "bg-emerald-500", max: studentStats.totalStudents },
              { label: "Siap (70-84%)", value: 35, color: "bg-blue-500", max: studentStats.totalStudents },
              { label: "Perlu Persiapan (50-69%)", value: 30, color: "bg-amber-500", max: studentStats.totalStudents },
              { label: "Mulai Belajar (<50%)", value: 20, color: "bg-red-500", max: studentStats.totalStudents },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{item.label}</span>
                  <span className="text-muted">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
