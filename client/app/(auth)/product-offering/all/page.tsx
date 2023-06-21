"use client";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import * as dotenv from "dotenv";

import ListProductOffering from "./listProductOffering";

dotenv.config();

const AXIOS_URL = process.env.AXIOS_URL;

type ProductOffering = {
  id: string;
  number: string;
  name: string;
  description: string;
  productSpecification: { name: string };
  version: string;
  state: string;
  validFor: { startDateTime: string };
};

export default function AllProductOfferingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const [products, setProducts] = useState<ProductOffering[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${AXIOS_URL}/api/product-offering/`)
        .then((data) => data.json())
        .catch((e) => console.log(e));
      console.log(res);
      setProducts(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <ListProductOffering />
    </div>
  );
}
