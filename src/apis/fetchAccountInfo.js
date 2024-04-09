// return null or an object with the following structure:
// {
//   platform: string,
//   handle: string,
//   rating: number,
//   contests: array of objects with the following structure:
//     {
//       constestName: string,
//       rank: number,
//       rating: number,
//       timestamp: number
//     }
//  }


const getCodeforcesAccountInfo = async (handle) => {
};

const getLeetcodeAccountInfo = async (handle) => {
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
