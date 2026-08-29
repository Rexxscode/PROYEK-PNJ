"use client";

import { useState, useEffect } from "react";
import { User, Mail, BookOpen, GraduationCap, IdCard, Upload, Trash2, Camera, BadgeCheck, CheckCircle2, Clock } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import DashboardHeader from "../../components/layout/dashboardheader";
import { SkeletonDashboard } from "../../components/ui/skeleton";
import {
  getCurrentStudent,
  isRegisteredStudent,
  getStudentCardDataUrl,
  getStudentCardStatus,
  saveStudentCardToProfile,
  removeStudentCard,
} from "../../lib/mock-data";
import { useToast } from "../../lib/toast-context";

export default function StudentProfilePage() {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [photo, setPhoto] = useState("");
  const [card, setCard] = useState<string | null>(null);
  const [cardPending, setCardPending] = useState<{ dataUrl: string; name: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [cardStatus, setCardStatus] = useState<"none" | "pending" | "approved">("none");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const email = localStorage.getItem("studentEmail") || "";
    setPhoto(localStorage.getItem("profilePhoto") || "");
    setCard(isRegisteredStudent(email) ? getStudentCardDataUrl(email) : null);
    setCardStatus(isRegisteredStudent(email) ? getStudentCardStatus(email) : "approved");
  }, [mounted]);

  if (!mounted) return <div className="p-6 lg:pl-72"><SkeletonDashboard /></div>;

  const student = getCurrentStudent();
  if (!student) return <div className="p-6 lg:pl-72"><SkeletonDashboard /></div>;
  const { profile } = student;
  const email = localStorage.getItem("studentEmail") || profile.email;
  const isRegistered = isRegisteredStudent(email);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast("Ukuran foto maksimal 2MB", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPhoto(dataUrl);
      localStorage.setItem("profilePhoto", dataUrl);
      toast(`Foto profil diperbarui`);
    };
    reader.readAsDataURL(file);
  };

  const handleCardFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast("Ukuran foto kartu pelajar maksimal 2MB", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCardPending({ dataUrl: ev.target?.result as string, name: file.name });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCard = () => {
    if (!cardPending) return;
    setSaving(true);
    const ok = saveStudentCardToProfile(email, cardPending.dataUrl);
    if (ok) {
      setCard(cardPending.dataUrl);
      setCardStatus("pending");
      setCardPending(null);
      toast("Kartu pelajar dikirim untuk verifikasi admin.");
    } else {
      toast("Gagal menyimpan kartu pelajar", "error");
    }
    setSaving(false);
  };

  const handleRemoveCard = () => {
    removeStudentCard(email);
    setCard(null);
    setCardStatus("none");
    setCardPending(null);
    toast("Kartu pelajar dihapus", "warning");
  };

  return (
    <div>
      <DashboardHeader
        title="Profil Saya"
        subtitle="Kelola foto profil dan kartu pelajar"
        showNotifications
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Info */}
        <Card>
          <div className="flex items-center gap-4 mb-6">
            {photo ? (
              <img src={photo} alt={profile.name} className="w-16 h-16 rounded-full object-cover border border-border" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-foreground">{profile.name}</h3>
              <p className="text-xs text-muted">{email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="primary">{profile.major}</Badge>
                <Badge variant="secondary">Kelas {profile.grade}</Badge>
                <Badge variant={isRegistered ? "warning" : "success"}>
                  {isRegistered ? "Registrasi Baru" : "Siswa Terdaftar"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <Mail className="w-4 h-4 text-muted flex-shrink-0" />
              <span className="text-muted break-all">{email}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <BookOpen className="w-4 h-4 text-muted flex-shrink-0" />
              <span className="text-foreground">{profile.major}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <GraduationCap className="w-4 h-4 text-muted flex-shrink-0" />
              <span className="text-foreground">Kelas {profile.grade}</span>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {/* Profile Photo */}
          <Card>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Camera className="w-4 h-4 text-primary" /> Foto Profil
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {photo ? (
                <img src={photo} alt="Foto profil" className="w-20 h-20 rounded-full object-cover border border-border" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 text-muted flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2 text-sm bg-card border border-border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-foreground">
                <Upload className="w-4 h-4" />
                Pilih Foto
                <input id="photo-upload" type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              </label>
            </div>
          </Card>

          {/* Kartu Pelajar */}
          <Card className="border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <IdCard className="w-4 h-4 text-primary" /> Kartu Pelajar
              </h3>
              <Badge
                variant={cardStatus === "approved" ? "success" : "warning"}
              >
                {cardStatus === "approved" ? "Disetujui" : cardStatus === "pending" ? "Menunggu Verifikasi" : "Belum Diunggah"}
              </Badge>
            </div>

            {isRegistered ? (
              <div className="space-y-4">
                <p className="text-sm text-muted">
                  Fitur asesmen, sertifikat, roadmap, dan lowongan terbuka setelah kartu pelajar
                  diverifikasi admin. Kamu tetap bisa login tanpa menunggu persetujuan.
                </p>
                {cardPending ? (
                  <div>
                    <img src={cardPending.dataUrl} alt="Preview kartu pelajar" className="mt-2 h-36 w-56 object-cover rounded-xl border border-border" />
                    <p className="text-xs text-muted mt-2">{cardPending.name}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        onClick={handleSaveCard}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {saving ? "Menyimpan..." : "Simpan Kartu"}
                      </button>
                      <button
                        onClick={() => { setCardPending(null); }}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-card border border-border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-foreground"
                      >
                        Batal
                      </button>
                    </div>
                    <p className="text-xs text-muted mt-3 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Setelah disimpan, kartu akan dicek admin sebelum fitur dibuka.
                    </p>
                  </div>
                ) : card ? (
                  <div>
                    <img src={card} alt="Kartu pelajar" className="h-36 w-56 object-cover rounded-xl border border-border" />
                    <div className={`flex items-center gap-2 mt-3 text-xs ${cardStatus === "approved" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                      {cardStatus === "approved" ? <BadgeCheck className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      {cardStatus === "approved"
                        ? "Kartu disetujui admin — semua fitur aktif."
                        : "Kartu sedang diverifikasi admin. Fitur terbuka otomatis setelah disetujui."}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <label className="flex items-center gap-2 px-4 py-2 text-sm bg-card border border-border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-foreground">
                        <Upload className="w-4 h-4" /> Ganti Kartu
<input id="card-upload" type="file" accept="image/*" onChange={handleCardFile} className="hidden" />
                      </label>
                      <button
                        onClick={handleRemoveCard}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Hapus
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex items-center gap-3 px-4 py-3 border border-dashed border-border rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors">
                    <IdCard className="w-5 h-5 text-primary flex-shrink-0" />
                    <input type="file" accept="image/*" onChange={handleCardFile} className="hidden" />
                    <span className="text-sm text-muted truncate">Upload foto kartu pelajar (maks 2MB)</span>
                    <span className="ml-auto text-xs font-medium text-primary flex-shrink-0">Pilih</span>
                  </label>
                )}
              </div>
            ) : (
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm text-muted">
                Akun siswa terdaftar ini memiliki akses penuh tanpa perlu kartu pelajar.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}