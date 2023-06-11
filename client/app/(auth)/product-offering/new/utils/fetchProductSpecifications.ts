import axios from "axios";

import { TProductSpecification } from "../types";

const fetchProductSpecifications = async (
  setProductSpecifications: (
    value: React.SetStateAction<TProductSpecification[]>,
  ) => void,
) => {
  try {
    const url = "http://localhost:5000/api/product-specification";
    const response = await axios.get(url);
    const data = await response.data;
    setProductSpecifications(data);
  } catch (error) {
    console.error(error);
  }
};

export default fetchProductSpecifications;
