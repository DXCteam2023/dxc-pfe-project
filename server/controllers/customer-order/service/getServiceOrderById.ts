import { Request, Response } from "express";
import { ServiceOrder } from "../../../models/serviceOrder";

export default async function getServiceOrderById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const serviceOrder = await ServiceOrder.findById(id);

    if (serviceOrder) {
      return res.status(200).send(serviceOrder);
    }

    res.status(402).send({ message: "Service Order doesn't exist" });
  } catch (error) {
    res.status(500).send({ message: error });
    console.log("error: " + error);
  }
}
