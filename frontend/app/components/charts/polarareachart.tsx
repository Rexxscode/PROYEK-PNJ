"use client";

import { useState, useEffect, useMemo, memo } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { useTheme } from "../../lib/theme-context";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface PolarAreaChartProps {
  labels: string[];
  data: number[];
  title?: string;
  colors?: string[];
}

const defaultColors = [
  "#2563ebcc", "#7c3aedcc", "#06b6d4cc", "#10b981cc",
  "#f59e0bcc", "#ef4444cc", "#ec4899cc", "#6366f1cc",
];

const PolarAreaChart = memo(function PolarAreaChart({
  labels,
  data,
  title,
  colors = defaultColors,
}: PolarAreaChartProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 0); return () => clearTimeout(t); }, []);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1200,
        easing: "easeOutQuart" as const,
      },
      scales: {
        r: {
          beginAtZero: true,
          grid: { color: isDark ? "rgba(148,163,184,0.15)" : "rgba(226,232,240,0.6)" },
          ticks: { display: false },
        },
      },
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            padding: 12,
            usePointStyle: true,
            pointStyle: "circle" as const,
            font: { size: 11 },
            color: isDark ? "#94a3b8" : "#475569",
          },
        },
        tooltip: {
          backgroundColor: "#1e293b",
          titleColor: "#f8fafc",
          bodyColor: "#cbd5e1",
          padding: 10,
          cornerRadius: 8,
          titleFont: { size: 12 },
          bodyFont: { size: 11 },
        },
      },
    }),
    [isDark]
  );

  if (!ready) return <div className="h-56" />;

  return (
    <div>
      {title && <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>}
      <div className="h-56 flex items-center justify-center">
        <PolarArea data={chartData} options={options} />
      </div>
    </div>
  );
});

export default PolarAreaChart;
