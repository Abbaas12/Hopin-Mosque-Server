const express = require("express");
const router = express.Router();
const moment = require("moment");

const { Prayertime } = require("../model/prayertime");

router.get("/", async (req, res) => {
  const prayertime = await Prayertime.find().sort({ date: 1 });
  if (!prayertime) res.send("There is no prayertime.");
  res.send(prayertime);
});

router.get("/:id", async (req, res) => {
  const prayertime = await Prayertime.findById(req.params.id);
  if (!prayertime) res.send("There is no prayertime.");
  res.send(prayertime);
});

router.post("/", async (req, res) => {
  const d = moment(req.body.date).format("YYYY-MM-DD[T00:00:00.000Z]");
  const date = new Date(d);
  const prayertime = new Prayertime({
    morning: req.body.morning,
    sunrise: req.body.sunrise,
    demise: req.body.demise,
    aleasr1: req.body.aleasr1,
    aleasr2: req.body.aleasr2,
    sunset: req.body.sunset,
    night: req.body.night,
    date: date,
  });
  const newPrayertime = await prayertime.save();
  if (!newPrayertime) res.send("Cannot create prayertime!");
  res.send(newPrayertime);
});

router.put("/:id", async (req, res) => {
  const date = moment(new Date(req.body.date)).format(
    "YYYY-MM-DD[T00:00:00.000Z]"
  );
  const prayertime = await Prayertime.findByIdAndUpdate(
    req.params.id,
    {
      morning: req.body.morning,
      sunrise: req.body.sunrise,
      demise: req.body.demise,
      aleasr1: req.body.aleasr1,
      aleasr2: req.body.aleasr2,
      sunset: req.body.sunset,
      night: req.body.night,
      date: date,
    },
    { new: true }
  );

  if (!prayertime) res.send("Cannot update Prayertime!");
  res.send(prayertime);
});

router.delete("/:id", (req, res) => {
  Prayertime.findByIdAndRemove(req.params.id).then((p) => {
    if (!p) res.send("Prayertime already deleted!");
    res.send({ p, message: "Successfully deletion!" });
  });
});

module.exports = router;

// "morning":"5:00",
//     "sunrise":"6:30",
//     "demise":"12:00",
//     "aleasr1":"3:30",
//     "aleasr2":"5:00",
//     "sunset":"6:30",
//     "night":"7:00",
//     "date":"2022/1/2"
