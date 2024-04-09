import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Line } from "react-chartjs-2";
import "chart.js/auto";

import { useUserInfo } from "../contexts/UserInfoContext";
import { useAccounts } from "../contexts/AccountsContext";

const Performance = () => {
  const { userInfo } = useUserInfo();
  const { accounts } = useAccounts();

  const [ datasets, setDatasets ] = useState([]);
  const [ labels, setLabels ] = useState([]);

  useEffect(() => {
    const data = accounts.filter((account) => account.ownerId === userInfo.id);
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
          contestName: contest.contestName,
          timestamp: contest.timestamp,
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
    setLabels(
      chartLabels.filter((value, index, self) => self.indexOf(value) === index),
    );
  }, [accounts]);


  const titleCallback = (tooltipItems) => {
    const titles = [];
    tooltipItems.forEach((tooltipItem) => {
      const dataset = datasets[tooltipItem.datasetIndex];
      const contestName = dataset.data[tooltipItem.dataIndex].contestName;
      titles.push(contestName);
    });
    return titles;
  };

  const footerCallback = (tooltipItems) => {
    const dates = [];

    const toDate = (unixTimestamp) => {
      const date = new Date(unixTimestamp * 1000);
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    };

    tooltipItems.forEach((tooltipItem) => {
      const dataset = datasets[tooltipItem.datasetIndex];
      const date = dataset.data[tooltipItem.dataIndex].x;
      dates.push(toDate(date));
    });
    return dates;
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        display: false,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: titleCallback,
          footer: footerCallback,
        },
      },
    },
  };

  return (
    <div>
      <h2>Performance</h2>
      <Line options={options} data={{ labels: labels, datasets: datasets }} />
    </div>
  );
};

export default Performance;
