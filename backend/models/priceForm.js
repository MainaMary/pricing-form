import { Schema, model } from "mongoose";

const priceSchema = new Schema({
  productName: { type: String, required: true },
  productId: String,
  index: Number,
  tax: Number,
  discount: Number,
  subsidy: Number,
  locationId: String,
});
const Price = model("price", priceSchema);

//export const module = Price;
export default Price;
