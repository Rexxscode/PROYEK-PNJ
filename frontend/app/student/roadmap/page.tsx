"use client";

import { useState } from "react";
import {
  Map,
  CheckCircle2,
  Clock,
  Lock,
  Play,
  FileText,
  BookOpen,
  Code,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Zap,
} from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import ProgressBar from "../../components/ui/progressbar";
import DashboardHeader from "../../components/layout/dashboardheader";
import { roadmapMilestones } from "../../lib/mock-data";
import { cn } from "../../lib/utils";
import type { RoadmapMilestone, RoadmapResource } from "../../lib/type";

const statusConfig = {
  completed: { color: "bg-emerald-500", icon: CheckCircle2, label: "Selesai", badge: "success" as const },
  in_progress: { color: "bg-primary", icon: Zap, label: "Sedang Dikerjakan", badge: "primary" as const },
  available: { color: "bg-gray-300", icon: Play, label: "Tersedia", badge: "default" as const },
  locked: { color: "bg-gray-200", icon: Lock, label: "TerKunci", badge: "default" as const },
};

const resourceIcons = {
  article: FileText,
  video: Play,
  course: BookOpen,
  practice: Code,
};

export default function RoadmapPage() {
  const [expandedId, setExpandedId] = useState<string | null>(roadmapMilestones.find((m) => m.status === "in_progress")?.id || null);
  const completedCount = roadmapMilestones.filter((m) => m.status === "completed").length;
  const totalHours = roadmapMilestones.reduce((sum, m) => sum + m.estimatedHours, 0);
  const completedHours = roadmapMilestones.filter((m) => m.status === "completed").reduce((sum, m) => sum + m.estimatedHours, 0);

  return (
    <div>
      <DashboardHeader
        title="Roadmap Belajar"
        subtitle="Ikuti jalur belajar personal untuk menutupi skill gap"
      />

      {/* Progress Overview */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Map className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted">Milestone</p>
              <p className="text-lg font-bold text-foreground">{completedCount}/{roadmapMilestones.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Estimasi</p>
              <p className="text-lg font-bold text-foreground">{totalHours} jam</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Selesai</p>
              <p className="text-lg font-bold text-foreground">{completedHours} jam</p>
            </div>
          </div>
        </Card>
      </div>

      <ProgressBar
        value={(completedCount / roadmapMilestones.length) * 100}
        label="Progress Roadmap"
        className="mb-8"
      />

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {roadmapMilestones.map((milestone, index) => {
            const config = statusConfig[milestone.status];
            const isExpanded = expandedId === milestone.id;

            return (
              <div key={milestone.id} className="relative flex gap-6">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", config.color)}>
                    <config.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <Card
                    className={cn(
                      "transition-all",
                      milestone.status === "in_progress" && "border-primary shadow-sm",
                      milestone.status === "locked" && "opacity-60"
                    )}
                  >
                    <div
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : milestone.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={config.badge}>{config.label}</Badge>
                          <span className="text-xs text-muted">~{milestone.estimatedHours} jam</span>
                        </div>
                        <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                        <p className="text-sm text-muted mt-1">{milestone.description}</p>
                        <div className="flex gap-1.5 mt-2">
                          {milestone.skills.map((skill) => (
                            <Badge key={skill} variant="primary" className="text-[10px]">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <button className="p-1 text-muted hover:text-foreground">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="text-sm font-medium text-foreground mb-3">Sumber Belajar</h4>
                        <div className="space-y-2">
                          {milestone.resources.map((resource) => {
                            const Icon = resourceIcons[resource.type];
                            return (
                              <a
                                key={resource.title}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-sm text-foreground flex-1">{resource.title}</span>
                                <ExternalLink className="w-3 h-3 text-muted" />
                              </a>
                            );
                          })}
                        </div>
                        {milestone.status === "available" && (
                          <button className="mt-4 w-full py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors text-sm">
                            Mulai Belajar
                          </button>
                        )}
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}