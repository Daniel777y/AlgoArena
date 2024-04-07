import React from "react";
import PropTypes from "prop-types";
import "chart.js/auto";

import { Line } from "react-chartjs-2";

const PerformanceChart = ({ account }) => {
  console.log(account);
  const rantings = account.contests.map((item) => item.rating);
  console.log(rantings);
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Rating",
        data: rantings,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5",
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div>
      <Line options={options} data={chartData} />
    </div>
  );
};

PerformanceChart.propTypes = {
};

export default PerformanceChart;
