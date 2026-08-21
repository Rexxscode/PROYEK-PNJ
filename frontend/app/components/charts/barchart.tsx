"use client";

import { useState, useEffect, useMemo, memo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "../../lib/theme-context";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  labels: string[];
  data: number[];
  title?: string;
  color?: string;
}

const SkillBarChart = memo(function SkillBarChart({ labels, data, title, color = "rgba(37, 99, 235, 0.8)" }: BarChartProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 0); return () => clearTimeout(t); }, []);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const gridColor = isDark ? "rgba(148,163,184,0.15)" : "rgba(226, 232, 240, 0.5)";
  const tickColor = isDark ? "#94a3b8" : "#374151";

  const truncatedLabels = useMemo(() => labels.map((l) => l.length > 16 ? l.slice(0, 14) + "…" : l), [labels]);
  const dataMax = useMemo(() => Math.max(...data, 1), [data]);

  const chartData = useMemo(
    () => ({
      labels: truncatedLabels,
      datasets: [
        {
          data,
          backgroundColor: color,
          borderRadius: 6,
          barThickness: 18,
        },
      ],
    }),
    [truncatedLabels, data, color]
  );

  const options = useMemo(
    () => ({
      indexAxis: "y" as const,
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1200,
        easing: "easeOutQuart" as const,
      },
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          beginAtZero: true,
          max: Math.ceil(dataMax * 1.15),
          ticks: { stepSize: 1, font: { size: 11 }, color: tickColor },
          grid: { color: gridColor },
        },
        y: {
          ticks: {
            font: { size: 11 },
            color: tickColor,
            callback: function(value: string | number) {
              const label = typeof value === "number" ? truncatedLabels[value] : String(value);
              return label && label.length > 14 ? label.slice(0, 12) + "…" : label;
            }
          },
          grid: { display: false },
        },
      },
    }),
    [truncatedLabels, dataMax, tickColor, gridColor]
  );

  if (!ready) return <div className="h-64" />;

  return (
    <div>
      {title && <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>}
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
});

export default SkillBarChart;
