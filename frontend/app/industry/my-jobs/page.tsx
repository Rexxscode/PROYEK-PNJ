"use client";

import { useState, useEffect } from "react";
import { Edit3, Trash2, MapPin, Calendar, Plus, X, CheckCircle2, Briefcase } from "lucide-react";
import Link from "next/link";
import DashboardHeader from "../../components/layout/dashboardheader";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import ConfirmDialog from "../../components/ui/confirm-dialog";
import { useToast } from "../../lib/toast-context";
import { getStoredToken, jobAPI } from "../../lib/api";
import type { JobOpportunity } from "../../lib/type";

const typeLabels: Record<string, string> = { magang: "Magang", fulltime: "Full-time", parttime: "Part-time", freelance: "Freelance" };

const allSuggestedSkills = [
  "JavaScript", "TypeScript", "React/Next.js", "Node.js", "Python",
  "HTML/CSS", "SQL/Database", "Git", "REST API", "Java",
  "Figma", "UI/UX Design", "Adobe Photoshop", "Adobe Illustrator",
  "Video Editing", "Motion Graphics", "Copywriting", "Digital Marketing",
  "Cisco Networking", "MikroTik", "Linux Administration", "Cloud (AWS/GCP)",
  "Fiber Optik", "Radio Frequency", "Network Engineering", "Teknik Mekanik Radio", "Operator Radio",
  "Problem Solving", "Communication", "Team Leadership",
];

const jobId = (id: string) => Number(id.replace("job-", ""));

export default function MyJobsPage() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [editJob, setEditJob] = useState<JobOpportunity | null>(null);
  const [editForm, setEditForm] = useState({ title: "", company: "", location: "", type: "magang" as string, description: "", skills: [] as string[], deadline: "", salary: "" });
  const [editSkillInput, setEditSkillInput] = useState("");

  useEffect(() => {
    const token = getStoredToken();
    const load = token
      ? jobAPI.getAll(token, true)
      : Promise.reject(new Error("Sesi tidak ditemukan"));

    load
      .then((list) => {
        setJobs(list);
        setError("");
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Gagal memuat data"))
      .finally(() => setMounted(true));
  }, []);

  const handleDelete = () => {
    if (!deleteTarget) return;
    const token = getStoredToken();
    if (!token) return;
    jobAPI
      .delete(String(jobId(deleteTarget.id)), token)
      .then(() => {
        setJobs((prev) => prev.filter((j) => j.id !== deleteTarget.id));
        toast(`Lowongan "${deleteTarget.title}" berhasil dihapus`, "success");
      })
      .catch((err) => toast(err instanceof Error ? err.message : "Gagal menghapus lowongan", "error"))
      .finally(() => setDeleteTarget(null));
  };

  const openEdit = (job: JobOpportunity) => {
    setEditJob(job);
    setEditForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      description: job.description,
      skills: [...job.requiredSkills],
      deadline: job.deadline || "",
      salary: job.salary || "",
    });
  };

  const toggleEditSkill = (skill: string) => {
    setEditForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }));
  };

  const addCustomSkill = () => {
    const s = editSkillInput.trim();
    if (s && !editForm.skills.includes(s)) {
      setEditForm((prev) => ({ ...prev, skills: [...prev.skills, s] }));
      setEditSkillInput("");
    }
  };

  const handleSaveEdit = async () => {
    if (!editJob) return;
    const token = getStoredToken();
    if (!token) return;
    setSaving(true);
    try {
      const updated = await jobAPI.update(String(jobId(editJob.id)), {
        title: editForm.title,
        company: editForm.company,
        location: editForm.location,
        type: editForm.type as JobOpportunity["type"],
        description: editForm.description,
        requiredSkills: editForm.skills,
        deadline: editForm.deadline || null,
        salary: editForm.salary || null,
      }, token);
      setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
      toast(`Lowongan "${editForm.title}" berhasil diperbarui`, "success");
      setEditJob(null);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal memperbarui lowongan", "error");
    } finally {
      setSaving(false);
    }
  };

  if (!mounted) return null;

  if (error) {
    return (
      <div>
        <DashboardHeader
          title="Lowongan Saya"
          subtitle="Kelola lowongan yang sudah kamu posting"
          role="industry"
          actions={
            <Link href="/industry/post-job" className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Post Lowongan</span>
            </Link>
          }
        />
        <Card className="text-center py-12">
          <p className="text-foreground font-medium">{error || "Memuat data..."}</p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader
        title="Lowongan Saya"
        subtitle="Kelola lowongan yang sudah kamu posting"
        role="industry"
        actions={
          <Link href="/industry/post-job" className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Post Lowongan</span>
          </Link>
        }
      />

      {jobs.length === 0 ? (
        <Card className="text-center py-12">
          <Briefcase className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-foreground font-medium">Belum ada lowongan diposting</p>
          <p className="text-sm text-muted mt-1">Buat lowongan pertamamu untuk menarik kandidat</p>
        </Card>
      ) : (
        <>
        <p className="text-sm text-muted mb-4">Total {jobs.length} lowongan aktif</p>

        <div className="space-y-4">
          {jobs.map((job) => (
          <Card key={job.id}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">{job.title}</h3>
                  <Badge variant="primary">{typeLabels[job.type] || job.type}</Badge>
                </div>
                <p className="text-sm text-muted mb-2">{job.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Deadline: {job.deadline || "-"}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.requiredSkills.map((sk) => (
                    <span key={sk} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full font-medium">{sk}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 sm:flex-col">
                <button
                  onClick={() => openEdit(job)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-border text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget({ id: job.id, title: job.title })}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 dark:border-red-800 text-red-500 text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
        </>
      )}

      {/* Edit Modal */}
      {editJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setEditJob(null)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="font-bold text-foreground text-lg">Edit Lowongan</h3>
              <button onClick={() => setEditJob(null)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Judul Lowongan *</label>
                <input type="text" value={editForm.title} onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Perusahaan *</label>
                  <input type="text" value={editForm.company} onChange={(e) => setEditForm((p) => ({ ...p, company: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Lokasi *</label>
                  <input type="text" value={editForm.location} onChange={(e) => setEditForm((p) => ({ ...p, location: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Tipe Pekerjaan</label>
                  <select value={editForm.type} onChange={(e) => setEditForm((p) => ({ ...p, type: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-800 dark:text-gray-200">
                    <option value="magang">Magang</option>
                    <option value="parttime">Part Time</option>
                    <option value="fulltime">Full Time</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Deadline</label>
                  <input type="date" value={editForm.deadline} onChange={(e) => setEditForm((p) => ({ ...p, deadline: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Salary Range</label>
                <input type="text" value={editForm.salary} onChange={(e) => setEditForm((p) => ({ ...p, salary: e.target.value }))}
                  placeholder="Contoh: Rp 2-4 juta/bulan"
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Deskripsi *</label>
                <textarea rows={3} value={editForm.description} onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Skill yang Dibutuhkan</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {allSuggestedSkills.map((skill) => (
                    <button key={skill} type="button" onClick={() => toggleEditSkill(skill)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                        editForm.skills.includes(skill)
                          ? "bg-primary text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}>
                      {skill}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input type="text" value={editSkillInput} onChange={(e) => setEditSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSkill())}
                    placeholder="Tambah skill custom..."
                    className="flex-1 px-3 py-1.5 border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  <button type="button" onClick={addCustomSkill}
                    className="px-3 py-1.5 bg-primary text-white text-xs rounded-lg hover:bg-primary-dark transition-colors">
                    Tambah
                  </button>
                </div>
                {editForm.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {editForm.skills.map((skill) => (
                      <span key={skill} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[11px] font-medium">
                        {skill}
                        <button type="button" onClick={() => toggleEditSkill(skill)}><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-border">
              <button onClick={() => setEditJob(null)}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Batal
              </button>
              <button onClick={handleSaveEdit} disabled={saving}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus Lowongan?"
        message={`Lowongan "${deleteTarget?.title}" akan dihapus permanen dan tidak bisa dikembalikan.`}
        confirmLabel="Ya, Hapus"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
