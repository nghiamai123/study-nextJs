"use client";
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Loader from './Loader';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/groupedData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        const labels = data.map(item => item.productName);
        const counts = data.map(item => item.totalCount);
        const backgroundColors = counts.map(count => {
          if (count >= 0 && count < 5) {
            return 'rgba(255, 99, 132, 0.2)'; 
          } else if (count >= 5 && count < 10) {
            return 'rgba(255, 206, 86, 0.2)';
          } else {
            return 'rgba(75, 192, 192, 0.2)';
          }
        });
        const borderColors = counts.map(count => {
          if (count >= 0 && count < 5) {
            return 'rgba(255, 99, 132, 1)';
          } else if (count >= 5 && count < 10) {
            return 'rgba(255, 206, 86, 1)';
          } else {
            return 'rgba(75, 192, 192, 1)';
          }
        });

        setChartData({
          labels,
          datasets: [ 
            {
              label: 'Number of users who purchased the product/item',
              data: counts,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    indexAxis: 'y',
    scales: {
      x: { 
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 0,
        bottom: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return chartData ? <Bar data={chartData} options={options} /> : <Loader />;
};

export default BarChart;
