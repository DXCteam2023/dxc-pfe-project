import { Request, Response } from "express";
import { ProductSpecification } from "../../models/productSpecification";
export default async function getProductOfferingById(
  req: Request,
  res: Response
) {
  try {
    const productSpecificationId = req.params.id;
    const productSpecification = await ProductSpecification.findById(productSpecificationId);

    if (!productSpecification) {
      return res.status(404).send({ message: "Product specification not found" });
    }

    res.status(200).send(productSpecification);
  } catch (error) {
    res.status(500).send({ message: "Internal server error - productspecifications" });
  }
}
