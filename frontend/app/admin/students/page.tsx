"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Users } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import DashboardHeader from "../../components/layout/dashboardheader";
import { api, BACKEND_ENDPOINTS } from "../../lib/api";

type StudentRow = {
  name: string;
  email: string;
  major: string;
  grade: string;
};

type RawStudent = {
  name: string;
  user?: { email?: string } | null;
  major?: { name?: string } | null;
  major_id?: string | null;
  grade?: string | null;
  [k: string]: unknown;
};

function mapStudent(s: RawStudent): StudentRow {
  return {
    name: s.name ?? "",
    email: s.user?.email ?? "",
    major: s.major?.name ?? s.major_id ?? "-",
    grade: s.grade ?? "",
  };
}

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [majorFilter, setMajorFilter] = useState("all");
  const [majorOpen, setMajorOpen] = useState(false);
  const majorTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get<{ success: boolean; data: RawStudent[] }>(BACKEND_ENDPOINTS.students.list);
        if (res.success) {
          setRows(res.data.map(mapStudent));
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const handler = (e: Event) => setSearch((e as CustomEvent).detail || "");
    window.addEventListener("global-search", handler);
    return () => window.removeEventListener("global-search", handler);
  }, []);

  const filtered = rows.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.major.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q);
    const matchesMajor = majorFilter === "all" || s.major === majorFilter;
    return matchesSearch && matchesMajor;
  });

  const majors = useMemo(() => [...new Set(rows.map((s) => s.major))], [rows]);

  return (
    <div>
      <DashboardHeader
        title="Data Siswa"
        subtitle="Kelola data siswa"
        role="admin"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Cari nama, jurusan, atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-bg text-foreground"
          />
        </div>
        <div className="relative">
          <select
            value={majorFilter}
            onChange={(e) => { setMajorFilter(e.target.value); setMajorOpen(false); }}
            onClick={() => { clearTimeout(majorTimer.current); setMajorOpen((v) => !v); }}
            onBlur={() => { majorTimer.current = setTimeout(() => setMajorOpen(false), 200); }}
            className="w-full appearance-none px-4 py-2 pr-9 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-bg text-foreground"
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
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12">
          <Users className="w-12 h-12 text-muted mx-auto mb-3" />
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
                    <th className="text-left py-3 px-3 font-medium text-muted">Email</th>
                    <th className="text-left py-3 px-3 font-medium text-muted">Jurusan</th>
                    <th className="text-left py-3 px-3 font-medium text-muted">Kelas</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((student, index) => (
                    <tr key={student.email || index} className="border-b border-border/50 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3 px-3 text-muted">{index + 1}</td>
                      <td className="py-3 px-3 font-medium text-foreground">{student.name}</td>
                      <td className="py-3 px-3 text-muted break-all">{student.email}</td>
                      <td className="py-3 px-3 text-muted">{student.major}</td>
                      <td className="py-3 px-3">
                        <Badge variant="secondary">{student.grade}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted mt-4">Menampilkan {filtered.length} dari {rows.length} siswa</p>
          </Card>

          {/* Cards — Mobile */}
          <div className="md:hidden space-y-3">
            {filtered.map((student) => (
              <Card key={student.email}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-xs text-muted break-all">{student.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{student.major}</Badge>
                  <Badge variant="secondary">Kelas {student.grade}</Badge>
                </div>
              </Card>
            ))}
          </div>
          <p className="md:hidden text-xs text-muted mt-2">Menampilkan {filtered.length} dari {rows.length} siswa</p>
        </>
      )}
    </div>
  );
}