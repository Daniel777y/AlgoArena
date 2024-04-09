import React, { useState, useEffect } from "react";

import myFirebase from "../apis/MyFirebase";

const RankingList = () => {
  const [rankingList, setRankingList] = useState([]);

  useEffect(() => {
    const getRankingList = async () => {
      const data = await myFirebase.getAllUsers();
      data.sort((a, b) => b.rating - a.rating);
      setRankingList(data);
    };
    getRankingList();
  }, []);

  return (
    <div>
      <h1>Ranking List</h1>
      <ul>
        {rankingList.map((user, index) => (
          <li key={index}>
            {index + 1}. {user.username} - {user.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
