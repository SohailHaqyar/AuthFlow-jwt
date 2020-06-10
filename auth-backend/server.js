const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const config = require("./config").get(process.env.NODE_ENV);
const userRoutes = require("./routes/user");
// Init Databse Good Luck !
mongoose.Promise = global.Promise;
mongoose.connect(
  config.DATABASE,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("Good Job Databse is on")
);
// 3rd Party Middleware Init
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);

// Listening on port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Boy the server is onnn"));
