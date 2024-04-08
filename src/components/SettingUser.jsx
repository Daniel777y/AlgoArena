import React, { useState, useEffect } from "react";

import { useUserInfo } from "../contexts/UserInfoContext";

import myFirbase from "../apis/MyFirebase";

const SettingUser = () => {
  const { userInfo } = useUserInfo();
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState(userInfo.email);

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await myFirbase.getAllUsers();
      if (data) {
        setUsers(data);
      }
    };
    //getAllUsers();
  }, []);

  const onSwitchUser = (e) => {
    e.preventDefault();
    console.log("Switch user to", email);
  };

  const onDeleteUser = (e) => {
    const deleteEmail = e.target.parentElement.dataset.email;
    console.log("Delete user", deleteEmail);
    if (!confirm("Are you sure to delete this user?")) {
      return;
    }
    if (deleteEmail === userInfo.email) {
      alert("You can't delete current user.");
      return;
    }
    if (deleteEmail === "DanielYu3790@gmail.com") {
      alert("You can't delete default user.");
      return;
    }
    myFirbase.deleteUser(deleteEmail);
  };

  return (
    <div className="col">
      <h2 className="form-title">Switch User</h2>
      <form className="" onSubmit={onSwitchUser}>
        <div className="row g-2 align-items-center">
          <label htmlFor="email" className="form-label col-auto">
            Email:
          </label>
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="mt-3">
        <h2 className="form-title">All Users</h2>
        <ul className="list-group">
          {users.map((user) => (
            <li
              key={user.email}
              className="list-group-item d-flex justify-content-between align-items-center"
              data-email={user.email}
            >
              {user.email}
              <span
                className="badge text-bg-primary rounded-pill"
                onClick={onDeleteUser}
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

export default SettingUser;
