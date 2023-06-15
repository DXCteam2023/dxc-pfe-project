import { Request, Response } from "express";
import { ProductOrder } from "../../../models/productOrder";

export default async function addProductOrder(req: Request, res: Response) {
  try {
    const payload = req.body;
    const productOrder = await ProductOrder.create(payload);
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(
      JSON.stringify({
        message: "New product order inserted",
        productOrder: JSON.stringify(productOrder),
      })
    );
  } catch (e) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send(JSON.stringify({ exeption: e }));
    // console.log(JSON.stringify(po));
  }
}
