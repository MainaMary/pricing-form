const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Price = require("./models/priceForm");
const Product = require("./models/product");
const joi = require("joi");
require("dotenv").config();
const app = express();
const port = 7000 || process.env.PORT;
const connection_string = process.env.CONNECTION_STRING;
const location = require("./location");
const { number } = require("joi");

console.log(Price);
//configure middleware
app.use(express.json());
app.use(cors());
//define joi schema
const schema = joi.object({
  name: joi.string().required(),
  productId: joi.string(),
  taxation: joi.number(),
  discount: joi.number(),
  subsidy: joi.number(),
  total: joi.number(),
});
app.get("/", (req, res) => {
  res.send(location);
});
app.listen(port, console.log(`Server is running on port ${port}`));
mongoose
  .connect(connection_string)
  .then(() => console.log("MogoDB connection established"))
  .catch((err) => console.log(`Mongodb ${err.message}`));
