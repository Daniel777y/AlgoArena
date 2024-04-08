import React, { useState, useEffect } from "react";

import { useUserInfo } from "../contexts/UserInfoContext";

import myFirebase from "../apis/MyFirebase";
import platforms from "../data/platforms";

const SettingAccount = () => {
  const { userInfo } = useUserInfo();
  const [ username, setUsername ] = useState(userInfo.username);
  const [ currentPlatformIndex, setCurrentPlatformIndex ] = useState(0);
  const [ handle, setHandle ] = useState("");

  useEffect(() => {
    //const getUsers = async () => {
    //  const users = await myFirebase.getAllUsers();
    //  console.log(users);
    //};
  }, []);

  const onUpdateUsername = (e) => {
    e.preventDefault();
    console.log(username);
  };

  const onAddAccount = (e) => {
    e.preventDefault();
    console.log(platforms[currentPlatformIndex].name, handle);
  };

  return (
    <div className="col">
      <h2 className="form-title">Account Settings</h2>
      <form className="" onSubmit={onUpdateUsername}>
        <div className="row g-2 align-items-center">
          <label htmlFor="username" className="form-label col-auto">
            Current User:
          </label>
          <div className="col-auto">
            <input
              id="username"
              className="form-control"
              type="text"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength="30"
              required
            />
          </div>
        </div>
        <div className="row g-2 align-items-center">
          <p className="col-auto">Email: </p>
          <p className="col-auto">{userInfo.email}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Username
        </button>
      </form>
      <form className="" onSubmit={onAddAccount}>
        <div className="row g-2">
          <label className="form-label col-auto" htmlFor="platform">
            Platform:
          </label>
          <div className="col-auto">
            <select
              id="platform"
              className="form-select"
              onChange={(e) => setCurrentPlatformIndex(e.target.selectedIndex)}
              aria-label="Platform"
            >
              {platforms.map((platform) => {
                return <option key={platform.id}>{platform.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="row g-2">
          <label className="form-label col-auto" htmlFor="handle">
            Handle:
          </label>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="handle"
              onChange={(e) => {
                setHandle(e.target.value);
              }}
              aria-label="Handle"
              autoComplete="off"
              maxLength="50"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Account
        </button>
      </form>
    </div>
  );
};

export default SettingAccount;
