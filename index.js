require("express-async-errors");
require("dotenv").config();
const error = require("./middleware/error");
const express = require("express");
const contract = require("./routes/contract");
const bodyParser = require("body-parser");
const config = require("config");
const database = config.get("db.host");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose
  .connect(
    database,
    { useNewUrlParser: true }
  )
  .then(() => console.log("connected to mongo db at ", database))
  .catch(err => console.log("cannot connect to db", err));
const db = mongoose.connection;

app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("OK here");
});

app.use("/api/v1/contract", contract);

app.use(error);

app.listen(8080, () => console.log("server started on port 8080"));

module.exports = app;
