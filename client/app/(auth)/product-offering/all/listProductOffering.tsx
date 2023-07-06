"use client";
import React, { useEffect, useState } from "react";
import "./form.css";
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
  const [products, setProducts] = useState<IProductOfferingDocument[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const npage = Math.ceil(products.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);
  const numbers = Array.from({ length: npage }, (_, i) => i + 1);

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

  return (
    <div
      className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8"
      style={{ padding: 60 }}
    >
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {/* <th scope="col" className="px-6 py-3">
              Number
            </th> */}
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
          {records.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </tbody>
      </table>
      <nav className="flex justify-center">
        <ul className="pagination flex space-x-2">
          <li className="page-item">
            <a href="#" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <a href="#" onClick={() => changePage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  function changePage(n: number): void {
    setCurrentPage(n);
  }
};

export default listProductOffering;
