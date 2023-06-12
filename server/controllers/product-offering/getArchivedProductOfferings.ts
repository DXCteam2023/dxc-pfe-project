import { Request, Response } from "express";
import { ProductOffering } from "../../models/productOffering";
export default async function getArchivedProductOfferings(
  req: Request,
  res: Response
) {
  try {
    const productOfferings = await ProductOffering.find({ status: "archived" });

    res.status(200).send(productOfferings);
    //res.status(200).send(productOfferings);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error - getArchivedProductOfferings" });
  }
}
