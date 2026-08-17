"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  Filter,
  SortAsc,
  Search,
  X,
  CheckCircle2,
  Building2,
  Send,
} from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import DashboardHeader from "../../components/layout/dashboardheader";
import { getCurrentStudent } from "../../lib/mock-data";
import { getMatchBg, formatDate, getInitials } from "../../lib/utils";
import type { JobOpportunity } from "../../lib/type";

type FilterType = "all" | "magang" | "fulltime" | "parttime";

const typeLabels = {
  magang: "Magang",
  fulltime: "Full-time",
  parttime: "Part-time",
};

const typeBadgeVariant = {
  magang: "primary" as const,
  fulltime: "success" as const,
  parttime: "secondary" as const,
};

const companyColors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-red-500 to-rose-500",
];

export default function JobsPage() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<"match" | "date">("match");
  const [selectedJob, setSelectedJob] = useState<JobOpportunity | null>(null);
  const [applied, setApplied] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const student = mounted ? getCurrentStudent() : null;
  const jobOpportunities = student?.jobOpportunities || [];
  const profile = student?.profile;

  if (!mounted || !student) return null;

  const filteredJobs = jobOpportunities
    .filter((job) => filter === "all" || job.type === filter)
    .sort((a, b) =>
      sortBy === "match"
        ? b.matchPercentage - a.matchPercentage
        : new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    );

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedJob(null);
    }, 2000);
  };

  return (
    <div>
      <DashboardHeader
        title="Lowongan Kerja & Magang"
        subtitle="Smart matching berdasarkan skill kamu"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {(["all", "magang", "fulltime", "parttime"] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === type
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-muted hover:bg-gray-50"
              }`}
            >
              {type === "all" ? "Semua" : typeLabels[type]}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("match")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors ${
              sortBy === "match" ? "bg-primary/10 text-primary" : "text-muted hover:bg-gray-50"
            }`}
          >
            <SortAsc className="w-4 h-4" /> Kecocokan
          </button>
          <button
            onClick={() => setSortBy("date")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors ${
              sortBy === "date" ? "bg-primary/10 text-primary" : "text-muted hover:bg-gray-50"
            }`}
          >
            <Calendar className="w-4 h-4" /> Terbaru
          </button>
        </div>
      </div>

      {/* Job Count */}
      <p className="text-sm text-muted mb-4">
        Menampilkan {filteredJobs.length} lowongan
      </p>

      {/* Job Cards */}
      <div className="grid gap-4">
        {filteredJobs.map((job, index) => (
          <Card key={job.id} hover className="!p-0">
            <div className="flex flex-col md:flex-row">
              {/* Company Logo */}
              <div className="p-6 md:w-24 flex items-start justify-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${companyColors[index % companyColors.length]} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-lg font-bold text-white">
                    {job.company.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 pt-0 md:pt-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <Badge variant={typeBadgeVariant[job.type]}>{typeLabels[job.type]}</Badge>
                    </div>
                    <p className="text-sm text-muted">{job.company}</p>
                  </div>
                  <div className={`text-right px-4 py-2 rounded-xl ${getMatchBg(job.matchPercentage)}`}>
                    <div className="text-2xl font-bold">{job.matchPercentage}%</div>
                    <div className="text-xs opacity-80">Match</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Deadline: {formatDate(job.deadline)}
                  </span>
                </div>

                <p className="text-sm text-muted mb-3 line-clamp-2">{job.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="default" className="text-[10px]">{skill}</Badge>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedJob(job)}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Lamar Sekarang
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in">
            {!applied ? (
              <>
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h3 className="font-semibold text-foreground">Konfirmasi Lamaran</h3>
                  <button onClick={() => setSelectedJob(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{selectedJob.title}</p>
                      <p className="text-sm text-muted">{selectedJob.company}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="text-sm font-medium text-foreground mb-1">Portfolio yang dikirim:</p>
                    <p className="text-sm text-muted">{profile!.name} - {profile!.major}</p>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="primary" className="text-[10px]">18 Skills</Badge>
                      <Badge variant="success" className="text-[10px]">3 Projects</Badge>
                      <Badge variant="secondary" className="text-[10px]">72% Ready</Badge>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className={`text-3xl font-bold ${getMatchBg(selectedJob.matchPercentage)} px-4 py-2 rounded-xl inline-block`}>
                      {selectedJob.matchPercentage}% Match
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 p-6 pt-0">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="flex-1 py-2.5 border border-border text-foreground font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleApply}
                    className="flex-1 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors text-sm"
                  >
                    Konfirmasi Lamar
                  </button>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Lamaran Terkirim!</h3>
                <p className="text-sm text-muted">
                  Portfolio kamu sudah dikirim ke {selectedJob.company}. Semoga berhasil!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
