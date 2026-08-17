import {
  ClipboardCheck,
  Target,
  Map,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Star,
  Clock,
} from "lucide-react";
import Card from "../components/ui/card";
import Badge from "../components/ui/badge";
import ProgressBar from "../components/ui/progressbar";
import DashboardHeader from "../components/layout/dashboardheader";
import { currentUser, careerMatches, roadmapMilestones, projects, jobOpportunities } from "../lib/mock-data";
import { getMatchColor } from "../lib/utils";

const readinessScore = 72;
const completedMilestones = roadmapMilestones.filter((m) => m.status === "completed").length;
const totalMilestones = roadmapMilestones.length;

export default function StudentDashboard() {
  return (
    <div>
      <DashboardHeader
        title={`Selamat datang, ${currentUser.name}!`}
        subtitle={`${currentUser.major} - Kelas ${currentUser.grade}`}
      />

      {/* Readiness Score Card */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Career Readiness Score</p>
              <p className="text-5xl font-bold">{readinessScore}%</p>
              <p className="text-white/70 text-sm mt-2">{getReadinessLabel(readinessScore)}</p>
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${readinessScore}%` }} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Map className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Roadmap Progress</p>
              <p className="text-lg font-bold text-foreground">{completedMilestones}/{totalMilestones}</p>
            </div>
          </div>
          <ProgressBar value={(completedMilestones / totalMilestones) * 100} size="sm" />
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Skills Dinilai", value: "18", icon: ClipboardCheck, color: "bg-blue-100 text-blue-600" },
          { label: "Career Matches", value: careerMatches.length.toString(), icon: Target, color: "bg-purple-100 text-purple-600" },
          { label: "Proyek Selesai", value: projects.length.toString(), icon: Star, color: "bg-amber-100 text-amber-600" },
          { label: "Lowongan Cocok", value: jobOpportunities.filter((j) => j.matchPercentage >= 70).length.toString(), icon: Briefcase, color: "bg-emerald-100 text-emerald-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Top Career Matches */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Top Career Matches</h3>
            <a href="/student/career-match" className="text-sm text-primary hover:text-primary-dark flex items-center gap-1">
              Lihat semua <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-3">
            {careerMatches.slice(0, 3).map((match) => (
              <div key={match.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground text-sm">{match.title}</p>
                  <p className="text-xs text-muted">{match.category}</p>
                </div>
                <span className={`text-sm font-bold ${getMatchColor(match.matchPercentage)}`}>
                  {match.matchPercentage}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Projects</h3>
            <a href="/student/portofolio" className="text-sm text-primary hover:text-primary-dark flex items-center gap-1">
              Lihat semua <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground text-sm">{project.title}</p>
                  <div className="flex gap-1 mt-1">
                    {project.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="primary" className="text-[10px]">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Clock className="w-4 h-4 text-muted" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function getReadinessLabel(score: number): string {
  if (score >= 85) return "Sangat Siap";
  if (score >= 70) return "Siap";
  if (score >= 50) return "Perlu Persiapan";
  return "Mulai Belajar";
}
