import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useUserInfo } from "./UserInfoContext";

import myFirebase from "../api/firebase";

const AccountContext = React.createContext();

export const AccountsProvider = ({ children }) => {
  const { userInfo } = useUserInfo();
  const [ accounts, setAccounts ] = useState([]);

  useEffect(() => {
    if (userInfo) {
      const data = myFirebase.getAllAccounts(userInfo);
      if (data) {
        setAccounts(data);
      }
    }
  }, [userInfo]);

  return (
    <AccountContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AccountContext.Provider>
  );
};

AccountsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAccounts = () => useContext(AccountContext);

export default { useAccounts, AccountsProvider };
