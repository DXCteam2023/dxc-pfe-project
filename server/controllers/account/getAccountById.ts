import { Request, Response } from "express";
import  Account  from "../../models/account";

export default async function getAccountById(req: Request, res: Response) {
    try {
        const accountId = req.params.id;
        const account = await Account.findById(
         accountId
        );
    
        if (!account) {
          return res
            .status(404)
            .send({ message: "Product specification not found" });
        }
    
        res.status(200).send(account);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Internal server error -accounts" });
      }
}
