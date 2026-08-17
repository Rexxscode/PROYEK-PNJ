"use client";

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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  labels: string[];
  data: number[];
  title?: string;
  color?: string;
}

export default function SkillBarChart({ labels, data, title, color = "rgba(37, 99, 235, 0.8)" }: BarChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: color,
        borderRadius: 6,
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 5,
        ticks: { stepSize: 1, font: { size: 11 } },
        grid: { color: "rgba(226, 232, 240, 0.5)" },
      },
      y: {
        ticks: { font: { size: 12 } },
        grid: { display: false },
      },
    },
  };

  return (
    <div>
      {title && <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>}
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}