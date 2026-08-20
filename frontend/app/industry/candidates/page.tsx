"use client";

import { useState, useEffect } from "react";
import { Search, ExternalLink, Star, GraduationCap, X, MapPin } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import DashboardHeader from "../../components/layout/dashboardheader";
import { getMatchBg, getInitials } from "../../lib/utils";

const candidates = [
  { name: "Rina Wulandari", major: "Desain Komunikasi Visual", grade: "XII", score: 92, skills: ["UI/UX Design", "Figma", "Adobe Photoshop", "HTML/CSS"], topCareer: "UI/UX Designer", projects: ["E-Commerce UI", "Portfolio Website", "Mobile App Design"], experience: "Magang 3 bulan di PT TechSol" },
  { name: "Budi Santoso", major: "Rekayasa Perangkat Lunak", grade: "XII", score: 85, skills: ["JavaScript", "Node.js", "SQL/Database", "REST API"], topCareer: "Backend Developer", projects: ["Sistem Absensi Online", "API CRUD RESTful"], experience: "Proyek sekolah: Sistem Perpustakaan" },
  { name: "Andi Pratama", major: "Rekayasa Perangkat Lunak", grade: "XI", score: 78, skills: ["HTML/CSS", "JavaScript", "React/Next.js", "Git"], topCareer: "Frontend Developer", projects: ["Blog Pribadi", "Todo App"], experience: "Freelance web developer" },
  { name: "Rizky Aditya", major: "Rekayasa Perangkat Lunak", grade: "XII", score: 71, skills: ["JavaScript", "Python", "Git", "Problem Solving"], topCareer: "Fullstack Developer", projects: ["Chat Application", "Weather API"], experience: "Proyek klub IT" },
  { name: "Lestari Wijaya", major: "Desain Komunikasi Visual", grade: "XI", score: 83, skills: ["Adobe Illustrator", "Adobe Photoshop", "Video Editing", "Copywriting"], topCareer: "Graphic Designer", projects: ["Dashboard Admin", "Landing Page Company"], experience: "Magang 2 bulan di Startup" },
  { name: "Fajar Nugroho", major: "Teknik Komputer dan Jaringan", grade: "XII", score: 68, skills: ["Cisco Networking", "Linux Administration", "MikroTik", "Cloud (AWS/GCP)"], topCareer: "Network Engineer", projects: ["Analisis Penjualan", "Data Visualization"], experience: "Asisten lab komputer" },
  { name: "Hendra Susanto", major: "Teknik Transmisi", grade: "XII", score: 71, skills: ["Fiber Optik", "Radio Frequency", "Network Engineering", "Teknik Mekanik Radio"], topCareer: "Network Engineer", projects: ["Instalasi Jaringan Fiber Optik", "Konfigurasi Radio Link"], experience: "Praktik di PT Telkom 2 bulan" },
  { name: "Dedi Kurniawan", major: "Teknik Komputer dan Jaringan", grade: "XI", score: 58, skills: ["Linux Administration", "Python", "SQL/Database"], topCareer: "System Administrator", projects: ["Scraper Data", "Report Generator"], experience: "Belum ada pengalaman" },
];

const allSkillFilters = [...new Set(candidates.flatMap((c) => c.skills))].sort();

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<(typeof candidates)[0] | null>(null);

  useEffect(() => {
    const handler = (e: Event) => setSearch((e as CustomEvent).detail || "");
    window.addEventListener("global-search", handler);
    return () => window.removeEventListener("global-search", handler);
  }, []);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filtered = candidates.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 || selectedSkills.some((s) => c.skills.includes(s));
    return matchesSearch && matchesSkills;
  });

  return (
    <div>
      <DashboardHeader
        title="Cari Kandidat"
        subtitle="Temukan kandidat berdasarkan kebutuhan skill perusahaan"
        role="industry"
      />

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Cari nama kandidat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Skill Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm text-muted py-1">Filter skill:</span>
        {allSkillFilters.map((skill) => (
          <button
            key={skill}
            onClick={() => toggleSkill(skill)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedSkills.includes(skill)
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {skill}
          </button>
        ))}
        {selectedSkills.length > 0 && (
          <button
            onClick={() => setSelectedSkills([])}
            className="px-3 py-1 rounded-full text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      <p className="text-sm text-muted mb-4">
        Menampilkan {filtered.length} kandidat
      </p>

      {filtered.length === 0 ? (
        <Card className="text-center py-12">
          <Search className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-foreground font-medium">Tidak ada kandidat ditemukan</p>
          <p className="text-sm text-muted mt-1">Coba ubah filter skill atau kata kunci pencarian</p>
        </Card>
      ) : (
      <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered
          .sort((a, b) => b.score - a.score)
          .map((candidate) => (
            <Card key={candidate.name} hover>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{getInitials(candidate.name)}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{candidate.name}</p>
                  <p className="text-xs text-muted flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" /> {candidate.major} - {candidate.grade}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className={`text-2xl font-bold ${getMatchBg(candidate.score)} px-3 py-1 rounded-lg`}>
                  {candidate.score}%
                </span>
                <Badge variant="primary">{candidate.topCareer}</Badge>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="default" className="text-[10px]">{skill}</Badge>
                ))}
              </div>

              <button
                onClick={() => setSelectedCandidate(candidate)}
                className="w-full py-2.5 border border-border text-foreground text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Lihat Portfolio
              </button>
            </Card>
           ))}
      </div>
      </>
      )}

      {/* Portfolio Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setSelectedCandidate(null)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{getInitials(selectedCandidate.name)}</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">{selectedCandidate.name}</h3>
                  <p className="text-sm text-muted">{selectedCandidate.major} - Kelas {selectedCandidate.grade}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCandidate(null)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Score */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Career Readiness Score</span>
                <span className={`text-2xl font-bold ${getMatchBg(selectedCandidate.score)}`}>{selectedCandidate.score}%</span>
              </div>

              {/* Career Match */}
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Target Karier</p>
                <Badge variant="primary">{selectedCandidate.topCareer}</Badge>
              </div>

              {/* Skills */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Skill</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.skills.map((skill) => (
                    <Badge key={skill} variant="default">{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Proyek</p>
                <div className="space-y-2">
                  {selectedCandidate.projects.map((project) => (
                    <div key={project} className="flex items-center gap-2 text-sm text-foreground bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {project}
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Pengalaman</p>
                <p className="text-sm text-muted">{selectedCandidate.experience}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
                  Hubungi Kandidat
                </button>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
