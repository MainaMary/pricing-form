const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Price = require("./models/priceForm");
require("dotenv").config();
const app = express();
const port = 7000 || process.env.PORT;
const connection_string = process.env.CONNECTION_STRING;
const location = require("./location");

console.log(Price);
//configure middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(location);
});
app.listen(port, console.log(`Server is running on port ${port}`));
mongoose
  .connect(connection_string)
  .then(() => console.log("MogoDB connection established"))
  .catch((err) => console.log(`Mongodb ${err.message}`));
