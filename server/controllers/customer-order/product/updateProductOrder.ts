import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { ProductOrder } from "../../../models/productOrder";

export default async function updateProductOrder(req: Request, res: Response) {
  const { id } = req.params;
  const mongodbId = new ObjectId(id);
  const updates = req.body;
  res.setHeader("Content-Type", "application/json");
  try {
    const productOrder = await ProductOrder.findByIdAndUpdate(
      mongodbId,
      updates,
      { new: true }
    );
    res.status(200).send(JSON.stringify(productOrder));
  } catch (error) {
    res.status(500).send(JSON.stringify({ error }));
  }
}
