import { Request, Response } from "express";
import { ProductOffering } from "../../models/productOffering";

export default async function getProductOfferingById(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  try {
    const productOffering = await ProductOffering.findById(id);
    res.setHeader("Content-Type", "application/json");
    if (productOffering) {
      res.status(200).send(JSON.stringify(productOffering));
    } else {
      res.status(404).send(
        JSON.stringify({
          message: "No product offering with ID: " + id,
        })
      );
    }
  } catch (error) {
    res.status(500).send(JSON.stringify({ error }));
  }
}
