import { Request, Response } from "express";
import {ProductOrder} from "../../../models/productOrder";
export default async function getProductOrders(req: Request, res: Response) {
    try {
        const productOrders = await ProductOrder.find({});
    
        if (!productOrders) {
          return res.status(401).send({ message: "Data not Found" });
        }
    
        await res.status(200).json(productOrders);
      } catch (error) {
        res.status(500).send({ message: error });
        console.log("error : " + error);
      }

}
