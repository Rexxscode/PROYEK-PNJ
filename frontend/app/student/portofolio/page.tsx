"use client";

import { useState, useEffect, useRef } from "react";
import {
  Link2,
  Copy,
  Check,
  Download,
  ExternalLink,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  FolderOpen,
} from "lucide-react";
import Card from "../../components/ui/card";
import ProgressBar from "../../components/ui/progressbar";
import dynamic from "next/dynamic";
import DashboardHeader from "../../components/layout/dashboardheader";
import { getCurrentStudent } from "../../lib/mock-data";
import { loadCareerMatches } from "../../lib/career-match";
import { getInitials } from "../../lib/utils";
import type { CareerMatch, Project } from "../../lib/type";

const SkillRadar = dynamic(() => import("../../components/charts/skillradar"), { ssr: false });

function loadUserProjects(email: string): Project[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(`portfolio_projects_${email}`);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}
function saveUserProjects(email: string, projects: Project[]) {
  localStorage.setItem(`portfolio_projects_${email}`, JSON.stringify(projects));
}

const emptyProject = { title: "", description: "", skills: "", projectUrl: "", completedAt: "" };

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(emptyProject);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef("");
  useEffect(() => { setMounted(true); }, []);

  const student = mounted ? getCurrentStudent() : null;

  useEffect(() => {
    if (!mounted || !student) return;
    emailRef.current = student.profile.email;
    const saved = loadCareerMatches();
    const matches = saved && saved.length > 0 ? saved : student.careerMatches || [];
    setCareerMatches(matches);
    const email = student.profile.email;
    const existing = loadUserProjects(email);
    if (existing.length === 0) {
      saveUserProjects(email, student.projects);
      setUserProjects(student.projects);
    } else {
      setUserProjects(existing);
    }
  }, [mounted, student]);

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      skills: p.skills.join(", "),
      projectUrl: p.projectUrl || "",
      completedAt: p.completedAt,
    });
    setShowAdd(false);
  };

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyProject);
    setShowAdd(true);
  };

  const saveProject = () => {
    if (!form.title.trim() || !student) return;
    const email = emailRef.current;
    const parsedSkills = form.skills.split(",").map((s) => s.trim()).filter(Boolean);
    if (editingId) {
      const updated = userProjects.map((p) =>
        p.id === editingId
          ? { ...p, title: form.title, description: form.description, skills: parsedSkills, projectUrl: form.projectUrl || undefined, completedAt: form.completedAt || p.completedAt }
          : p
      );
      setUserProjects(updated);
      saveUserProjects(email, updated);
    } else {
      const newProject: Project = {
        id: `up-${Date.now()}`,
        title: form.title,
        description: form.description,
        skills: parsedSkills,
        projectUrl: form.projectUrl || undefined,
        completedAt: form.completedAt || new Date().toISOString().slice(0, 10),
      };
      const updated = [...userProjects, newProject];
      setUserProjects(updated);
      saveUserProjects(email, updated);
    }
    setEditingId(null);
    setShowAdd(false);
    setForm(emptyProject);
  };

  const deleteProject = (id: string) => {
    if (!student) return;
    const email = emailRef.current;
    const updated = userProjects.filter((p) => p.id !== id);
    setUserProjects(updated);
    saveUserProjects(email, updated);
    setDeleteConfirmId(null);
  };

  const cancelForm = () => {
    setEditingId(null);
    setShowAdd(false);
    setForm(emptyProject);
  };

  const handleDownloadPdf = async () => {
    if (generatingPdf) return;
    const s = getCurrentStudent();
    if (!s) return;
    setGeneratingPdf(true);
    try {
      const { domToPng } = await import("modern-screenshot");
      const { jsPDF } = await import("jspdf");

      const { profile, hardSkills, softSkills } = s;
      const all = [...hardSkills, ...softSkills];
      const allProjects = loadUserProjects(s.profile.email);
      const matches = loadCareerMatches() || careerMatches;
      const score = matches.length > 0 ? Math.round(matches.reduce((sum, c) => sum + c.matchPercentage, 0) / matches.length) : 0;

      const html = `
        <div style="font-family:system-ui,-apple-system,sans-serif;background:#ffffff;color:#1e293b;padding:20px;width:700px;">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;padding-bottom:14px;border-bottom:1.5px solid #e2e8f0;">
            <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#2563eb,#7c3aed);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="color:#fff;font-size:18px;font-weight:700;">${getInitials(profile.name)}</span>
            </div>
            <div style="flex:1;">
              <div style="font-size:17px;font-weight:700;color:#0f172a;margin-bottom:2px;">${profile.name}</div>
              <div style="font-size:12px;color:#475569;">${profile.major} — Kelas ${profile.grade}</div>
              <div style="font-size:10px;color:#94a3b8;margin-top:1px;">Portfolio generated by SkillMatch</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:26px;font-weight:700;color:#2563eb;">${score}%</div>
              <div style="font-size:10px;color:#64748b;">Readiness Score</div>
            </div>
          </div>

          <div style="margin-bottom:14px;">
            <div style="font-size:11px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;">Skills</div>
            <div style="display:flex;flex-wrap:wrap;gap:5px;">
              ${all.map(sk => `<span style="padding:3px 8px;background:#eff6ff;color:#1d4ed8;border-radius:999px;font-size:10px;font-weight:500;">${sk.name} (${sk.level}%)</span>`).join("")}
            </div>
          </div>

          <div style="margin-bottom:14px;">
            <div style="font-size:11px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;">Projects</div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              ${allProjects.map(p => `
                <div style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;">
                  <div style="font-size:12px;font-weight:600;color:#0f172a;margin-bottom:2px;">${p.title}</div>
                  <div style="font-size:10px;color:#64748b;margin-bottom:4px;">${p.description}</div>
                  <div style="display:flex;flex-wrap:wrap;gap:3px;">
                    ${p.skills.map(sk => `<span style="padding:1px 6px;background:#dbeafe;color:#1e40af;border-radius:3px;font-size:9px;font-weight:500;">${sk}</span>`).join("")}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <div>
            <div style="font-size:11px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;">Top Career Matches</div>
            <div style="display:flex;flex-direction:column;gap:5px;">
              ${matches.slice(0, 3).map(c => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;">
                  <div>
                    <div style="font-size:12px;font-weight:600;color:#0f172a;">${c.title}</div>
                    <div style="font-size:10px;color:#64748b;">${c.category}</div>
                  </div>
                  <div style="font-size:12px;font-weight:700;color:#2563eb;">${c.matchPercentage}%</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>`;

      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.innerHTML = html;
      document.body.appendChild(container);

      const dataUrl = await domToPng(container.firstElementChild as HTMLElement, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      document.body.removeChild(container);

      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((r) => { img.onload = () => r(); });

      const pdfW = 210;
      const pdfH = (img.height * pdfW) / img.width;
      const margin = 5;
      const contentW = pdfW - margin * 2;

      const pdf = new jsPDF("p", "mm", "a4");
      let pos = margin;
      const pageH = 297;

      if (pdfH <= pageH - margin * 2) {
        pdf.addImage(dataUrl, "PNG", margin, pos, contentW, pdfH);
      } else {
        let rem = pdfH;
        while (rem > 0) {
          pdf.addImage(dataUrl, "PNG", margin, pos, contentW, pdfH);
          rem -= pageH;
          pos += pageH;
          if (rem > 0) pdf.addPage();
        }
      }

      pdf.save(`Portfolio_${profile.name.replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setGeneratingPdf(false);
    }
  };

  if (!mounted || !student) return null;
  const { profile, hardSkills, softSkills } = student;
  const allSkills = [...hardSkills, ...softSkills];
  const readinessScore = careerMatches.length > 0 ? Math.round(careerMatches.reduce((sum, c) => sum + c.matchPercentage, 0) / careerMatches.length) : 0;
  const portfolioUrl = mounted
    ? `${window.location.origin}/portfolio/${profile.name.toLowerCase().replace(/\s+/g, "-")}`
    : `/portfolio/${profile.name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div>
      <DashboardHeader
        title="Portfolio Kamu"
        subtitle="Portfolio otomatis dari data skill dan proyek kamu"
      />

      {/* Portfolio Preview Card */}
      <Card className="mb-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="font-semibold text-foreground">Portfolio Public URL</h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-card border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Tersalin!" : "Copy Link"}
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={generatingPdf}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-white border border-primary rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {generatingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {generatingPdf ? "Generating..." : "Download PDF"}
            </button>
          </div>
        </div>
        <a
          href={portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-lg border border-border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <Link2 className="w-4 h-4 text-muted" />
          <span className="text-sm text-foreground font-mono flex-1 truncate">{portfolioUrl}</span>
          <ExternalLink className="w-3 h-3 text-muted" />
        </a>
      </Card>

      <div className="rounded-2xl p-1 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
        <div ref={portfolioRef} className="bg-card dark:bg-gray-800 rounded-xl p-6 text-foreground">
        {/* Profile Header */}
        <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border dark:border-gray-700">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-bold text-white">{getInitials(profile.name)}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground dark:text-white">{profile.name}</h2>
            <p className="text-sm text-muted dark:text-gray-400">{profile.major} - Kelas {profile.grade}</p>
            <p className="text-xs text-muted/60 dark:text-gray-500 mt-1">Portfolio generated by SkillMatch</p>
          </div>
          <div className="ml-auto text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{readinessScore}%</div>
            <p className="text-xs text-muted dark:text-gray-400">Readiness Score</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-foreground dark:text-gray-200 uppercase tracking-wider mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                {skill.name} ({skill.level}%)
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground dark:text-gray-200 uppercase tracking-wider">Projects</h3>
          </div>
          <div className="space-y-3">
            {userProjects.map((project) => (
              <div key={project.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                {editingId === project.id ? (
                  <div className="space-y-3">
                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Judul projek" className="w-full px-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground" />
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi projek" rows={2} className="w-full px-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground resize-none" />
                    <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="Skill (pisahkan koma)" className="w-full px-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground" />
                    <input value={form.projectUrl} onChange={(e) => setForm({ ...form, projectUrl: e.target.value })} placeholder="URL projek (opsional)" className="w-full px-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground" />
                    <div className="flex gap-2 justify-end">
                      <button onClick={cancelForm} className="flex items-center gap-1 px-3 py-1.5 text-xs text-muted hover:text-foreground border border-border rounded-lg transition-colors"><X className="w-3 h-3" /> Batal</button>
                      <button onClick={saveProject} disabled={!form.title.trim()} className="flex items-center gap-1 px-3 py-1.5 text-xs text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"><Save className="w-3 h-3" /> Simpan</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground dark:text-white text-sm">{project.title}</h4>
                        <p className="text-xs text-muted dark:text-gray-400 mt-1">{project.description}</p>
                      </div>
                      <div className="flex gap-1 ml-2 flex-shrink-0">
                        <button onClick={() => startEdit(project)} className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setDeleteConfirmId(project.id)} className="p-1.5 rounded-lg text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded text-[10px] font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-[10px] text-primary hover:underline">
                        <ExternalLink className="w-3 h-3" /> Lihat Projek
                      </a>
                    )}
                    {deleteConfirmId === project.id && (
                      <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-xs text-red-600 dark:text-red-400 mb-2">Hapus projek &quot;{project.title}&quot;?</p>
                        <div className="flex gap-2">
                          <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1 text-xs text-muted border border-border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Batal</button>
                          <button onClick={() => deleteProject(project.id)} className="px-3 py-1 text-xs text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">Hapus</button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            {/* Add New Project */}
            {showAdd ? (
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg space-y-3">
                <p className="text-sm font-medium text-foreground">Tambah Projek Baru</p>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Judul projek" className="w-full px-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground" />
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi projek" rows={2} className="w-full px-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground resize-none" />
                <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="Skill (pisahkan koma, cth: React, Node.js)" className="w-full px-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground" />
                <input value={form.projectUrl} onChange={(e) => setForm({ ...form, projectUrl: e.target.value })} placeholder="URL projek (opsional)" className="w-full px-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground" />
                <input value={form.completedAt} onChange={(e) => setForm({ ...form, completedAt: e.target.value })} type="date" placeholder="Tanggal selesai" className="w-full px-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground" />
                <div className="flex gap-2 justify-end">
                  <button onClick={cancelForm} className="flex items-center gap-1 px-3 py-1.5 text-xs text-muted hover:text-foreground border border-border rounded-lg transition-colors"><X className="w-3 h-3" /> Batal</button>
                  <button onClick={saveProject} disabled={!form.title.trim()} className="flex items-center gap-1 px-3 py-1.5 text-xs text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"><Save className="w-3 h-3" /> Simpan</button>
                </div>
              </div>
            ) : (
              <button onClick={startAdd} className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border rounded-lg text-muted hover:border-primary hover:text-primary transition-colors">
                <Plus className="w-4 h-4" /> Tambah Projek Baru
              </button>
            )}
          </div>
        </div>

        {/* Career Matches */}
        <div>
          <h3 className="text-sm font-bold text-foreground dark:text-gray-200 uppercase tracking-wider mb-3">Top Career Matches</h3>
          <div className="space-y-2">
            {careerMatches.slice(0, 3).map((match) => (
              <div key={match.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                <div>
                  <p className="font-medium text-foreground dark:text-white text-sm">{match.title}</p>
                  <p className="text-xs text-muted dark:text-gray-400">{match.category}</p>
                </div>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{match.matchPercentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      {/* Interactive Preview Section */}
      <div className="mt-8">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Interactive Preview</h3>
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">{getInitials(profile.name)}</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
            <p className="text-sm text-muted">{profile.major} - Kelas {profile.grade}</p>
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

          <Card className="lg:col-span-2">
            <SkillRadar skills={allSkills.slice(0, 8)} title="Skill Profile" />
          </Card>
        </div>
      </div>
    </div>
  );
}
