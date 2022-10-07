import { Price } from "../models/priceForm";
import express from "express";
import { RouterProvider } from "react-router-dom";
const router = express.json();

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
  const res = await todo.save();
  res.send(res);
});
