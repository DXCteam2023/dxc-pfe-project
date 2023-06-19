import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.AXIOS_URL;

export default async function getProductSpecification(
  id: string,
  setProduct: React.Dispatch<any>,
) {
  try {
    const response = await axios.get(
      `${AXIOS_URL}/api/product-specification/${id}`,
    );

    const productData = response.data;
    console.log(response.data);
    setProduct(productData);
  } catch (error) {
    console.error("Error while fetching product specification:", error);
  }
}
