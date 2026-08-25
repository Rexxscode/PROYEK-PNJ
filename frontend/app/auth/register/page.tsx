"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, BookOpen, Building2, Eye, EyeOff } from "lucide-react";
import { registerUser } from "../../lib/mock-data";
import { useToast } from "../../lib/toast-context";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState<"student" | "industry">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [major, setMajor] = useState("");
  const [grade, setGrade] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Nama dan email harus diisi");
      return;
    }
    if (role === "student" && (!major || !grade)) {
      setError("Jurusan dan kelas harus diisi");
      return;
    }
    if (role === "industry" && !company) {
      setError("Nama perusahaan harus diisi");
      return;
    }
    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }
    const success = registerUser({
      email,
      password,
      name,
      major: role === "industry" ? "Industry" : major,
      grade: role === "industry" ? "-" : grade,
      role,
      company: role === "industry" ? company : undefined,
      status: role === "industry" ? "pending" : undefined,
    });
    if (!success) {
      setError("Email sudah terdaftar, gunakan email lain");
      toast("Email sudah terdaftar", "error");
      return;
    }
    if (role === "industry") {
      toast("Registrasi berhasil! Menunggu persetujuan admin.", "success");
      router.push("/auth/pending");
      return;
    }
    toast("Registrasi berhasil! Silakan masuk.", "success");
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <img src="/logo-skillmatch-baru.png" alt="SkillMatch" className="w-10 h-10 rounded-xl object-contain" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SkillMatch
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Buat Akun Baru</h1>
          <p className="text-sm text-muted mt-2">Mulai perjalanan kariermu bersama SkillMatch</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          {/* Role Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                role === "student"
                  ? "bg-primary text-white shadow"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Siswa / SMK
            </button>
            <button
              type="button"
              onClick={() => setRole("industry")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                role === "industry"
                  ? "bg-primary text-white shadow"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Perusahaan / Industry
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                {role === "industry" ? "Nama PIC (Person In Charge)" : "Nama Lengkap"}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="name"
                  type="text"
                  placeholder={role === "industry" ? "Nama penanggung jawab" : "Masukkan nama lengkap"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {role === "industry" && (
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1.5">
                  Nama Perusahaan
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="company"
                    type="text"
                    placeholder="PT Contoh Indonesia"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="email"
                  type="email"
                  placeholder={role === "industry" ? "hrd@perusahaan.com" : "nama@siswa.smk.id"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {role === "student" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="major" className="block text-sm font-medium text-foreground mb-1.5">
                    Jurusan
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <select
                      id="major"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none"
                    >
                      <option value="">Pilih</option>
                      <option value="rpl">Rekayasa Perangkat Lunak</option>
                      <option value="dkv">Desain Komunikasi Visual</option>
                      <option value="tt">Teknik Transmisi</option>
                      <option value="tkj">Teknik Komputer dan Jaringan</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-foreground mb-1.5">
                    Kelas
                  </label>
                  <select
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none"
                  >
                    <option value="">Pilih</option>
                    <option value="x">X</option>
                    <option value="xi">XI</option>
                    <option value="xii">XII</option>
                    <option value="alumni">Alumni</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-border rounded-xl text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
            >
              Daftar Sekarang
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted">
              Sudah punya akun?{" "}
              <Link href="/auth/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
