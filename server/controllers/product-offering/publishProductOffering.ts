import { Request, Response } from "express";
import axios from "axios";


export default async function publishProductOffering(req: Request, res: Response) {
    try {
        // Make the POST request to ServiceNow API
        const url = "https://dev174830.service-now.com/api/sn_ind_tmt_orm/catalogmanagement/productoffering";
        const auth = {
          username: "admin",
          password: "rL4=I7iLPw%n",
        };
        const payload = {};
    
        const response = await axios.post(url, payload, { auth });
    
        if (response.status === 200) {
          console.log("Product offering published successfully in ServiceNow .");
        } else {
          console.error("Failed to publishing the Product offering in ServiceNow", response.data);
        }
    
      res.status(201).send({ message: "Product Published successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error - publishing product" });
    }
  }
  