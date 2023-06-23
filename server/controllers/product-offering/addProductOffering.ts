import { Request, Response } from "express";
import ProductOfferingModel from "../../models/product-offering/productOffering";
import axios from "axios";

export default async function addProductOffering(req: Request, res: Response) {
  let lastNumber = 0;
  try {
    // Generate the auto-incrementing number
    const number = `DXC${lastNumber.toString().padStart(5, "0")}`;
    lastNumber = (lastNumber + 1) % 10001;

    // Create a new product using the request body data
    const product = new ProductOfferingModel({
      name: req.body.name,
      state: "In Draft",
      description: req.body.description,
      productOfferingPrice: [
        {
          price: {
            taxIncludedAmount: {
              unit: req.body.productOfferingPrice[0].price.taxIncludedAmount
                .unit,
              value:
                req.body.productOfferingPrice[0].price.taxIncludedAmount.value,
            },
          },
          priceType: req.body.productOfferingPrice[0].priceType,
        },
      ],
      productSpecification: req.body.productSpecification, // Save the selected product specification's sys_id
      category: req.body.category,
      channel: req.body.channel,
      validFor: {
        startDateTime: req.body.validFor.startDateTime,
        endDateTime: req.body.validFor.endDateTime,
      },
      productSpecCharacteristic: req.body.productSpecCharacteristic,
      number: number,
      id: "", // Placeholder for the actual _id value
    });
    // Save the product to the database
    const savedProduct = await product.save();
    //await product.save();
    // Update the "id" field with the actual _id value
    savedProduct.id = savedProduct._id;

    // Find the last inserted document with the "number" field
    const lastInsertedProduct = await ProductOfferingModel.findOne(
      { number: { $exists: true } },
      {},
      { sort: { _id: -1 } }
    );

    if (lastInsertedProduct && lastInsertedProduct.number) {
      // Extract the numeric portion of the last number and increment it
      const lastNumberValue = parseInt(
        lastInsertedProduct.number.slice(3), // Remove the prefix "DXC"
        10
      );

      if (!isNaN(lastNumberValue) && lastNumberValue < 10000) {
        // Increment the last number
        lastNumber = lastNumberValue + 1;
      }
    }

    // Save the product again with the updated "number"
    savedProduct.number = `DXC${lastNumber.toString().padStart(5, "0")}`;
    await savedProduct.save();

    // Make the POST request to ServiceNow API
    const url =
      "https://dev174830.service-now.com/api/sn_prd_pm_adv/catalogmanagement/productoffering";
    const auth = {
      username: "admin",
      password: "rL4=I7iLPw%n",
    };
    const payload = {
      name: req.body.name,
      description: req.body.description,
      version: "",
      validFor: req.body.validFor,
      productOfferingTerm: "12_months",
      productOfferingPrice: req.body.productOfferingPrice,
      productSpecification: req.body.productSpecification,
      productSpecCharacteristic: req.body.productSpecCharacteristic,
      channel: req.body.channel,
      category: req.body.category,
    };

    console.log("testeeee" + req.body.productOfferingPrice);
    const response = await axios.post(url, payload, { auth });

    if (response.status === 200) {
      console.log("Payload sent to ServiceNow successfully.");
    } else {
      console.error("Failed to send payload to ServiceNow.", response.data);
    }

    res.status(201).send({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error - products" });
  }
}
