/*
 * return null or an object with the following structure:
 *
 * {
 *  platform: string,
 *  handle: string,
 *  rating: number,
 *  contests: array of objects with the following structure:
 *    {
 *      constestName: string,
 *      rank: number,
 *      rating: number,
 *      timestamp: number
 *    }
 * }
 */

const getCodeforcesAccountInfo = async (handle) => {

  const getUserData = async () => {
    try {
      const API_URL = `https://codeforces.com/api/user.info?handles=${handle}`;
      const res = await fetch(API_URL);
      const data = await res.json();
      return {
        platform: "codeforces",
        handle: data.result[0].handle,
        rating: data.result[0].rating
      };
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  const getContestsData = async () => {
    try {
      const API_URL = `https://codeforces.com/api/user.rating?handle=${handle}`;
      const res = await fetch(API_URL);
      const data = await res.json();
      return data.result.map((contest) => (JSON.stringify({
        contestName: contest.contestName,
        rank: contest.rank,
        rating: contest.newRating,
        timestamp: contest.ratingUpdateTimeSeconds
      })));
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  const userData = await getUserData();
  if (!userData) {
    return null;
  }
  const contestsData = await getContestsData();
  if (!contestsData) {
    return null;
  }
  return {
    ...userData,
    contests: contestsData
  };
};

const getLeetcodeAccountInfo = async (handle) => {
  try {
    const API_URL = `https://alfa-leetcode-api.onrender.com/${handle}/contest/`;
    const res = await fetch(API_URL);
    const data = await res.json();
    const contests = data.contestParticipation.map((item) => (JSON.stringify({
      contestName: item.contest.title,
      rank: item.ranking,
      rating: Math.round(item.rating),
      timestamp: item.contest.startTime,
    })));
    return {
      platform: "leetcode",
      handle: handle,
      rating: Math.round(data.contestRating),
      contests,
    };
  } catch (e) {
    console.log(e);
  }
  return null;
};

const fetchAccountInfo = async (platform, handle) => {
  if (platform === "codeforces") {
    return await getCodeforcesAccountInfo(handle);
  }
  if (platform === "leetcode") {
    return await getLeetcodeAccountInfo(handle);
  }
  return null;
};

export default fetchAccountInfo;
