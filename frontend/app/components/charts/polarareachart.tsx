"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface PolarAreaChartProps {
  labels: string[];
  data: number[];
  title?: string;
  colors?: string[];
}

const defaultColors = [
  "#2563ebcc",
  "#7c3aedcc",
  "#06b6d4cc",
  "#10b981cc",
  "#f59e0bcc",
  "#ef4444cc",
  "#ec4899cc",
  "#6366f1cc",
];

export default function PolarAreaChart({
  labels,
  data,
  title,
  colors = defaultColors,
}: PolarAreaChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div>
      {title && <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>}
      <div className="h-56 flex items-center justify-center">
        <PolarArea
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                beginAtZero: true,
                grid: { color: "rgba(148,163,184,0.15)" },
                ticks: { display: false },
              },
            },
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
