const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config").get(process.env.NODE_ENV);
const auth = require("../middleware/auth");

// ///////// GET

// Get all Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ success: true, users });
  } catch (e) {
    res.status(500).send();
  }
});

// Get Current User
router.get("/user", auth, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (e) {
    res.status(404).send();
  }
});

// //////// POST

// Register a new user

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check weather the user exists
    const user = await User.findOne({ email });
    user &&
      res.status(400).json({ success: false, message: "User already exists!" });
    // Create the new user
    const newUser = new User({ name, email, password });
    // Save it to the database
    newUser
      .save()
      .then((newInstance) => {
        res.status(200).json({ success: true, user: newInstance });
      })
      .catch((e) =>
        res.status(400).json({ origin: "I am in error in the catch", msg: e })
      );
  } catch (e) {
    res.status(500).send(e);
  }
});
// Login a user

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the User with the email
    const user = await User.findOne({ email });
    !user &&
      res
        .status(404)
        .json({ success: false, message: "No Such Email Was Found" });

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // If passwords match
      // Generate a token
      const payload = { email, _id: user._id };
      const token = jwt.sign(payload, config.SECRET);
      // Send the token back
      res.json({ success: true, user, token: "Bearer " + token });
    } else {
      res.status(400).json({
        success: false,
        message: "Wrong password bitch!",
      });
    }
  } catch (e) {
    res.status(400).send();
  }
});

// //////// PUT
// //////// DELETE

// Nuclear Button -> User Edition
router.delete("/nuke-users", async (req, res) => {
  if (req.body.pass === "Iamtheking") {
    await User.remove({}).then(() => {
      res.json({ success: true, message: "God Save our souls" });
    });
  } else {
    res.json({ message: "You are not authorized to end the world" });
  }
});

module.exports = router;
