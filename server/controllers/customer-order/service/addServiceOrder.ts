import { Request, Response } from "express";
import { ServiceOrder } from "../../../models/serviceOrder";

export default async function addServiceOrder(req: Request, res: Response) {
  try {
    const serviceOrderData = req.body;

    const serviceOrder = new ServiceOrder(serviceOrderData);

    const savedServiceOrder = await serviceOrder.save();

    res.status(201).json(savedServiceOrder);
  } catch (error) {
    res.status(500).send({ message: error });

    console.log("error: ", error);
  }
}
