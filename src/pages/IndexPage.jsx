import React, { useState, useEffect } from "react";

import BaseBody from "../templates/BaseBody";
import PerformanceChart from "../components/PerformanceChart";

import { useUserInfo } from "../contexts/UserInfoContext";

const IndexPage = () => {
  const { userInfo } = useUserInfo();

  return (
    <BaseBody>
      <h1>Index Page</h1>
      <p>User: {userInfo.username} </p>
      <p>Rating: {userInfo.rating} </p>
      <PerformanceChart />
    </BaseBody>
  );
};

export default IndexPage;
