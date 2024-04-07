import React, { useState, useEffect } from "react";

import BaseBody from "../templates/BaseBody";
import PerformanceChart from "../components/PerformanceChart";

import { useUserInfo } from "../contexts/UserInfoContext";

import platforms from "../data/platforms";

import getPerformances from "../utils/getPerformances";

const IndexPage = () => {
  const { userInfo } = useUserInfo();
  const [performances, setPerformances] = useState({});

  useEffect(() => {
    platforms.forEach(async (platform) => {
      if (userInfo[platform.name]) {
        console.log("Fetching data for", platform.name, userInfo[platform.name]);
        const data = await getPerformances(platform.name, userInfo[platform.name]);
        if (data) {
          console.log(data);
          setPerformances((prevPerformances) => ({
            ...prevPerformances,
            [platform.name]: data,
          }));
        }
      }
    });
  }, []);

  return (
    <BaseBody>
      <h1>Index Page</h1>
      <p>User: {userInfo.username} </p>
      <ul>
        {platforms.map((platform) => (
          performances[platform.name] && (
            <PerformanceChart
              key={platform.name}
              platform={platform.name}
              performance={performances[platform.name]}
            />
          )
        ))}
      </ul>
    </BaseBody>
  );
};

export default IndexPage;
