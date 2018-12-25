const express = require("express");
const Contract = require("../models/contracts");
const router = express.Router();

const sameCountry = require("../middleware/sameCountry");
const manager = require("../middleware/manager");
const time = require("../middleware/time");

const axios = require("axios");

router.post("/new", [manager, sameCountry, time], async (req, res) => {
  const newContract = new Contract({
    manager: req.manager.email,
    service: "protection",
    client: req.client.email,
    country: req.client.country,
    total: req.body.total
  });
  const result = await newContract.save();
  res.send(result);
});

router.put("/total", manager, async (req, res) => {
  let contract = await Contract.findOne({ _id: req.body._id });
  if (!contract) return res.status(400).send("contract not found");
  if (contract.manager != req.manager.email)
    return res.status(403).send("not authorized to update this contract");
  await Contract.findByIdAndUpdate(req.body._id, {
    $set: { total: req.body.total }
  });
  res.send("OK");
});

router.put("/aprove", manager, async (req, res) => {
  let contract = await Contract.findOne({ _id: req.body._id });
  if (!contract) return res.status(400).send("contract not found");
  if (contract.manager == req.manager.email)
    return res.status(403).send("not authorized to aprove own contract");
  await Contract.findByIdAndUpdate(req.body._id, {
    $set: { aproved_by: req.manager.email }
  });
  res.send("OK");
});

router.get("/all", async (req, res) => {
  const result = await Contract.find({});
  res.send(result);
});
router.delete("/all", async (req, res) => {
  await Contract.deleteMany({});
  res.send(result);
});
module.exports = router;
