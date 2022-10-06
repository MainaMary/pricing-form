import { connect } from "mongoose";
import express, { json } from "express";
import cors from "cors";
import Price from "./models/priceForm";
require("dotenv").config();
const app = express();
const port = 7000 || process.env.PORT;
const connection_string = process.env.CONNECTION_STRING;
import location from "./location";

console.log(Price);
//configure middleware
app.use(json());
app.use(cors());
app.get("/", (req, res) => {
  res.send(location);
});
app.listen(port, console.log(`Server is running on port ${port}`));
connect(connection_string)
  .then(() => console.log("MogoDB connection established"))
  .catch((err) => console.log(`Mongodb ${err.message}`));
