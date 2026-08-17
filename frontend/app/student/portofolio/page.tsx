"use client";

import { useState } from "react";
import {
  GraduationCap,
  Link2,
  Copy,
  Check,
  Download,
  ExternalLink,
  Star,
  Target,
  Briefcase,
} from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import ProgressBar from "../../components/ui/progressbar";
import SkillRadar from "../../components/charts/skillradar";
import DashboardHeader from "../../components/layout/dashboardheader";
import { currentUser, allSkills, projects, careerMatches } from "../../lib/mock-data";
import { getMatchBg, getInitials } from "../../lib/utils";

export default function PortfolioPage() {
  const [copied, setCopied] = useState(false);
  const readinessScore = 72;
  const portfolioUrl = "skillmatch.id/portfolio/budi-santoso";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <DashboardHeader
        title="Portfolio Kamu"
        subtitle="Portfolio otomatis dari data skill dan proyek kamu"
      />

      {/* Portfolio Preview Card */}
      <Card className="mb-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Portfolio Public URL</h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Tersalin!" : "Copy Link"}
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-border rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg border border-border">
          <Link2 className="w-4 h-4 text-muted" />
          <span className="text-sm text-foreground font-mono">{portfolioUrl}</span>
          <ExternalLink className="w-3 h-3 text-muted ml-auto" />
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Card */}
        <Card className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">{getInitials(currentUser.name)}</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">{currentUser.name}</h2>
          <p className="text-sm text-muted">{currentUser.major} - Kelas {currentUser.grade}</p>
          <div className="mt-4">
            <div className="text-3xl font-bold text-primary">{readinessScore}%</div>
            <p className="text-xs text-muted">Career Readiness Score</p>
          </div>
          <ProgressBar
            value={readinessScore}
            size="sm"
            color={readinessScore >= 80 ? "success" : "primary"}
            showValue={false}
            className="mt-2"
          />
        </Card>

        {/* Skills Radar */}
        <Card className="lg:col-span-2">
          <SkillRadar skills={allSkills.slice(0, 8)} title="Skill Profile" />
        </Card>
      </div>

      {/* Projects */}
      <Card className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-foreground">Proyek Selesai</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <h4 className="font-medium text-foreground mb-2">{project.title}</h4>
              <p className="text-sm text-muted mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="primary" className="text-[10px]">{skill}</Badge>
                ))}
              </div>
              <p className="text-xs text-muted">{new Date(project.completedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Career Matches */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Top Career Matches</h3>
        </div>
        <div className="space-y-3">
          {careerMatches.slice(0, 3).map((match) => (
            <div key={match.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{match.title}</p>
                  <p className="text-xs text-muted">{match.category}</p>
                </div>
              </div>
              <span className={`text-sm font-bold ${getMatchBg(match.matchPercentage)} px-3 py-1 rounded-full`}>
                {match.matchPercentage}%
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}