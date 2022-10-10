const Price = require("../models/priceForm");
const express = require("express");
const Joi = require("joi");
const {
  findByIdAndDelete,
  findById,
  findByIdAndUpdate,
} = require("../models/priceForm");
const router = express.Router();

const handleValidation = (req) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    productId: Joi.string(),
    taxation: Joi.number(),
    discount: Joi.number(),
    subsidy: Joi.number(),
    total: Joi.number(),
    index: Joi.number(),
  });
  const { error } = schema.validate(req);
  if (error) return res.status(400).send("Validation error");
};
router.post("/productsVarieties", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    productId: Joi.string(),
    taxation: Joi.number(),
    discount: Joi.number(),
    subsidy: Joi.number(),
    total: Joi.number(),
    index: Joi.number(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send("Validation error");
  const { name, productId, index, taxation, discount, subsidy, total, date } =
    req.body;
  const todo = new Price({
    name,
    productId,
    index,
    taxation,
    discount,
    subsidy,
    total,
    date,
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

router.get("/productsVarieties:id", async (req, res) => {
  const response = await Price.find().sort({ date: -1 });
  res.send(response);
});
router.delete("/productVarieties", async (req, res) => {
  try {
    const deletedVariety = await findByIdAndDelete(req.params.id);
    res.send(deletedVariety);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/productVarieties:id", async (req, res) => {
  handleValidation(req.body);
  try {
    const variety = findById(req.body.params);
    if (!variety) return res.status(404).send("Variety not found");
    const updateVariety = await findByIdAndUpdate(
      req.body.params,
      {
        name,
        productId,
        index,
        taxation,
        discount,
        subsidy,
        total,
        date,
      },
      { new: true }
    );
    res.send(updateVariety);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;