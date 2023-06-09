"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as dotenv from "dotenv";
import Product from "./product";
import IProductOfferingDocument from "../../../../../server/models/product-offering/IProductOffering";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface ProductProps {
  product: IProductOfferingDocument;
}
const listProductOffering: React.FC = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState<IProductOfferingDocument[]>([]);
  const productsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<IProductOfferingDocument[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // const res = await fetch(`http://localhost:5000/api/product-offering/`);
      const res = await fetch(`${AXIOS_URL}/api/product-offering/`);
      if (!res.ok) {
        throw new Error(
          `Failed to fetch products: ${res.status} ${res.statusText}`,
        );
      }
      const data = await res.json();
      console.log(data); // Log the parsed data
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  // const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);
  console.log(products, visibleProducts);

  return (
    <div
      className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8"
      style={{ padding: 60 }}
    >
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Number
            </th>
            <th scope="col" className="px-6 py-3">
              Display Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Product Specification
            </th>
            <th scope="col" className="px-6 py-3">
              Version
            </th>
            <th scope="col" className="px-6 py-3">
              State
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default listProductOffering;
