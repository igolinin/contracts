const jwt = require("jsonwebtoken");
require("dotenv").config();
const manager = require("../utils/getProfile");

module.exports = async function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied, No token present");

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    if (decoded.role != "manager") return res.status(403).send("access denied");
    req.manager = await manager(decoded.email);
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
};
