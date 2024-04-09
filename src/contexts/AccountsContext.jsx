import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useUserInfo } from "./UserInfoContext";

import myFirebase from "../apis/MyFirebase";

import sampleAccounts from "../data/accounts";

const AccountsContext = React.createContext();

const DEV_MODE = false;

const AccountsProvider = ({ children }) => {
  const { userInfo } = useUserInfo();
  const [ accounts, setAccounts ] = useState([]);

  useEffect(() => {
    if (userInfo) {
      if (DEV_MODE) {
        console.log("DEV_MODE: Using sample accounts");
        setAccounts(sampleAccounts);
      } else {
        const getAccounts = async () => {
          const data = await myFirebase.getAllAccounts(userInfo);
          const parsedData = data.map((account) => {
            return {
              ...account,
              contests: account.contests.map((contest) => JSON.parse(contest)),
            };
          });
          setAccounts(parsedData);
        };
        getAccounts();
      }
    }
  }, [userInfo]);

  return (
    <AccountsContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AccountsContext.Provider>
  );
};

AccountsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAccounts = () => useContext(AccountsContext);

export { useAccounts, AccountsProvider };
