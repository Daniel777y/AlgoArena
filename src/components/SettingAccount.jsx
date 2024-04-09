import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useUserInfo } from "../contexts/UserInfoContext";
import { useAccounts } from "../contexts/AccountsContext";

import myFirebase from "../apis/MyFirebase";
import fetchAccountInfo from "../apis/fetchAccountInfo";

import platforms from "../data/platforms";
import { getAccountId } from "../utils/idGenerator";

const SettingAccount = () => {
  const { userInfo, setUserInfo } = useUserInfo();
  const { accounts, setAccounts } = useAccounts();

  const [ username, setUsername ] = useState(userInfo.username);
  const [ currentPlatformIndex, setCurrentPlatformIndex ] = useState(0);
  const [ handle, setHandle ] = useState("");
  const navigate = useNavigate();

  const onUpdateUsername = (e) => {
    e.preventDefault();
    const updateUsername = async () => {
      const data = await myFirebase.updateUser(userInfo, username);
      if (!data) {
        alert("Failed to update username. Please try again.");
        return;
      }
      alert("Username updated successfully.");
      localStorage.setItem("curUser", JSON.stringify(data));
      console.log("update username", data);
      setUsername(data.username);
      setUserInfo(data);
      navigate("/");
    };
    updateUsername();
  };

  const onAddAccount = async (e) => {
    e.preventDefault();
    const newAccount = await fetchAccountInfo(platforms[currentPlatformIndex].name, handle);
    if (!newAccount) {
      alert("Can't find the account. Please check the handle and try again.");
      return;
    }
    const data = await myFirebase.addAccount({
      ...newAccount,
      id: getAccountId(newAccount.platform, newAccount.handle),
      owner: userInfo.email
    });
    if (!data) {
      alert("Failed to add account. Please try again.");
      return;
    }
    alert("Account added successfully.");
    const contests = data.contests.map(contest => JSON.stringify(contest));
    const newData = {
      ...data,
      contests,
    };
    const avgRating = accounts.length === 0 ? newData.rating : (userInfo.rating * accounts.length + newData.rating) / (accounts.length + 1);
    setAccounts([...accounts, newData]);
    setUserInfo({
      ...userInfo,
      rating: avgRating,
    });
    setHandle("");
  };

  const onDeleleAccount = (id) => {
    if (!confirm("Are you sure you want to delete this account?")) {
      return;
    }
    console.log("delete account ", id);
    myFirebase.deleteAccount(id);
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
      <div className="mt-3">
        <h2 className="form-title">
          Linked Accounts
        </h2>
        <ul className="list-group">
          {accounts.map((account, index) => (
            <li 
              key={index} 
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {account.platform} - {account.handle}
              <span 
                className="badge text-bg-primary rounded-pill"
                onClick={() => onDeleleAccount(account.id)}
              >
                X
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingAccount;

/*
 *
 * <ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center">
    A second list item
    <span class="badge text-bg-primary rounded-pill">2</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    A third list item
    <span class="badge text-bg-primary rounded-pill">1</span>
  </li>
</ul>
 * */
