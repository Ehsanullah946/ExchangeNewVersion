// components/RevenueChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ data, title }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#4f46e5',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          callback: function (value) {
            return '$' + (value / 1000).toFixed(0) + 'K';
          },
        },
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Monthly Revenue',
        data: data.datasets[0].data,
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderColor: 'rgb(79, 70, 229)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="h-64">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default RevenueChart;
