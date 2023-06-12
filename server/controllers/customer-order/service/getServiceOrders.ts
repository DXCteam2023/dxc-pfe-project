import { Request, Response } from "express";
import { ServiceOrder } from "../../../models/serviceOrder";

export default async function getServiceOrders(req: Request, res: Response) {
  try {
    const serviceOrders = await ServiceOrder.find({});

    if (!serviceOrders) {
      return res.status(401).send({ message: "Data not Found" });
    }

    await res.status(200).json(serviceOrders);
  } catch (error) {
    res.status(500).send({ message: "Internal server Error - error while getting Data" });
    console.log("error : " + error);
  }
}
