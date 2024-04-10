/*
 * fetchUpcomingContests(platform: string):
 *  return a list of upcoming contests from the given platform
 *  each contest should have the following properties:
 *  - platform: string
 *  - name: string
 *  - startTime: Date
 *  - duration: number (in seconds)
 *  - url: string
 */

import platforms from "../data/platforms.js";

const fetchUpcomingContests = async () => {

  const fetchUpcomingContestsFromPlatform = async (platform) => {
    if (platform === "codeforces") {
      const res = await fetch("https://codeforces.com/api/contest.list?gym=false");
      const data = await res.json();
      const contests = data.result.filter((contest) => contest.phase === "BEFORE");
      return contests.map((contest) => ({
        platform: "Codeforces",
        name: contest.name,
        startTime: new Date(contest.startTimeSeconds * 1000),
        duration: contest.durationSeconds,
        url: `https://codeforces.com/contest/${contest.id}`,
      }));
    }
    return [];
  };

  const data = [];
  for (const platform of platforms) {
    const contests = await fetchUpcomingContestsFromPlatform(platform.name);
    data.push(...contests);
  }
  return data;
};

export { fetchUpcomingContests };
