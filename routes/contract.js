const express = require("express");
const Contract = require("../models/contracts");
const router = express.Router();

const sameCountry = require("../middleware/sameCountry");
const manager = require("../middleware/manager");

const axios = require("axios");

router.post("/new", [manager, sameCountry], async (req, res) => {
  const newContract = new Contract({
    manger: req.manager,
    service: "protection",
    client: req.client,
    city: req.client.city
  });
  const result = newContract.save();
  res.send(result);
});

router.put("/", async (req, res) => {});

router.post("/aprove", async (req, res) => {});

router.get("/all", async (req, res) => {});
module.exports = router;
