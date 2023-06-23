"use client";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";

import ListProductOffering from "./listProductOffering";
import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";

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
      const res = await fetch(
        "https://dxc-pfe-project-server.vercel.app/api/product-offering/",
      )
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
      <Header styleElements={{
        linksColor: undefined
      }}/>
      <ListProductOffering />
      <Footer/>
    </div>
  );
}
