const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied, No token present");

  try {
    const decoded = jwt.verify(token, process.env.JWT);

    if (decoded.country != req.client)
      return res.status(403).send("access denied");

    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
};
