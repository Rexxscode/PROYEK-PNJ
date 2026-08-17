"use client";

import { useState } from "react";
import { Search, Filter, ExternalLink, Star, MapPin, GraduationCap } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import DashboardHeader from "../../components/layout/dashboardheader";
import { getMatchBg, getInitials } from "../../lib/utils";

const candidates = [
  { name: "Rina Wulandari", major: "Rekayasa Perangkat Lunak", grade: "XII", score: 92, skills: ["React/Next.js", "TypeScript", "HTML/CSS", "Node.js"], topCareer: "Frontend Developer" },
  { name: "Budi Santoso", major: "Teknik Informatika", grade: "XII", score: 85, skills: ["Node.js", "REST API", "SQL/Database", "JavaScript"], topCareer: "Backend Developer" },
  { name: "Andi Pratama", major: "Teknik Informatika", grade: "XI", score: 78, skills: ["HTML/CSS", "JavaScript", "React/Next.js", "Git"], topCareer: "Fullstack Developer" },
  { name: "Rizky Aditya", major: "Teknik Informatika", grade: "XII", score: 71, skills: ["JavaScript", "Node.js", "Git", "REST API"], topCareer: "Backend Developer" },
  { name: "Lestari Wijaya", major: "Teknik Informatika", grade: "XI", score: 83, skills: ["React/Next.js", "TypeScript", "HTML/CSS"], topCareer: "Frontend Developer" },
  { name: "Fajar Nugroho", major: "Sistem Informasi", grade: "XII", score: 68, skills: ["Python", "SQL/Database", "Problem Solving"], topCareer: "Data Analyst" },
  { name: "Hendra Susanto", major: "Rekayasa Perangkat Lunak", grade: "XII", score: 71, skills: ["JavaScript", "React/Next.js", "Node.js"], topCareer: "Fullstack Developer" },
  { name: "Dedi Kurniawan", major: "Sistem Informasi", grade: "XI", score: 58, skills: ["Python", "SQL/Database"], topCareer: "Data Analyst" },
];

const allSkillFilters = [...new Set(candidates.flatMap((c) => c.skills))].sort();

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

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
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {skill}
          </button>
        ))}
        {selectedSkills.length > 0 && (
          <button
            onClick={() => setSelectedSkills([])}
            className="px-3 py-1 rounded-full text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      <p className="text-sm text-muted mb-4">
        Menampilkan {filtered.length} kandidat
      </p>

      {/* Candidate Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered
          .sort((a, b) => b.score - a.score)
          .map((candidate, index) => (
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

              <button className="w-full py-2.5 border border-border text-foreground text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Lihat Portfolio
              </button>
            </Card>
          ))}
      </div>
    </div>
  );
}