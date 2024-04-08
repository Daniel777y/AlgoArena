import React, { useState, useEffect } from "react";

import { useUserInfo } from "../contexts/UserInfoContext";

const SettingUser = () => {
  const { userInfo } = useUserInfo();
  const [ email, setEmail ] = useState(userInfo.email);

  const onSwitchUser = (e) => {
    e.preventDefault();
    console.log("Switch user to", email);
  };

  return (
    <div className="col">
      <h2 className="form-title">Setting User</h2>
      <form className="" onSubmit={onSwitchUser}>
        <div className="row g-2 align-items-center">
          <label htmlFor="email" className="form-label col-auto">Email:</label>
          <div className="col-auto">
            <input 
              id="email" 
              className="form-control" 
              type="email" 
              aria-describedby="emailHelp" 
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              maxLength="50"
              required
            />
          </div>
        </div>
        <div id="emailHelp" className="form-text">
          {"If email doesn't exist, it will create a new account."}
        </div>
        <button type="submit" className="btn btn-primary">Switch User</button>
      </form>
    </div>
  );
};

export default SettingUser;
