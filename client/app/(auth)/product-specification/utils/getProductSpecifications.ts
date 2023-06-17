import axios from "axios";

export default async function getProductSpecifications(
  setProductSpecfications: React.Dispatch<React.SetStateAction<never[]>>,
) {
  try {
    const response = await axios.get(
      "https://dxc-pfe-project-server.vercel.app/api/product-specification",
    );
    const specificationData = response.data;
    setProductSpecfications(specificationData);
    console.log("hello", specificationData);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
  }
}
