"use client";

import { useState, useEffect, useMemo, memo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "../../lib/theme-context";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface LineChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
    fill?: boolean;
  }[];
  title?: string;
  yMax?: number;
}

const LineChart = memo(function LineChart({ labels, datasets, title, yMax }: LineChartProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 0); return () => clearTimeout(t); }, []);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = ["#2563eb", "#7c3aed", "#10b981", "#f59e0b", "#ef4444"];

  const chartData = useMemo(
    () => ({
      labels,
      datasets: datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.data,
        borderColor: ds.color || colors[i % colors.length],
        backgroundColor: (ds.color || colors[i % colors.length]) + "25",
        fill: ds.fill !== undefined ? ds.fill : i === 0,
        tension: 0.35,
        cubicInterpolationMode: "monotone" as const,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: ds.color || colors[i % colors.length],
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        borderWidth: 3,
        clip: false as const,
      })),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 16 } },
      animation: {
        duration: 1200,
        easing: "easeOutQuart" as const,
      },
      scales: {
        y: {
          beginAtZero: true,
          max: yMax || 100,
          grid: { color: isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,0.6)" },
          ticks: { font: { size: 11 }, color: isDark ? "#94a3b8" : "#475569", stepSize: 20 },
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 }, color: isDark ? "#94a3b8" : "#475569" },
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
    [isDark, yMax]
  );

  if (!ready) return <div className="h-64" />;

  return (
    <div>
      {title && <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>}
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
});

export default LineChart;
