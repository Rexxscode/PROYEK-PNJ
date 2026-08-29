"use client";

import { forwardRef, useEffect, useRef, useState } from "react";

interface CertificateViewProps {
  studentName: string;
  materiTitle: string;
  majorName: string;
  date: string;
  scale?: number;
}

export function formatIndonesianDate(d: Date): string {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

const PAGE_W = 842.25;
const PAGE_H = 595.5;
const NAVY = "#1e2e4d";
const SERIF = '"Libre Baskerville", Georgia, "Times New Roman", serif';
const SANS = '"Glacial Indifference", "Segoe UI Variable Display", "Segoe UI", system-ui, sans-serif';

const pctX = (x: number) => `${((x / PAGE_W) * 100).toFixed(3)}%`;
const pctY = (y: number) => `${((y / PAGE_H) * 100).toFixed(3)}%`;
const pctW = (w: number) => `${((w / PAGE_W) * 100).toFixed(3)}%`;
const pctH = (h: number) => `${((h / PAGE_H) * 100).toFixed(3)}%`;

function FitText({ text, baseFont, maxWidthPx, style }: { text: string; baseFont: number; maxWidthPx: number; style: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      if (el.scrollWidth > maxWidthPx && el.scrollWidth > 0) {
        setRatio(Math.min(1, (maxWidthPx / el.scrollWidth) * 0.98));
      } else {
        setRatio(1);
      }
    };
    check();
    const t = setTimeout(check, 60);
    const fontsReady = (document as unknown as { fonts?: { ready: Promise<unknown> } }).fonts?.ready;
    if (fontsReady) fontsReady.then(check).catch(() => {});
    return () => clearTimeout(t);
  }, [text, maxWidthPx, style.fontSize]);

  return (
    <div
      ref={ref}
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        fontSize: baseFont * ratio,
        ...style,
      }}
    >
      {text}
    </div>
  );
}

const CertificateView = forwardRef<HTMLDivElement, CertificateViewProps>(
  ({ studentName, materiTitle, majorName, date, scale = 1 }, ref) => {
    const k = scale;
    const px = (v: number) => `${(v * k).toFixed(2)}px`;

    const bodyFont = 14.5 * k;
    const paragraphMaxW = (662.3 - 179.5) * k;

    return (
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{ width: PAGE_W * k, height: PAGE_H * k, backgroundColor: "#ffffff" }}
      >
        {/* Base: render asli PDF tanpa teks (latar, logo, garis, TTD terbake) */}
        <img
          src="/certificates/certificate-clean.png"
          alt=""
          draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill" }}
        />

        {/* Judul */}
        <div
          style={{
            position: "absolute",
            left: pctX(281.6), top: pctY(76.9),
            width: pctW(561 - 281.6), height: pctH(143.6 - 76.9),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: SANS, fontWeight: 800, fontSize: px(55.5),
            color: NAVY, letterSpacing: "0.05em",
            textShadow: "1px 0 0 " + NAVY,
            whiteSpace: "nowrap",
          }}
        >
          SERTIFIKAT
        </div>

        {/* PENYELESAIAN MATERI */}
        <div
          style={{
            position: "absolute",
            left: pctX(292.6), top: pctY(147.5),
            width: pctW(545.1 - 292.6), height: pctH(169.1 - 147.5),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: SERIF, fontWeight: 700, fontSize: px(17.4),
            color: NAVY, letterSpacing: "0.12em",
            whiteSpace: "nowrap",
          }}
        >
          PENYELESAIAN MATERI
        </div>

        {/* Subtitle */}
        <div
          style={{
            position: "absolute",
            left: pctX(278.5), top: pctY(181.9),
            width: pctW(564 - 278.5), height: pctH(204.4 - 181.9),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: SERIF, fontWeight: 400, fontSize: px(18.1),
            color: NAVY,
            whiteSpace: "nowrap",
          }}
        >
          Sertifikat Ini Di Berikan Untuk
        </div>

        {/* Nama siswa */}
        <FitText
          text={studentName}
          baseFont={19.1 * k}
          maxWidthPx={(485.4 - 352.4) * k}
          style={{
            position: "absolute",
            left: pctX(352.4), top: pctY(244.6),
            width: pctW(485.4 - 352.4), height: pctH(268.3 - 244.6),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: SERIF, fontWeight: 700, fontSize: 19.1 * k,
            color: NAVY,
          }}
        />

        {/* Paragraf badan (3 baris, koordinat relatif root) */}
        <FitText
          text={`Diberikan kepada ${studentName} sebagai pengakuan telah`}
          baseFont={bodyFont}
          maxWidthPx={paragraphMaxW}
          style={{ position: "absolute", left: pctX(179.5), top: pctY(303.5), width: pctW(662.3 - 179.5), height: pctH(321.5 - 303.5), textAlign: "center", fontFamily: SERIF, color: NAVY, lineHeight: 1 }}
        />
        <FitText
          text={`menyelesaikan materi pembelajaran ${materiTitle} pada jurusan`}
          baseFont={bodyFont}
          maxWidthPx={paragraphMaxW}
          style={{ position: "absolute", left: pctX(179.5), top: pctY(332), width: pctW(662.3 - 179.5), height: pctH(350 - 332), textAlign: "center", fontFamily: SERIF, color: NAVY, lineHeight: 1 }}
        />
        <FitText
          text={`${majorName}.`}
          baseFont={bodyFont}
          maxWidthPx={paragraphMaxW}
          style={{ position: "absolute", left: pctX(179.5), top: pctY(360.6), width: pctW(662.3 - 179.5), height: pctH(378.6 - 360.6), textAlign: "center", fontFamily: SERIF, color: NAVY, lineHeight: 1 }}
        />

        {/* Tanggal */}
        <div
          style={{
            position: "absolute",
            left: pctX(600), top: pctY(402.2),
            width: pctW(684.7 - 625.1), height: pctH(419.9 - 402.2),
            display: "flex", alignItems: "center",
            fontFamily: SERIF, fontWeight: 400, fontSize: px(14.26),
            color: NAVY, whiteSpace: "nowrap",
          }}
        >
          {date}
        </div>

        {/* Nama pendiri */}
        <div
          style={{
            position: "absolute",
            left: pctX(614.4), top: pctY(490.8),
            width: pctW(696.3 - 614.4), height: pctH(503.5 - 490.8),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: SERIF, fontWeight: 400, fontSize: px(10.3),
            color: NAVY, whiteSpace: "nowrap",
          }}
        >
          Sofian Bahtiar
        </div>

        {/* PENDIRI SKILLMATCH */}
        <div
          style={{
            position: "absolute",
            left: pctX(585.5), top: pctY(520.2),
            width: pctW(725.3 - 585.5), height: pctH(532.9 - 520.2),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: SERIF, fontWeight: 700, fontSize: px(10.3),
            color: NAVY, letterSpacing: "0.08em", whiteSpace: "nowrap",
          }}
        >
          PENDIRI SKILLMATCH
        </div>
      </div>
    );
  }
);

CertificateView.displayName = "CertificateView";

export default CertificateView;