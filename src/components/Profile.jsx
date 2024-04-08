import React from "react";

import { useUserInfo } from "../contexts/UserInfoContext";

const Profile = () => {
  const { userInfo } = useUserInfo();

  return (
    <>
      <h2>{userInfo.username}</h2>
      <p>Average Rating: {userInfo.rating}</p>
      <p>Email: {userInfo.email}</p>
    </>
  );
};

export default Profile;
