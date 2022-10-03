const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const app = express();
const port = 5000 || process.env.PORT;
const connection_string = process.env.CONNECTION_STRING;
console.log(connection_string, "connection string");

//configure middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to our pricing form");
});
app.listen(port, console.log(`Server is running on ${port}`));
mongoose
  .connect(connection_string)
  .then(() => console.log("MogoDB connection established"))
  .catch((err) => console.log(`Mongodb ${err.message}`));
