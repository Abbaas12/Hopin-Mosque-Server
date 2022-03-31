const express = require("express");
const router = express.Router();

const { Jamaea } = require("../model/jamaea");

router.get("/", async (req, res) => {
  const jamaea = await Jamaea.find().sort({ date: -1 }).limit(1);
  if (!jamaea) res.send("There is no jamaea time!");
  res.send(jamaea);
});

router.get("/:id", async (req, res) => {
  const jamaea = await Jamaea.findById(req.params.id);
  if (!jamaea) res.send("There is no jamaea time!");
  res.send(jamaea);
});

router.post("/", async (req, res) => {
  const jamaea = new Jamaea({
    fajr: "الفجر",
    fajrAdhan: req.body.fajrAdhan,
    fajrJamaea: req.body.fajrJamaea,

    zuhr: "الظهر",
    zuhrAdhan: req.body.zuhrAdhan,
    zuhrJamaea: req.body.zuhrJamaea,

    easr: "العصر",
    easrAdhan: req.body.easrAdhan,
    easrJamaea: req.body.easrJamaea,

    maghrib: "المغرب",
    maghribAdhan: req.body.maghribAdhan,
    maghribJamaea: req.body.maghribJamaea,

    easha: "العشاء",
    eashaAdhan: req.body.eashaAdhan,
    eashaJamaea: req.body.eashaJamaea,

    jumea: "الجمعة",
    jumeaAdhan: req.body.jumeaAdhan,
    jumeaJamaea: req.body.jumeaJamaea,
  });
  const newJamaea = await jamaea.save();
  if (!newJamaea) res.send("Cannot not Create!");
  res.send(newJamaea);
});

router.put("/:id", async (req, res) => {
  const jamaea = await Jamaea.findByIdAndUpdate(
    req.params.id,
    {
      fajrAdhan: req.body.fajrAdhan,
      fajrJamaea: req.body.fajrJamaea,

      zuhrAdhan: req.body.zuhrAdhan,
      zuhrJamaea: req.body.zuhrJamaea,

      easrAdhan: req.body.easrAdhan,
      easrJamaea: req.body.easrJamaea,

      maghribAdhan: req.body.maghribAdhan,
      maghribJamaea: req.body.maghribJamaea,

      eashaAdhan: req.body.eashaAdhan,
      eashaJamaea: req.body.eashaJamaea,

      jumeaAdhan: req.body.jumeaAdhan,
      jumeaJamaea: req.body.jumeaJamaea,
    },
    { new: true }
  );

  if (!jamaea) res.send("Cannot Update jamaea time!");
  res.send(jamaea);
});

router.delete("/:id", (req, res) => {
  Jamaea.findByIdAndRemove(req.params.id).then((j) => {
    if (!j) res.send("Already Delete!");
    res.send({ j, message: "Successful Deletion." });
  });
});

module.exports = router;

// "fajr":{
//     "adhan":"5:00",
//     "jamaea":"5:30"
// },
// "zuhr":{
//     "adhan":"1:00",
//     "jamaea":"1:30"
// },
// "easr":{
//     "adhan":"5:00",
//     "jamaea":"5:15"
// },
// "maghrib":{
//     "adhan":"6:00",
//     "jamaea":""
// },
// "easha":{
//     "adhan":"7:15",
//     "jamaea":"7:30"
// },
// "jumea":{
//     "adhan":"12:15",
//     "jamaea":"12:30"
// }
