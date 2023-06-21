import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { ProductOffering } from "./../../models/productOffering";

export default async function updateProductOffering(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;
    const mongodbId = new ObjectId(id);
    const po = req.body;
    console.log(mongodbId);
    // console.log("el merabet: ", id)
    // Assuming the request body contains the product to be added
    // console.log("Amjad:  ",po)
    const newProduct = await ProductOffering.findByIdAndUpdate(mongodbId, po, {
      new: true,
    });
    res.setHeader("Content-Type", "application/json");
    if (newProduct) {
      res.status(200).send(JSON.stringify(newProduct));
    } else {
      res.status(404).send(
        JSON.stringify({
          message: "No product offering found with the ID: " + id,
        })
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
