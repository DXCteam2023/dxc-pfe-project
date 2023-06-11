import axios from "axios";

import { TCategory, TChannel, TSelectedProductSpec } from "../types";

const fetchProductSpecificationDetails = async (
  setSelectedProductSpec: (
    value: React.SetStateAction<TSelectedProductSpec | null>,
  ) => void,
  setCategory: (value: React.SetStateAction<TCategory | null>) => void,
  setChannel: (value: React.SetStateAction<TChannel[] | null>) => void,
  chosenProductSpecification: string,
) => {
  try {
    const specificationUrl = `http://localhost:5000/api/product-specification/${chosenProductSpecification}`;
    const specificationResponse = await axios.get(specificationUrl);
    const specificationData = await specificationResponse.data;
    setSelectedProductSpec(specificationData);
    setCategory({
      id: specificationData.category.id,
      name: specificationData.category.name,
    });
    setChannel(specificationData.channel || []);
  } catch (err) {
    console.error(err);
  }
};

export default fetchProductSpecificationDetails;
