import axios from "axios";

export default async function getProductSpecification(
  id: string,
  setProduct: React.Dispatch<any>,
) {
  try {
    const response = await axios.get(
      `https://dxc-pfe-project-server.vercel.app/api/product-specification/${id}`,
    );

    const productData = response.data;
    console.log(response.data);
    setProduct(productData);
  } catch (error) {
    console.error("Error while fetching product specification:", error);
  }
}
