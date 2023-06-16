import { Request, Response } from "express";

import { ProductOffering } from "./../../models/productOffering";

export default async function getProductOfferings(req:Request, res:Response) {
    try {
        const po = await ProductOffering.find();
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(po));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
