const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  desc: String,
  image: String,
  varieties: [String],
  Baseprice: Number,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
