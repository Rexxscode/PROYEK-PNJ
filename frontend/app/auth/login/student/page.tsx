import Link from "next/link";
import RoleLoginForm from "../../../components/auth/role-login-form";

export default function StudentLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/5 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <img src="/logo-skillmatch-baru.png" alt="SkillMatch" className="w-10 h-10 rounded-xl object-contain" />
            <span className="text-2xl font-bold text-primary">
              SkillMatch
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Login Siswa / SMK</h1>
          <p className="text-sm text-muted mt-2">Masuk untuk melanjutkan asesmen dan kariermu.</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          <RoleLoginForm chosenRole="student" roleLabel="Siswa / SMK" redirectTo="/student" />
        </div>
      </div>
    </div>
  );
}