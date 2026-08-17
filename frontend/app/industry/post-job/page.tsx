"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Plus, X, CheckCircle2 } from "lucide-react";
import DashboardHeader from "../../components/layout/dashboardheader";
import Card from "../../components/ui/card";

const suggestedSkills = [
  "JavaScript", "TypeScript", "React/Next.js", "Node.js", "Python",
  "HTML/CSS", "SQL/Database", "Git", "REST API", "Java",
];

export default function PostJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Internship");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <DashboardHeader title="Post Lowongan" subtitle="Buat lowongan baru" role="industry" />
        <Card>
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Lowongan Berhasil Diposting!</h2>
            <p className="text-muted mb-6">Lowongan &quot;{title}&quot; telah berhasil dibuat dan akan terlihat oleh kandidat.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setTitle("");
                  setCompany("");
                  setLocation("");
                  setDescription("");
                  setSalary("");
                  setSelectedSkills([]);
                }}
                className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Post Lowongan Lain
              </button>
              <button
                onClick={() => router.push("/industry")}
                className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
        <DashboardHeader title="Post Lowongan" subtitle="Buat lowongan baru untuk menarik kandidat" role="industry" />

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <h3 className="font-semibold text-foreground mb-4">Informasi Lowongan</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Judul Lowongan *</label>
              <input
                required
                type="text"
                placeholder="Contoh: Frontend Developer Intern"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Perusahaan *</label>
              <input
                required
                type="text"
                placeholder="Contoh: PT Tech Indonesia"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Lokasi *</label>
              <input
                required
                type="text"
                placeholder="Contoh: Jakarta Selatan"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tipe Pekerjaan</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              >
                <option>Internship</option>
                <option>Part Time</option>
                <option>Full Time</option>
                <option>Freelance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Salary Range</label>
              <input
                type="text"
                placeholder="Contoh: Rp 2-4 juta/bulan"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-1.5">Deskripsi *</label>
            <textarea
              required
              rows={4}
              placeholder="Jelaskan tentang pekerjaan, tanggung jawab, dan kualifikasi yang dibutuhkan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
        </Card>

        <Card className="mb-6">
          <h3 className="font-semibold text-foreground mb-4">Skill yang Dibutuhkan</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedSkills.includes(skill)
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {selectedSkills.includes(skill) && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                {skill}
              </button>
            ))}
          </div>
          {selectedSkills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {selectedSkills.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {skill}
                  <button type="button" onClick={() => toggleSkill(skill)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </Card>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            Post Lowongan
          </button>
        </div>
      </form>
    </div>
  );
}
