const getUserId = (email) => {
  return Math.floor(Math.random() * 10000) + email.split("@")[0] + Math.floor(Math.random() * 10000);
};

const getAccountId = (platform, handle) => {
  return Math.floor(Math.random() * 10000) + platform + handle + Math.floor(Math.random() * 10000);
};

export { getUserId, getAccountId };
