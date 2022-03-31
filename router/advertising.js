const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const moment = require("moment");

const { Advertising } = require("../model/advertising");

cloudinary.config({
  cloud_name: "dgr6rk06b",
  api_key: "841169737561656",
  api_secret: "1im0N0naOYCAbUUQpla6uE-KPlM",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "PRAYER",
  },
});

const uploadOption = multer({ storage });

router.get("/", async (req, res) => {
  const advertising = await Advertising.find().sort({ date: -1 });
  if (!advertising) res.send("There is no advertising!");
  res.send(advertising);
});

router.get("/:id", async (req, res) => {
  const advertising = await Advertising.findById(req.params.id);
  if (!advertising) res.send("There is no advertising!");
  res.send(advertising);
});

router.post("/", uploadOption.array("images"), async (req, res) => {
  const imagePath = [];
  const files = req.files;
  if (files) {
    files.map((file) => imagePath.push(file.path));
  }

  const advertising = new Advertising({
    title: req.body.title,
    body: req.body.body,
    images: imagePath,
  });

  const newAdvertising = await advertising.save();
  if (!newAdvertising) res.send("Cannot Create advertising!");
  res.send(newAdvertising);
});

router.put("/:id", uploadOption.array("images"), async (req, res) => {
  const imagePath = [];
  const files = req.files;
  if (files) {
    files.map((file) => imagePath.push(file.path));
  }
  const advertising = await Advertising.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      body: req.body.body,
      images: imagePath,
    },
    { new: true }
  );
  if (!advertising) res.send("Cannot Update advertising!");
  res.send(advertising);
});

router.delete("/:id", (req, res) => {
  Advertising.findByIdAndRemove(req.params.id).then((a) => {
    if (!a) res.send("Already Deleted!");
    res.send({ a, message: "Successful Deletion" });
  });
});

module.exports = router;

// "title":"ခေါင်းစဉ်၁",
//     "body":"body",
//     "images":[],
//     "bodyDate":"2022-1-2"
