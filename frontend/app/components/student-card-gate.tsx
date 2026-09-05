"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { BadgeCheck, Lock, Upload, Clock, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../lib/auth-context";

type CardStatus = "none" | "pending" | "approved";

interface CardGateContextValue {
  cardStatus: CardStatus;
  approved: boolean;
}

const CardGateContext = createContext<CardGateContextValue>({
  cardStatus: "none",
  approved: false,
});

export function useCardStatus(): CardGateContextValue {
  return useContext(CardGateContext);
}

/**
 * Partially gate student features: instead of blocking the whole dashboard,
 * render the page content while showing an informative banner. Individual
 * interactive actions (assessment, quiz, job apply) should be wrapped in
 * <CardLock> to prompt students to approve their student card first.
 */
export default function StudentCardGate({
  children,
  skip = false,
}: {
  children: React.ReactNode;
  skip?: boolean;
}) {
  const { user, loading } = useAuth();
  const [ready, setReady] = useState(false);
  const [cardStatus, setCardStatus] = useState<CardStatus>("none");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (skip) {
      setCardStatus("approved");
      setReady(true);
      return;
    }
    if (loading) {
      setReady(false);
      return;
    }
    const status = user?.student?.card_status ?? "none";
    setCardStatus(status);
    setReady(true);
  }, [skip, user, loading]);

  if (!ready) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const approved = cardStatus === "approved";

  return (
    <CardGateContext.Provider value={{ cardStatus, approved }}>
      {!approved && !dismissed && !skip && (
        <CardBanner cardStatus={cardStatus} onDismiss={() => setDismissed(true)} />
      )}
      {children}
    </CardGateContext.Provider>
  );
}

function CardBanner({
  cardStatus,
  onDismiss,
}: {
  cardStatus: CardStatus;
  onDismiss: () => void;
}) {
  const pending = cardStatus === "pending";
  const message = pending
    ? "Kartu pelajarmu sedang menunggu verifikasi admin. Kamu bisa menjelajahi dashboard, tetapi asesmen, sertifikat, dan lamaran pekerjaan baru terbuka setelah kartu disetujui."
    : "Kamu belum melengkapi Kartu Pelajar. Fitur asesmen, sertifikat, dan lamaran pekerjaan akan terbuka setelah kartu pelajar diunggah dan disetujui.";

  return (
    <Link
      href="/student/profile"
      className={[
        "group flex items-start gap-3 rounded-2xl border p-4 pr-10 mb-6 relative",
        "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors",
      ].join(" ")}
    >
      <div
        className={[
          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
          "bg-amber-100 dark:bg-amber-900/40",
        ].join(" ")}
      >
        {pending ? (
          <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        ) : (
          <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-0.5">
          {pending ? "Kartu Pelajar Sedang Diverifikasi" : "Lengkapi Kartu Pelajar"}
        </p>
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">{message}</p>
      </div>
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 group-hover:text-amber-900 dark:group-hover:text-amber-100 mt-0.5">
        {pending ? (
          <>
            <BadgeCheck className="w-4 h-4" />
            Cek Status
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Upload Kartu
          </>
        )}
      </span>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDismiss();
        }}
        aria-label="Tutup banner"
        className="absolute top-3 right-3 p-1 rounded-lg text-amber-500 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </Link>
  );
}

/**
 * Wraps an interactive action (e.g. "Mulai Asesmen", "Apply", quiz start).
 * When the student card is not approved, the action is replaced with a locked
 * prompt that links to the profile page. When approved, children render normally.
 */
export function CardLock({
  children,
  pendingTitle = "Fitur Belum Terbuka",
}: {
  children: React.ReactNode;
  pendingTitle?: string;
}) {
  const { approved, cardStatus } = useCardStatus();

  if (approved) {
    return <>{children}</>;
  }

  const pending = cardStatus === "pending";

  return (
    <Link
      href="/student/profile"
      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-medium rounded-xl cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors no-underline"
      aria-label={pendingTitle}
    >
      {pending ? <Clock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
      {pending ? "Menunggu Verifikasi" : "Lengkapi Kartu untuk Mengakses"}
    </Link>
  );
}