import { Price } from "../models/priceForm";
const express = require("express");
const Joi = express("joi");
const router = express.json();

const schema = Joi.object({
  name: Joi.string().required(),
  productId: Joi.string(),
  taxation: Joi.number(),
  discount: Joi.number(),
  subsidy: Joi.number(),
  total: Joi.number(),
});
router.post("/", async (req, res) => {
  const { name, productId, index, taxation, discount, subsidy } = req.body;
  const todo = new Price({
    name,
    productId,
    index,
    taxation,
    discount,
    subsidy,
    total,
  });
  try {
    const response = await todo.save();
    res.send(response);
  } catch (error) {
    //sending error to the client
    res.status(500).send(error.message);
    console.log(error.message);
  }
});
module.exports = router;
