"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  title?: string;
  colors?: string[];
  centerLabel?: string;
}

const defaultColors = [
  "#2563eb",
  "#7c3aed",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1",
];

export default function DoughnutChart({
  labels,
  data,
  title,
  colors = defaultColors,
  centerLabel,
}: DoughnutChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const centerPlugin = centerLabel
    ? {
        id: "centerText" as const,
        beforeDraw(chart: ChartJS) {
          const { ctx, width, height } = chart;
          const isDark = document.documentElement.classList.contains("dark");
          ctx.save();
          ctx.font = "bold 20px system-ui, sans-serif";
          ctx.fillStyle = isDark ? "#e2e8f0" : "#0f172a";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(centerLabel, width / 2, height / 2);
          ctx.restore();
        },
      }
    : undefined;

  return (
    <div>
      {title && <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>}
      <div className="h-56 flex items-center justify-center">
        <Doughnut
          data={chartData}
          plugins={centerPlugin ? [centerPlugin] : []}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "65%",
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  padding: 12,
                  usePointStyle: true,
                  pointStyle: "circle",
                  font: { size: 11 },
                  color: "#94a3b8",
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
          }}
        />
      </div>
    </div>
  );
}
