import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ResultsVisualizationProps {
  results: any[]
}

export default function ResultsVisualization({ results }: ResultsVisualizationProps) {
  const data = {
    labels: results.map((r) => r.timestamp),
    datasets: [
      {
        label: "Confidence Score",
        data: results.map((r) => r.confidenceScore),
        backgroundColor: "rgba(59, 130, 246, 0.5)", // Blue color
        borderColor: "rgb(29, 78, 216)", // Darker blue
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Deepfake Detection Results",
        font: {
          size: 16,
          weight: "bold",
        },
        color: "#1e40af", // Dark blue color
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <Bar options={options} data={data} />
    </div>
  )
}
