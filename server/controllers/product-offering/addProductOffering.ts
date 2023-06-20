import { Request, Response } from "express";
import { ProductOffering } from "../../models/productOffering";

let lastNumber = 0;

export default async function addProductOffering(req: Request, res: Response) {
  try {
    // Generate the auto-incrementing number
    const number = `PRDOF${lastNumber.toString().padStart(5, "0")}`;
    lastNumber = (lastNumber + 1) % 10001;

    // Create a new product using the request body data
    const product = new ProductOffering({
      name: req.body.name,
      description: req.body.description,

      productOfferingPrice: [
        {
          price: {
            taxIncludedAmount: {
              unit:
                req.body.productOfferingPrice[0].price.taxIncludedAmount.unit,
              value:
                req.body.productOfferingPrice[0].price.taxIncludedAmount.value,
            },
          },
          priceType: req.body.productOfferingPrice[0].priceType,
        },
      ],
      productSpecification: req.body.productSpecification,
      category: req.body.category,
      channel: req.body.channel,
      validFor: {
        startDateTime: req.body.validFor.startDateTime,
        endDateTime: req.body.validFor.endDateTime,
      },
      productSpecCharacteristic: req.body.productSpecCharacteristic,

      state: "draft",
      number: number,
      id: "", // Placeholder for the actual _id value
    });

    // Save the product to the database
    const savedProduct = await product.save();

    // Update the "id" field with the actual _id value
    savedProduct.id = savedProduct._id;

    // Find the last inserted document with the "number" field
    const lastInsertedProduct = await ProductOffering.findOne(
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

    res.status(201).send({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error - products" });
  }
}





// import { ProductOffering } from './../../models/productOffering';
// export default async function addProductOffering(req, res) {
//     try{
//     const po = req.body; // Assuming the request body contains the product to be added
//     const newProduct = await ProductOffering.create(po);
//     res.status(201).send(JSON.stringify(newProduct));
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ error });
//       }
// }

