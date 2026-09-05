"use client";

import { useState } from "react";
import { KeyRound, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import Card from "../components/ui/card";
import { useAuth } from "../lib/auth-context";
import { useToast } from "../lib/toast-context";

export default function ChangePasswordForm() {
  const { changePassword } = useAuth();
  const { toast } = useToast();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);

  const valid =
    current.length > 0 &&
    newPass.length >= 8 &&
    newPass === confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setSaving(true);
    try {
      await changePassword(current, newPass);
      toast("Password berhasil diubah. Silakan login kembali.");
      setCurrent("");
      setNewPass("");
      setConfirm("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal mengubah password";
      toast(msg, "error");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";

  return (
    <Card className="p-6 max-w-lg">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <KeyRound className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Ubah Password</h3>
          <p className="text-xs text-muted">Perbarui password akun kamu. Setelah diubah, kamu akan diminta login kembali.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Password Saat Ini</label>
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Masukkan password saat ini"
            className={inputCls}
            autoComplete="current-password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Password Baru</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Minimal 8 karakter"
              className={inputCls}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {newPass.length > 0 && newPass.length < 8 && (
            <p className="text-xs text-red-500 mt-1">Password minimal 8 karakter.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Konfirmasi Password Baru</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Ulangi password baru"
            className={inputCls}
            autoComplete="new-password"
          />
          {confirm.length > 0 && confirm !== newPass && (
            <p className="text-xs text-red-500 mt-1">Konfirmasi password tidak cocok.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!valid || saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
          {saving ? "Menyimpan..." : "Simpan Password Baru"}
        </button>
      </form>
    </Card>
  );
}