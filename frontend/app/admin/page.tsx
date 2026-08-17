"use client";

import {
  Users,
  ClipboardCheck,
  TrendingUp,
  GraduationCap,
  Eye,
  Search,
} from "lucide-react";
import Card from "../components/ui/card";
import Badge from "../components/ui/badge";
import ProgressBar from "../components/ui/progressbar";
import SkillBarChart from "../components/charts/barchart";
import DashboardHeader from "../components/layout/dashboardheader";
import { studentStats } from "../lib/mock-data";
import { getReadinessLabel } from "../lib/utils";

const recentStudents = [
  { name: "Budi Santoso", major: "Rekayasa Perangkat Lunak", score: 72, status: "assessed" },
  { name: "Rina Wulandari", major: "Desain Komunikasi Visual", score: 85, status: "assessed" },
  { name: "Dedi Kurniawan", major: "Teknik Komputer dan Jaringan", score: 58, status: "assessed" },
  { name: "Siti Nurhaliza", major: "Teknik Transmisi", score: 65, status: "pending" },
  { name: "Andi Pratama", major: "Rekayasa Perangkat Lunak", score: 91, status: "assessed" },
  { name: "Maya Putri", major: "Desain Komunikasi Visual", score: 0, status: "pending" },
  { name: "Rizky Aditya", major: "Rekayasa Perangkat Lunak", score: 78, status: "assessed" },
  { name: "Diana Sari", major: "Teknik Transmisi", score: 0, status: "pending" },
];

export default function AdminDashboard() {
  const assessedPercentage = Math.round((studentStats.assessedStudents / studentStats.totalStudents) * 100);

  return (
    <div>
      <DashboardHeader
        title="Dashboard Admin"
        subtitle="Pantau kesiapan kerja siswa secara keseluruhan"
        role="admin"
      />

      {/* Stats Grid */}
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
              <ClipboardCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Sudah Dinilai</p>
              <p className="text-2xl font-bold text-foreground">{studentStats.assessedStudents}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600" />
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
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted">% Dinilai</p>
              <p className="text-2xl font-bold text-foreground">{assessedPercentage}%</p>
            </div>
          </div>
        </Card>
      </div>

      <ProgressBar
        value={assessedPercentage}
        label="Progres Asesmen Siswa"
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

      {/* Recent Students Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Data Siswa Terbaru</h3>
          <a href="/admin/students" className="text-sm text-primary hover:text-primary-dark flex items-center gap-1">
            Lihat semua <Eye className="w-3 h-3" />
          </a>
        </div>
        <div className="overflow-x-auto">
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
                <tr key={student.name} className="border-b border-border/50 hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium text-foreground">{student.name}</td>
                  <td className="py-3 px-2 text-muted">{student.major}</td>
                  <td className="py-3 px-2">
                    {student.status === "assessed" ? (
                      <span className={`font-semibold ${student.score >= 70 ? "text-emerald-600" : student.score >= 50 ? "text-amber-600" : "text-red-500"}`}>
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
      </Card>
    </div>
  );
}