import React, { useState } from "react";

import { useUserInfo } from "../contexts/UserInfoContext";

import platforms from "../data/platforms";

const SettingForm = () => {
  const { userInfo, setUserInfo } = useUserInfo();
  const [ currentPlatform, setCurrentPlatform ] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="row g-2 align-items-center">
          <label
            className="col-auto form-label"
            htmlFor="username"
          >
            User Name:
          </label>
          <input
            id="username"
            className="col-auto form-control"
            type="text"
            defaultValue={userInfo.username}
            onChange={(e) => {
              setUserInfo({ 
                ...userInfo,
                username: e.target.value
              });
            }}
            aria-label="User Name"
          />
          <label
            className="col-auto form-label"
            htmlFor="platform"
          >
            Platform:
          </label>
          <select
            id="platform"
            className="form-select" 
            onChange={(e) => setCurrentPlatform(e.target.selectedIndex)}
            aria-label="Default select example"
          >
            {platforms.map((platform) => {
              return (
                <option
                  key={platform.id}
                >
                  {platform.name}
                </option>
              );}
            )}
          </select>
          <input
            type="text"
            className="col-auto form-control"
            id="username"
            value={userInfo[platforms[currentPlatform].name ? platforms[currentPlatform].name : ""]}
            onChange={(e) => {
              setUserInfo({ 
                ...userInfo,
                [platforms[currentPlatform].name]: e.target.value
              });
            }}
            aria-label="Handle"
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default SettingForm;
