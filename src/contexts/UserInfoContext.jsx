import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import defaultUser from "../data/defaultUser";

const UserInfoContext = React.createContext();

const UserInfoProvider = ({ children }) => {
  const [ userInfo, setUserInfo ] = useState(defaultUser);

  useEffect(() => {
    const curUser = localStorage.getItem("curUser");
    if (!curUser) {
      localStorage.setItem("curUser", JSON.stringify(defaultUser));
    }
    setUserInfo(JSON.parse(curUser));
  }, []);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

UserInfoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useUserInfo = () => useContext(UserInfoContext);

export { useUserInfo, UserInfoProvider };
