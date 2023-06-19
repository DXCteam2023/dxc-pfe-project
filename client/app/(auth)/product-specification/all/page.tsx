"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dotenv from "dotenv";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import StatistiqueSpecification from "./statistiqueSpecification";

import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/header/Header";

// Importing utility functions
import { getProductSpecifications } from "../utils";

dotenv.config();

const AXIOS_URL = process.env.AXIOS_URL;

interface ProductOrders {
  status: string;
}

export default function AllProductSpecificationsPage() {
  const [productSpecifications, setProductSpecifications] = useState<
    ProductOrders[]
  >([]);
  const [data, setData] = useState<ProductOrders[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  useEffect(() => {
    getProductSpecifications();
  }, []);

  async function getProductSpecifications() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/product-specification`,
      );
      const specificationData: ProductOrders[] = response.data;
      setProductSpecifications(specificationData);
      console.log("hello", specificationData);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  }

  useEffect(() => {
    const filteredProd = productSpecifications.filter((product) => {
      const productValues = Object.values(product).join(" ").toLowerCase();
      const isMatchingSearchTerm = productValues.includes(
        searchTerm.toLowerCase(),
      );
      const isMatchingStatus =
        statusFilter === "All" || product.status === statusFilter;
      return isMatchingSearchTerm && isMatchingStatus;
    });
    // Update the filtered products based on the current page
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setData(filteredProd.slice(indexOfFirstItem, indexOfLastItem));
  }, [productSpecifications, searchTerm, statusFilter, currentPage]);

  function getStateTextColor(status: string) {
    switch (status) {
      case "active":
        return "text-blue-900";
      case "in progress":
        return "text-yellow-900";
      case "completed":
        return "text-green-900";
      case "canceled":
        return "text-red-900";
      default:
        return "";
    }
  }

  function getStateBgColor(status: string) {
    switch (status) {
      case "draft":
        return "bg-blue-200 shadow-blue-300";
      case "published":
        return "bg-green-200 shadow-yellow-300";
      case "completed":
        return "bg-yellow-200 shadow-green-300";
      case "on hold":
        return "bg-orange-200 shadow-red-300";
      case "canceled":
        return "bg-red-200 shadow-red-300";
      default:
        return "";
    }
  }

  const filteredProds = data.filter((product) => {
    if (statusFilter === "All") {
      return true;
    }
    return product.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const ordersPerPage = 5;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  // const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white  min-h-screen-100 w-5/6  ">
        <Header />
        <div className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
          <nav className="flex px-5 py-3 text-gray-700  rounded-lg bg-purple-100">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-purple-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="purple"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Dashboard
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="purple"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <a
                    href="#"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Product Specifications
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex w-full">
          <div className="w-full">
            <StatistiqueSpecification />
            <div className="ml-2 flex mt-2 ">
              <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight">
                      Product Specifications
                    </h2>
                  </div>
                  <div className="my-2 flex sm:flex-row flex-col">
                    <div className="flex flex-row mb-1 sm:mb-0">
                      <div className="relative ">
                        <select
                          className=" mx-4 ml-2 px-8 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                          value={statusFilter}
                          onChange={handleStatusFilter}
                        >
                          <option value="All">All</option>
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="retired">Retired</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-row mb-1 sm:mb-0">
                      <div className="relative ">
                        <select className=" mx-4 ml-2 px-8 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm">
                          <option value="All">order By</option>
                          <option value="new">A to Z</option>
                          <option value="old">Z to A</option>
                        </select>
                      </div>
                    </div>
                    <div className="block relative">
                      <input
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="  Search ...."
                        className="mx-2 px-6 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                              Name
                            </th>
                            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                              Version
                            </th>
                            {/* <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Internal Version
                            </th> */}
                            <th className=" py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                              Description
                            </th>
                            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                              state
                            </th>
                            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                              Start Date
                            </th>
                            <th className=" py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                              End Date
                            </th>

                            <th className=" py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProds
                            .slice(indexOfFirstOrder, indexOfLastOrder)
                            .map((product: any, index: number) => {
                              return (
                                <tr key={index}>
                                  <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                    <p className="text-gray-900 whitespace-no-wrap  font-lg text-semibold leading-6 ">
                                      {product.name}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                    <p className="text-indigo-700 whitespace-no-wrap font-semibold">
                                      {product.version}
                                    </p>
                                  </td>
                                  {/* <td className="px-5 py-5 border p-2  border-grey-light border-gray-200 bg-white text-sm">
                                  {product.internalVersion}
                                </td> */}
                                  <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                    <div className="flex items-center ">
                                      <div className="ml-3 ">
                                        <p className="text-md text-gray-700 hover:text-gray-600 leading-6">
                                          {product.description}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                    <div className="flex items-center">
                                      <div className="ml-3">
                                        {/* <p className="text-gray-900  whitespace-no-wrap">
                                        {new Date(
                                          product.lastUpdate,
                                        ).toDateString()}
                                      </p> */}
                                        <span
                                          className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                            product.status,
                                          )} leading-tight`}
                                        >
                                          <span
                                            aria-hidden
                                            className={`absolute inset-0 ${getStateBgColor(
                                              product.status,
                                            )}  rounded-full`}
                                          ></span>
                                          <span
                                            className={`relative inset-0 ${getStateTextColor(
                                              product.status,
                                            )}  rounded-full`}
                                          >
                                            {product.status}
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                    <div className="flex items-center ">
                                      <div className="ml-3 ">
                                        <p className="text-md text-gray-700 hover:text-gray-600 leading-6">
                                          {product?.validFor?.startDateTime}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                    <div className="flex items-center ">
                                      <div className="ml-3 ">
                                        <p className="text-md text-gray-700 hover:text-gray-600 leading-6">
                                          {product?.validFor?.endDateTime}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                    <div className="flex item-center justify-center">
                                      <Link
                                        href={`/product-specification/${product._id}`}
                                        className=" button text-sm bg-yellow-300 text-white font-semibold py-2 px-2 rounded-r flex items-end transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300"
                                      >
                                        View
                                      </Link>

                                      {/* <button
                                      className="mx-2 text-sm text-white font-semibold py-2 px-2 rounded-r flex items-end transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-300"
                                      // onClick={handleCancelClick}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="red"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </button> */}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                          Showing 1 to 4 of 50 Entries
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                          <button
                            className="text-sm bg-purple-700 hover:bg-purple-400 text-white fo font-semibold py-2 px-4 rounded-l"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>

                          <button
                            className="text-sm bg-purple-700 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-r"
                            onClick={handleNextPage}
                            disabled={indexOfLastOrder >= filteredProds.length}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
