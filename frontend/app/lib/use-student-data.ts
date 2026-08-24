"use client";

import { useCallback, useEffect, useState } from "react";
import { getStoredToken, studentAPI } from "./api";
import type { StudentData } from "./mock-data";

/**
 * Mengambil data student lengkap dari backend untuk user yang sedang login.
 * Data lama di halaman masih memakai mock; tahap integrasi ini menukarnya
 * secara bertahap ke hook ini.
 */
export function useStudentData() {
  const [data, setData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const token = getStoredToken();
    const userId = typeof window !== "undefined" ? localStorage.getItem("loggedUserId") : null;

    if (!token || !userId) {
      throw new Error("Sesi tidak ditemukan");
    }

    const result = await studentAPI.getById(userId, token);
    setData(result);
    setError(null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    // Data fetching: semua setState hanya terjadi setelah request selesai (asinkron).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh().catch((err) => {
      if (cancelled) return;
      setError(err instanceof Error ? err.message : "Gagal memuat data");
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  return { data, loading, error, refresh };
}
