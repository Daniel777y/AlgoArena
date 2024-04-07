const getPerformances = async (platform, handle) => {
  console.log(platform, handle);
  if (platform === "codeforces") {
    const res = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
    const data = await res.json();
    console.log(data);
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
            ratingChange: contest.newRating - contest.oldRating,
          };
        }),
      };
    }
  }
  if (platform === "leetcode") {
    return {
      handle,
      rating: 2111,
      contests: [],
    };
  }
  return null;
};

export default getPerformances;
