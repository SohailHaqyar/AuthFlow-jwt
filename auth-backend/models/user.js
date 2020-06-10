const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { model, Schema } = mongoose;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Hash the password before save

userSchema.pre("save", async function (next) {
  let user = this;
  if (user.isModified("password")) {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
      next();
    } catch (e) {
      next(e);
    }
  } else {
    next();
  }
});

const User = model("User", userSchema);
module.exports = User;
