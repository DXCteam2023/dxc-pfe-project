import { Request, Response } from "express";
import { ProductOffering } from "../../models/productOffering";
export default async function addProductOffering(req: Request, res: Response) {
    try {
        // Create a new product using the request body data
        const product = new ProductOffering({
          name: req.body.name,
          description: req.body.description,
          productOfferingPrice: [
            {
              price: {
                taxIncludedAmount: {
                  unit: req.body.productOfferingPrice[0].price.taxIncludedAmount.unit,
                  value: req.body.productOfferingPrice[0].price.taxIncludedAmount.value
                }
              },
              priceType: req.body.productOfferingPrice[0].priceType
            }
          ],
          productspecification: req.body.productspecification, // Save the selected product specification's sys_id
          category: req.body.category,
          channel: req.body.channel,
          validFor: {
              startDateTime: req.body.validFor.startDateTime,
              endDateTime: req.body.validFor.endDateTime,
            },
          productSpecCharacteristic: req.body.productSpecCharacteristic,
        });
        // Save the product to the database
        await product.save();
        res.status(201).send({ message: "Product created successfully" });
      } catch (error) {
        res.status(500).send({ message: "Internal server error - products" });
      }
}
