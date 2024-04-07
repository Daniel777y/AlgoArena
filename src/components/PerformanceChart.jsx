import React, { useState, useEffect } from "react";

import { useUserInfo } from "../contexts/UserInfoContext";

import accounts from "../data/accounts";

const PerformanceChart = () => {
  const { userInfo } = useUserInfo();
  const [ performance, setPerformance ] = useState([]);

  useEffect(() => {
    const data = accounts.filter(account => account.userId === userInfo.id);
    setPerformance(data);
  }, [userInfo]);

  return (
    <div>
      <h2>Performance Chart</h2>
      <ul>
        {performance.map((account, index) => (
          <li key={index}>
            <div>{account.platform}</div>
            <div>{account.handle}</div>
            <div>{account.rating}</div>
            <ul>
              {account.contests.map((contest, index) => (
                <li key={index}>
                  <div>{contest.rank}</div>
                  <div>{contest.rating}</div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceChart;
