import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

const AccountsContext = React.createContext();

const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState({});

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
