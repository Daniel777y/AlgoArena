import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

const UserInfoContext = React.createContext();

const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    id: 1,
    username: "C0ldSmi1e",
    email: "DanielYu3790@gmail.com",
    rating: 7777,
  });

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
