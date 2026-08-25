"use client";

import { useState, useEffect } from "react";
import { Search, ExternalLink, GraduationCap } from "lucide-react";
import Link from "next/link";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import DashboardHeader from "../../components/layout/dashboardheader";
import { getMatchBg, getInitials } from "../../lib/utils";
import { getStoredToken, industryAPI } from "../../lib/api";
import type { IndustryCandidate } from "../../lib/type";

export default function CandidatesPage() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");
  const [candidates, setCandidates] = useState<IndustryCandidate[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    const token = getStoredToken();
    const load = token
      ? industryAPI.getCandidates(token)
      : Promise.reject(new Error("Sesi tidak ditemukan"));

    load
      .then(({ candidates: list }) => {
        setCandidates(list);
        setError("");
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Gagal memuat data"))
      .finally(() => setMounted(true));
  }, []);

  useEffect(() => {
    const handler = (e: Event) => setSearch((e as CustomEvent).detail || "");
    window.addEventListener("global-search", handler);
    return () => window.removeEventListener("global-search", handler);
  }, []);

  const allSkillFilters = [...new Set(candidates.flatMap((c) => c.skills))].sort();

  if (!mounted || candidates.length === 0) {
    return (
      <div>
        <DashboardHeader
          title="Cari Kandidat"
          subtitle="Temukan kandidat berdasarkan kebutuhan skill perusahaan"
          role="industry"
        />
        <Card className="text-center py-12">
          <p className="text-foreground font-medium">{error || "Memuat data..."}</p>
        </Card>
      </div>
    );
  }

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
            <Card key={candidate.id} hover>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{getInitials(candidate.name)}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{candidate.name}</p>
                  <p className="text-xs text-muted flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" /> {candidate.major || "-"} - {candidate.grade || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className={`text-2xl font-bold ${getMatchBg(candidate.score)} px-3 py-1 rounded-lg`}>
                  {candidate.score}%
                </span>
                <Badge variant="primary">{candidate.topCareer || "-"}</Badge>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="default" className="text-[10px]">{skill}</Badge>
                ))}
              </div>

              <Link
                href={`/portfolio/${candidate.slug}`}
                className="w-full py-2.5 border border-border text-foreground text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Lihat Portfolio
              </Link>
            </Card>
           ))}
      </div>
      </>
      )}
    </div>
  );
}
