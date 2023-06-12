import { Request, Response } from "express";
import { ProductOffering } from "../../models/productOffering";
export default async function getProductOfferings(
  req: Request,
  res: Response
) {

  try {
    const productOfferings = await ProductOffering.find({})


    res.status(200).send(productOfferings)
    //res.status(200).send(productOfferings);
  } catch (error) {
    res.status(500).send({ message: "Internal server error - getArchivedProductOfferings" });
  }
}
