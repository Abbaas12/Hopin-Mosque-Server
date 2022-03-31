const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../model/user");

router.get("/", async (req, res) => {
  const user = await User.find();
  if (!user) res.send("There is no user!");
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) res.send("There is no user!");
  res.send(user);
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
  });

  const newUser = await user.save();
  if (!newUser) res.send("Cannot Create new user!");
  res.send(newUser);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.SECRET;

  if (!user) res.send("Not Found!");
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
        email: user.email,
        name: user.name,
      },
      secret
    );
    return res.send({ email: user.email, token });
  } else {
    return res.send("Password is Wrong!");
  }
});

router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 10),
      isAdmin: req.body.isAdmin,
    },
    { new: true }
  );

  if (!user) res.send("Not Found");
  res.send(user);
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id).then((u) => {
    if (!u) res.send("Already deleted!");
    res.send({ u, message: "Success Deletion" });
  });
});

module.exports = router;

// "name":"user1",
// "email":"user1@email.com",
// "phone":1234567,
// "password":"123456",
// "isAdmin":true
