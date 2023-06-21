"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as dotenv from "dotenv";
import { IProductOfferingDocument } from "../../../../../server/models/productOffering";
import Product from "./product";

dotenv.config();

const AXIOS_URL = process.env.AXIOS_URL;

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
      const res = await fetch(`${AXIOS_URL}/api/product-offering/`)
        .then((data) => data.json())
        .catch((e) => console.log(e));
      console.log(res);
      setProducts(res);
    } catch (error) {
      console.error(error);
    }
  };
  // const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  // const renderPageNumbers = () => {
  //   return (
  //     <div className="pagination">
  //       {Array.from({ length: totalPages }, (_, index) => {
  //         const pageNumber = index + 1;
  //         const isActive = pageNumber === currentPage;
  //         const buttonClass = isActive ? "active" : "";

  //         return (
  //           <button
  //             className="btn btn-primary"
  //             key={pageNumber}
  //             onClick={() => handlePageChange(pageNumber)}
  //           >
  //             {pageNumber}
  //           </button>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  return (
    <div
      className="relative overflow-x-auto shadow-md sm:rounded-lg"
      style={{ padding: 60 }}
    >
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
