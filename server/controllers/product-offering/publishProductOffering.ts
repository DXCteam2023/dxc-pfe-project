import { Request, Response } from "express";
import axios from "axios";

export default async function publishProductOffering(
  req: Request,
  res: Response
) {
  try {
    const id = req.params.id; // Retrieve the id from route parameters
    console.log(id);

    // Make the PATCH request to ServiceNow API
    const url = `https://dev174830.service-now.com/api/sn_prd_pm_adv/catalogmanagement/publish_product_offering/${id}`;
    const auth = {
      username: "admin",
      password: "rL4=I7iLPw%n",
    };
    const payload = {};

    const response = await axios.patch(url, payload, {
      auth,
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      console.log("Product offering published successfully in ServiceNow.");
    } else {
      console.error(
        "Failed to publish the Product offering in ServiceNow",
        response.data
      );
    }

    res.status(201).send({
      message: "Product published successfully",
      productOffering: response.data,
    });
  } catch (error) {
    console.error("An error occurred:", error.response);
    res
      .status(500)
      .send({ message: "Internal server error - publishing product" });
  }
}
