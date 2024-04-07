const CODEFORCES_API = "https://codeforces.com/api/user.rating?handle=";
const LEETCODE_API = "http://localhost:9005/";


const getPerformances = async (platform, handle) => {
  if (platform === "codeforces") {
    const res = await fetch(`${CODEFORCES_API}${handle}`);
    const data = await res.json();
    if (data.status === "OK") {
      if (data.result.length === 0) {
        return {
          handle: handle,
          rating: 0,
          contests: [],
        };
      }
      return {
        handle,
        rating: data.result[data.result.length - 1].newRating,
        contests: data.result.map((contest) => {
          return {
            constestName: contest.contestName,
            rank: contest.rank,
            rating: contest.newRating,
          };
        }),
      };
    }
  }
  if (platform === "leetcode") {
    return {
      handle,
      rating: 0,
      contests: [],
    };
    //const res = await fetch(`${LEETCODE_API}${handle}/contest`);
    //const data = await res.json();
    //if (!data.errors) {
    //  return {
    //    handle,
    //    rating: Math.trunc(data.contestRating),
    //    contests: data.contestParticipation.map((contest) => {
    //      return {
    //        contestName: contest.contestName,
    //        rank: contest.ranking,
    //        rating: Math.trunc(contest.rating),
    //      };
    //    }),
    //  };
    //}
  }
  return null;
};

export default getPerformances;
