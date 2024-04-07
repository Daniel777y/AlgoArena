import React, { useState, useEffect } from "react";

import BaseBody from "../templates/BaseBody";

import { useUserInfo } from "../contexts/UserInfoContext";

const IndexPage = () => {
  const { userInfo } = useUserInfo();

  return (
    <BaseBody>
      <h1>Index Page</h1>
      <p>User: </p>
      <div>
        Codeforces:
      </div>
    </BaseBody>
  );
};

export default IndexPage;
