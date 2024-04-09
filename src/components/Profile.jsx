import React from "react";

import { useUserInfo } from "../contexts/UserInfoContext";

const Profile = () => {
  const { userInfo } = useUserInfo();

  return (
    <div className="mt-3 mx-3">
      <h2>{userInfo.username}</h2>
      <p>Current Average Rating: {userInfo.rating}</p>
    </div>
  );
};

export default Profile;
