const express = require("express");
const router = express.Router();
const weatherController = require("./../controller/weatherController");

router.route("/").get(weatherController.getAllWeather);
// router.route("/:id").get(weatherController.getWeather);

module.exports = router;
