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
    <div className="mx-3">
      <h1>Ranking List</h1>
      <ul className="list-group">
        {rankingList.map((user, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {index + 1}. {user.username}
            <span className="badge text-bg-primary rounded-pill">
              {user.rating}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
