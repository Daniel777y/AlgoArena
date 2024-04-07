import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Line } from "react-chartjs-2";
import "chart.js/auto";

import { useUserInfo } from "../contexts/UserInfoContext";

import accounts from "../data/accounts";

const Performance = () => {
  const { userInfo } = useUserInfo();
  const [ datasets, setDatasets ] = useState([]);
  const [ labels, setLabels ] = useState([]);

  const titleCallback = (tooltipItems) => {
    const titles = [];
    tooltipItems.forEach((tooltipItem) => {
      const dataset = datasets[tooltipItem.datasetIndex];
      const contestName = dataset.data[tooltipItem.dataIndex].constestName;
      titles.push(contestName);
    });
    return titles;
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: titleCallback,
        }
      },
    },
  };

  useEffect(() => {
    const data = accounts.filter((account) => account.userId === userInfo.id);
    const chartData = [];
    const chartLabels = [];

    data.forEach((account) => {
      const ratings = [];
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      const color = `rgb(${r}, ${g}, ${b})`;

      account.contests.forEach((contest) => {
        ratings.push({
          x: contest.timestamp,
          y: contest.rating,
          constestName: contest.contestName,
        });
        chartLabels.push(contest.timestamp);
      });

      chartData.push({
        label: `${account.platform.toUpperCase()} - ${account.handle}`,
        data: ratings,
        fill: false,
        borderColor: color,
        backgroundColor: color,
        tension: 0.1,
      });
    });
    
    setDatasets(chartData);

    chartLabels.sort((a, b) => a - b);
    setLabels(chartLabels.filter((value, index, self) => self.indexOf(value) === index));

    console.log(labels);
    console.log();

  }, [userInfo]);

  return (
    <div>
      <h2>Performance</h2>
      <Line options={options} data={{ labels: labels, datasets: datasets }} />
    </div>
  );
};
//<Line options={options} data={datasets} />

export default Performance;
