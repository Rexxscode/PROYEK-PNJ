"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { authAPI, setStoredToken } from "../../lib/api";
import { useToast } from "../../lib/toast-context";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }
    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }
    try {
      const { token, user } = await authAPI.login(email, password);
      setStoredToken(token);
      localStorage.setItem("studentEmail", user.email);
      localStorage.setItem("loggedUserName", user.name);
      localStorage.setItem("loggedUserRole", user.role);
      setError("");
      toast(`Selamat datang, ${user.name}!`, "success");
      if (user.role === "admin") {
        router.push("/admin");
      } else if (user.role === "industry") {
        router.push("/industry");
      } else {
        router.push("/student");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login gagal";
      setError(message);
      toast(message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <img src="/logo-skillmatch-baru.png" alt="SkillMatch" className="w-10 h-10 rounded-xl object-contain" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SkillMatch
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Masuk ke Akun</h1>
          <p className="text-sm text-muted mt-2">Selamat datang kembali! Silakan masuk.</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="email"
                  type="email"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
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
              className="w-full py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark dark:bg-primary dark:hover:bg-primary-light transition-colors shadow-lg shadow-primary/25"
            >
              Masuk
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted">
              Belum punya akun?{" "}
              <Link href="/auth/register" className="font-medium text-primary hover:text-primary-dark transition-colors">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}