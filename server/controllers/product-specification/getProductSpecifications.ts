import { Request, Response } from "express";
import { ProductSpecification } from "../../models/productSpecification";
export default async function getProductSpecifications(
  req: Request,
  res: Response
) {
  try {
    const productSpecifications = await ProductSpecification.find({});

    res.status(200).send(productSpecifications);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error - productspecifications" });
  }
}
