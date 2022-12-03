const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Price = require("./models/priceForm");
const Product = require("./models/product");
const routes = require("./routes/prices");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const connection_string = process.env.CONNECTION_STRING;
const location = require("./location");
const notFound = require("./middleware/NotFound");

console.log(Price);
//configure middleware
app.use(express.json());
app.use(cors());
app.use(notFound);

// all routes start with  /productsVarieties
app.use("/", routes);

app.get("/locations", (req, res) => {
  res.send(location);
});

app.listen(port, console.log(`Server is running on port ${port}`));
mongoose
  .connect(connection_string)
  .then(() => console.log("MogoDB connection established"))
  .catch((err) => console.log(`Mongodb ${err.message}`));
