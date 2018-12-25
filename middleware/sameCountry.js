const jwt = require("jsonwebtoken");
require("dotenv").config();
const profile = require("../utils/getProfile");

module.exports = async function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied, No token present");

  try {
    const decoded = await jwt.verify(token, process.env.JWT);
    const client = await profile(req.body.client);
    console.log(client);
    if (decoded.country != client.country)
      return res.status(403).send("countries don't match");
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
};
