import { Request, Response } from "express";
import { ProductOrder } from "../../../models/productOrder";
import { Data } from "../../../models/data";
import { ObjectId } from "mongodb";

export default async function addProductOrder(req: Request, res: Response) {
  res.setHeader("Content-Type", "application/json");

  try {
    const payload = req.body;

    const data = await Data.findOne({});

    const mongodbId: ObjectId = new ObjectId(data._id);

    // payload.externalId = newProductOrder.id;
    // payload.state = newProductOrder.state;

    const productOrder = await ProductOrder.create(payload);
    const order_number = +data.order_number + 1;

    await Data.findByIdAndUpdate(
      mongodbId,
      { order_number: order_number },
      { new: true }
    );
    res.status(201).send(
      JSON.stringify({
        message: "New product order inserted",
        productOrder: productOrder,
      })
    );
  } catch (e) {
    res.status(500).send(JSON.stringify({ exeption: e }));
  }
}
