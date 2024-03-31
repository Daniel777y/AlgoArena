import React from "react";
import PropTypes from "prop-types";

import Navbar from "../components/NavBar";

const BaseBody = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

BaseBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseBody;
