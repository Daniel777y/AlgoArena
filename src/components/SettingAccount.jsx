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

  // TODO: fix rating calculation

  const updateUserRating = async (newRating) => {
    const newUserInfo = {
      ...userInfo,
      rating: Math.round(newRating),
    };
    await myFirebase.updateUser(userInfo, newUserInfo);
    setUserInfo(newUserInfo);
    localStorage.setItem("curUser", JSON.stringify(newUserInfo));
  };

  const onUpdateUsername = (e) => {
    e.preventDefault();
    const updateUsername = async () => {
      const newUserInfo = {
        ...userInfo,
        username,
      };
      const data = await myFirebase.updateUser(userInfo, newUserInfo);
      if (!data) {
        alert("Failed to update username. Please try again.");
        return;
      }
      alert("Username updated successfully.");
      localStorage.setItem("curUser", JSON.stringify(data));
      //console.log("update username", data);
      setUsername(data.username);
      setUserInfo(data);
      localStorage.setItem("curUser", JSON.stringify(data));
      navigate("/");
    };
    updateUsername();
  };

  const onAddAccount = async (e) => {
    e.preventDefault();

    const updateAccount = async () => {
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
      const contests = data.contests.map(contest => JSON.stringify(contest));
      const newData = {
        ...data,
        contests,
      };
      let newRating = 0;
      if (accounts.length === 0) {
        newRating = newData.rating;
      } else {
        newRating = (userInfo.rating * accounts.length + newData.rating) / (accounts.length + 1);
      }
      setAccounts([...accounts, newData]);
      await updateUserRating(newRating);
    };

    await updateAccount();
    setHandle("");
    alert("Account added successfully.");
  };

  const onDeleleAccount = async (id) => {
    if (!confirm("Are you sure you want to delete this account?")) {
      return;
    }

    const deleteAccount = async () => {
      const data = await myFirebase.deleteAccount(id);
      if (!data) {
        alert("Failed to delete account. Please try again.");
        return;
      }
      let newRating = 0;
      if (accounts.length === 1) {
        newRating = 0;
      } else {
        newRating = (userInfo.rating * accounts.length - data.rating) / (accounts.length - 1);
      }
      const newAccounts = accounts.filter(account => account.id !== id);
      setAccounts(newAccounts);
      await updateUserRating(newRating);
    };

    await deleteAccount();
    alert("Account deleted successfully.");
  };

  return (
    <div className="col ms-3 border-end">
      <h2 className="form-title mt-2">Account Settings</h2>
      <form className="mt-3" onSubmit={onUpdateUsername}>
        <div className="row g-2 align-items-center mt-1">
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
        <div className="row g-2 align-items-center mt-1">
          <p className="col-auto">Email: </p>
          <p className="col-auto">{userInfo.email}</p>
        </div>
        <button type="submit" className="btn btn-primary mt-1">
          Update Username
        </button>
      </form>
      <hr />
      <form className="mt-3" onSubmit={onAddAccount}>
        <div className="row g-2 mt-1">
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
        <div className="row g-2 mt-1">
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
        <button type="submit" className="btn btn-primary mt-1">
          Add Account
        </button>
      </form>
      <div className="mt-3">
        <h2 className="form-title">
          Linked Accounts
        </h2>
        <ul className="list-group mt-2">
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
