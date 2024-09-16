const express = require("express");
const router = express.Router();
module.exports = router;
const User = require("../models/user.model.js");
router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log(token);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect email or password",
    });
  }
});
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  await User.create({
    username,
    email,
    password,
  });
  return res.redirect("/");
});

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});
