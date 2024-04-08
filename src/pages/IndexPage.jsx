import React from "react";

import BaseBody from "../templates/BaseBody";
import Profile from "../components/Profile";
import Performance from "../components/Performance";
import UpcomingContests from "../components/UpcomingContests";

const IndexPage = () => {
  return (
    <BaseBody>
      <Profile />
      <Performance />
      <UpcomingContests />
    </BaseBody>
  );
};

export default IndexPage;
