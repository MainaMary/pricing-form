const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productId: String,
  index: Number,
  taxation: Number,
  discount: Number,
  subsidy: Number,
  total: Number,
});
const Price = mongoose.model("Price", priceSchema);

module.exports = Price;
