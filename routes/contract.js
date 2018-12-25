const express = require("express");
const Contract = require("../models/contracts");
const router = express.Router();

const sameCountry = require("../middleware/sameCountry");
const manager = require("../middleware/manager");

const axios = require("axios");

router.post("/new", [manager, sameCountry], async (req, res) => {
  const newContract = new Contract({
    manager: req.manager,
    service: "protection",
    client: req.client,
    country: req.client.country
  });
  const result = newContract.save();
  res.send(result);
});

router.put("/", async (req, res) => {});

router.post("/aprove", async (req, res) => {});

router.get("/all", async (req, res) => {
  const result = await Contract.find({});
  res.send(result);
});
router.delete("/all", async (req, res) => {
  await Contract.deleteMany({});
  res.send(result);
});
module.exports = router;
