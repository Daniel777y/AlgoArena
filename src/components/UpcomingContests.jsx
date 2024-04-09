import React, { useState, useEffect } from "react";

import { fetchUpcomingContests } from "../apis/fetchContestInfo";

/*
 * contest: {
 *    platform: string,
 *    name: string,
 *    startTime: Date,
 *    url: string,
 *    duration: number (in seconds)
 *  }
 */

const UpcomingContests = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const getContests = async () => {
      const contests = await fetchUpcomingContests();
      contests.sort((a, b) => a.startTime - b.startTime);
      setContests(contests);
    };
    getContests();
  }, []);

  return (
    <div className="mx-3">
      <h2 className="mt-3 border-bottom">Upcoming Contests</h2>
      <ul className="list-group">
        {contests.map((contest, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 className="mt-1">{contest.name}</h5>
              <p className="mt-1">Platform: <span className="ms-1 badge bg-secondary">{contest.platform}</span></p>
              <p className="mt-1">
                Start Time:
                <a
                  href={`https://www.timeanddate.com/worldclock/fixedtime.html?iso=${contest.startTime.toISOString()}`}
                  className="ms-1 badge bg-info text-decoration-none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contest.startTime.toLocaleString()}
                </a>
              </p>
            </div>
            <a
              href={contest.url}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Contest
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingContests;

const convertDurationToHoursMinutes = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return `${hours}h ${minutes}m`;
};
