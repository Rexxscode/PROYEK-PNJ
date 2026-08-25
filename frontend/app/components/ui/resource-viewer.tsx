"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink, CheckCircle2, Play, FileText, BookOpen, Code } from "lucide-react";
import type { RoadmapResource } from "../../lib/major-roadmap";

interface ResourceViewerProps {
  resource: RoadmapResource;
  isOpen: boolean;
  onClose: () => void;
  isViewed: boolean;
  onViewed: () => void;
}

const typeConfig: Record<string, { icon: typeof FileText; label: string; color: string }> = {
  article: { icon: FileText, label: "Artikel", color: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" },
  video: { icon: Play, label: "Video", color: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400" },
  course: { icon: BookOpen, label: "Kursus", color: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400" },
  practice: { icon: Code, label: "Praktik", color: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400" },
};

export default function ResourceViewer({ resource, isOpen, onClose, isViewed, onViewed }: ResourceViewerProps) {
  const [marking, setMarking] = useState(false);

  if (!isOpen) return null;

  const config = typeConfig[resource.type] || typeConfig.article;
  const isVideo = resource.type === "video" && resource.embedUrl;

  const handleMarkViewed = () => {
    setMarking(true);
    setTimeout(() => {
      onViewed();
      setMarking(false);
    }, 500);
  };

  const modal = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.color}`}>
              <config.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">{resource.title}</h3>
              <span className="text-xs text-muted">{config.label}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isVideo && resource.embedUrl ? (
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={resource.embedUrl}
                title={resource.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="p-6 flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${config.color}`}>
                <config.icon className="w-8 h-8" />
              </div>
              <p className="text-foreground font-medium mb-2">{resource.title}</p>
              <p className="text-sm text-muted mb-6">Buka sumber belajar ini di browser untuk mempelajarinya.</p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Buka di Browser
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {isViewed ? (
            <div className="flex items-center justify-center gap-2 py-2.5 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Sudah Dilihat
            </div>
          ) : (
            <button
              onClick={handleMarkViewed}
              disabled={marking}
              className="w-full py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {marking ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              Tandai Sudah Dilihat
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(modal, document.body);
}
