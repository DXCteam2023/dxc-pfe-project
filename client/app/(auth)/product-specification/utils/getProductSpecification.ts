import axios from "axios";

export async function getProductSpecification(
  id: string,
  setProduct: React.Dispatch<any>,
) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/product-specification/${id}`,
    );

    const productData = response.data;
    console.log(response.data);
    setProduct(productData);
  } catch (error) {
    console.error("Error while fetching product specification:", error);
  }
}
