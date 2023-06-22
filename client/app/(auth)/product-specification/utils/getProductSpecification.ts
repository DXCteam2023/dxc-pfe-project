import axios from "axios";

export default async function getProductSpecification(
  id: string,
  setProduct: React.Dispatch<any>,
) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/product-specification/${id}`,
    );

    const productData = response.data;
    console.log("Prod Spec from GET:", productData);
    setProduct(productData);
  } catch (error) {
    console.error("Error while fetching product specification:", error);
  }
}
