"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Mail, Lock, User, BookOpen } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [grade, setGrade] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/student/assessment");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SkillMatch
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Buat Akun Baru</h1>
          <p className="text-sm text-muted mt-2">Mulai perjalanan kariermu bersama SkillMatch</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="name"
                  type="text"
                  placeholder="Budi Santoso"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="email"
                  type="email"
                  placeholder="budi@student.smk.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                    className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none bg-white"
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
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none bg-white"
                >
                  <option value="">Pilih</option>
                  <option value="x">X</option>
                  <option value="xi">XI</option>
                  <option value="xii">XII</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="password"
                  type="password"
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>
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