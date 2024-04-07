import React from "react";

import { useUserInfo } from "../contexts/UserInfoContext";

const Profile = () => {
  const { userInfo } = useUserInfo();

  return (
    <>
      <p>User: {userInfo.username}</p>
      <p>Average Rating: {userInfo.rating}</p>
    </>
  );
};

export default Profile;
