const User = require("../models/user");
const config = require("../config").get(process.env.NODE_ENV);
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  // Get the token form the header
  const token = req.headers["authorization"].split(" ")[1];
  const decoded = await jwt.verify(token, config.SECRET);
  const { email } = decoded;
  // Find the user
  const user = await User.findOne({ email });
  !user && res.json({ err: "No such user found" });

  req.user = user;
  req.token = token;
  // Set the req staright
  next();
};

module.exports = auth;
