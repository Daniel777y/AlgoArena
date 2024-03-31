import React, { useState, useEffect } from "react";

import BaseBody from "../templates/BaseBody";

const IndexPage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("https://codeforces.com/api/user.rating?handle=C0ldSmi1e")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }, []);
  return (
    <BaseBody>
      <h1>Index Page</h1>
    </BaseBody>
  );
};

export default IndexPage;
