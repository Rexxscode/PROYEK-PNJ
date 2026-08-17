"use client";

import { useState } from "react";
import { Search, Eye, Filter } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import DashboardHeader from "../../components/layout/dashboardheader";

const allStudents = [
  { name: "Budi Santoso", major: "Rekayasa Perangkat Lunak", grade: "XII", score: 72, status: "assessed", topCareer: "Backend Developer" },
  { name: "Rina Wulandari", major: "Desain Komunikasi Visual", grade: "XII", score: 85, status: "assessed", topCareer: "Frontend Developer" },
  { name: "Dedi Kurniawan", major: "Teknik Komputer dan Jaringan", grade: "XI", score: 58, status: "assessed", topCareer: "Data Analyst" },
  { name: "Siti Nurhaliza", major: "Teknik Transmisi", grade: "XII", score: 0, status: "pending", topCareer: "-" },
  { name: "Andi Pratama", major: "Rekayasa Perangkat Lunak", grade: "XI", score: 91, status: "assessed", topCareer: "Frontend Developer" },
  { name: "Rizky Aditya", major: "Rekayasa Perangkat Lunak", grade: "XII", score: 78, status: "assessed", topCareer: "Fullstack Developer" },
  { name: "Diana Sari", major: "Teknik Transmisi", grade: "XI", score: 0, status: "pending", topCareer: "-" },
  { name: "Fajar Nugroho", major: "Teknik Komputer dan Jaringan", grade: "XII", score: 67, status: "assessed", topCareer: "Backend Developer" },
  { name: "Lestari Wijaya", major: "Rekayasa Perangkat Lunak", grade: "XI", score: 83, status: "assessed", topCareer: "Frontend Developer" },
  { name: "Putri Ayu", major: "Desain Komunikasi Visual", grade: "XI", score: 0, status: "pending", topCareer: "-" },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [majorFilter, setMajorFilter] = useState("all");

  const filtered = allStudents.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesMajor = majorFilter === "all" || s.major === majorFilter;
    return matchesSearch && matchesMajor;
  });

  const majors = [...new Set(allStudents.map((s) => s.major))];

  return (
    <div>
        <DashboardHeader
          title="Data Siswa"
          subtitle="Daftar semua siswa yang terdaftar di platform"
          role="admin"
        />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Cari nama siswa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <select
          value={majorFilter}
          onChange={(e) => setMajorFilter(e.target.value)}
          className="px-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
        >
          <option value="all">Semua Jurusan</option>
          {majors.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 font-medium text-muted">No</th>
                <th className="text-left py-3 px-3 font-medium text-muted">Nama</th>
                <th className="text-left py-3 px-3 font-medium text-muted">Jurusan</th>
                <th className="text-left py-3 px-3 font-medium text-muted">Kelas</th>
                <th className="text-left py-3 px-3 font-medium text-muted">Readiness</th>
                <th className="text-left py-3 px-3 font-medium text-muted">Top Karier</th>
                <th className="text-left py-3 px-3 font-medium text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, index) => (
                <tr key={student.name} className="border-b border-border/50 hover:bg-gray-50">
                  <td className="py-3 px-3 text-muted">{index + 1}</td>
                  <td className="py-3 px-3 font-medium text-foreground">{student.name}</td>
                  <td className="py-3 px-3 text-muted">{student.major}</td>
                  <td className="py-3 px-3 text-muted">{student.grade}</td>
                  <td className="py-3 px-3">
                    {student.status === "assessed" ? (
                      <span className={`font-semibold ${student.score >= 70 ? "text-emerald-600" : student.score >= 50 ? "text-amber-600" : "text-red-500"}`}>
                        {student.score}%
                      </span>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-muted">{student.topCareer}</td>
                  <td className="py-3 px-3">
                    <Badge variant={student.status === "assessed" ? "success" : "warning"}>
                      {student.status === "assessed" ? "Dinilai" : "Belum"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted mt-4">Menampilkan {filtered.length} dari {allStudents.length} siswa</p>
      </Card>
    </div>
  );
}