const express = require("express");
const router = express.Router();
const { getSensorData } = require("../data/mockData");

router.get("/", (req, res) => {
  const data = getSensorData();
  res.json(data);
});

module.exports = router;