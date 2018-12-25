const axios = require("axios");
const profileUrl = process.env.PROFILE_SERVICE_HOST;

module.exports = async function(email) {
  const profile = await axios.get(
    `http://${profileUrl}:9090/api/v1/service/user/${email}`
  );
  return profile.data;
};
