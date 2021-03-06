const axios = require("axios");
const profileUrl = process.env.PROFILE_SERVICE_HOST;

module.exports = async function getProfile(email) {
  const profile = await axios.get(
    `http://${profileUrl}:9090/api/v1/service/user/${email}`
  );
  console.log("util  ", profile.data);
  return profile.data;
};
