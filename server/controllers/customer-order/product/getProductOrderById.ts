import { Request, Response } from "express";
import { ProductOrder } from "../../../models/productOrder";

export default async function getProductOrderById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const productOrder = await ProductOrder.findById(id);

    if (productOrder) {
      return res.status(200).send(productOrder);
    }

    res.status(402).send({ message: "Product Order doesn't exist" });
  } catch (error) {
    res.status(500).send({ message: error });
    console.log("error: " + error);
  }
}


