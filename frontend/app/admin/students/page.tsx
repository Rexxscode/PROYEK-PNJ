"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Eye, Filter, ChevronDown, ChevronUp } from "lucide-react";
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
  const [statusFilter, setStatusFilter] = useState("all");
  const [majorOpen, setMajorOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const majorTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const handler = (e: Event) => setSearch((e as CustomEvent).detail || "");
    window.addEventListener("global-search", handler);
    return () => window.removeEventListener("global-search", handler);
  }, []);

  const filtered = allStudents.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.major.toLowerCase().includes(q) || s.topCareer.toLowerCase().includes(q);
    const matchesMajor = majorFilter === "all" || s.major === majorFilter;
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesMajor && matchesStatus;
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
            placeholder="Cari nama, jurusan, atau karier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="relative">
          <select
            value={majorFilter}
            onChange={(e) => { setMajorFilter(e.target.value); setMajorOpen(false); }}
            onClick={() => { clearTimeout(majorTimer.current); setMajorOpen((v) => !v); }}
            onBlur={() => { majorTimer.current = setTimeout(() => setMajorOpen(false), 200); }}
            className="w-full appearance-none px-4 py-2 pr-9 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="all">Semua Jurusan</option>
            {majors.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {majorOpen ? (
            <ChevronUp className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          ) : (
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          )}
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setStatusOpen(false); }}
            onClick={() => { clearTimeout(statusTimer.current); setStatusOpen((v) => !v); }}
            onBlur={() => { statusTimer.current = setTimeout(() => setStatusOpen(false), 200); }}
            className="w-full appearance-none px-4 py-2 pr-9 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="all">Semua Status</option>
            <option value="assessed">Sudah Dinilai</option>
            <option value="pending">Belum Dinilai</option>
          </select>
          {statusOpen ? (
            <ChevronUp className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          ) : (
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="text-center py-12">
          <Search className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-foreground font-medium">Tidak ada siswa ditemukan</p>
          <p className="text-sm text-muted mt-1">Coba ubah filter atau kata kunci pencarian</p>
        </Card>
      ) : (
      <>
      {/* Table — Desktop */}
      <Card className="hidden md:block">
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
                <tr key={student.name} className="border-b border-border/50 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-3 text-muted">{index + 1}</td>
                  <td className="py-3 px-3 font-medium text-foreground">{student.name}</td>
                  <td className="py-3 px-3 text-muted">{student.major}</td>
                  <td className="py-3 px-3 text-muted">{student.grade}</td>
                  <td className="py-3 px-3">
                    {student.status === "assessed" ? (
                      <span className={`font-semibold ${student.score >= 70 ? "text-emerald-600 dark:text-emerald-400" : student.score >= 50 ? "text-amber-600 dark:text-amber-400" : "text-red-500 dark:text-red-400"}`}>
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

      {/* Cards — Mobile */}
      <div className="md:hidden space-y-3">
        {filtered.map((student, index) => (
          <Card key={student.name}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-foreground">{student.name}</p>
                <p className="text-xs text-muted">{student.major} - Kelas {student.grade}</p>
              </div>
              <Badge variant={student.status === "assessed" ? "success" : "warning"}>
                {student.status === "assessed" ? "Dinilai" : "Belum"}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Top Karier: {student.topCareer}</span>
              {student.status === "assessed" ? (
                <span className={`font-semibold ${student.score >= 70 ? "text-emerald-600 dark:text-emerald-400" : student.score >= 50 ? "text-amber-600 dark:text-amber-400" : "text-red-500 dark:text-red-400"}`}>
                  {student.score}%
                </span>
              ) : (
                <span className="text-muted">-</span>
              )}
            </div>
          </Card>
        ))}
      </div>
      <p className="md:hidden text-xs text-muted mt-2">Menampilkan {filtered.length} dari {allStudents.length} siswa</p>
      </>
      )}
    </div>
  );
}