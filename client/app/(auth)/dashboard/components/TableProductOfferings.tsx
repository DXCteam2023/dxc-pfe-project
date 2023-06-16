"use client";
import React, { useState, useEffect, SyntheticEvent } from "react";
import Image from "next/image";
import axios from "axios";
import  dataCostumerOrders  from "../data/dataCostumerOrders";

import  dataProductOfferings  from "../data/dataProductOfferings";
interface ProductOfferings {
  state: string;
  orderDate: string;
  lastUpdate: string;
  status:string
}
const TableProductOfferings = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [productOfferings, setProductOfferings] = useState<ProductOfferings[]>(
    [],
  );
  const [data, setData] = useState<ProductOfferings[]>([]);
  async function getProductOfferings() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product-offering`,
      );
      const allProductOfferings = response.data;
      setProductOfferings(allProductOfferings);
     
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  }
  useEffect(()=>{
    getProductOfferings();
  },[])
  
  
  const recentOffers = productOfferings.sort((a, b) => {
    const date1 = new Date(
      parseInt(a.lastUpdate.split("/")[2]),
      parseInt(a.lastUpdate.split("/")[1]) - 1,
      parseInt(a.lastUpdate.split("/")[0]),
    );
    const date2 = new Date(
      parseInt(b.lastUpdate.split("/")[2]),
      parseInt(b.lastUpdate.split("/")[1]) - 1,
      parseInt(b.lastUpdate.split("/")[0]),
    );
    return date2.getTime() - date1.getTime();
  });
  // useEffect(() => {
  //   const filteredProduct = recentOffers.filter((product) => {
  //     const productValues = Object.values(product).join(" ").toLowerCase();
  //     const isMatchingSearchTerm = productValues.includes(
  //       searchTerm.toLowerCase(),
  //     );
  //     const isMatchingStatus =
  //       statusFilter === "All" || product.status === statusFilter;

  //     return isMatchingSearchTerm && isMatchingStatus;
  //   });

  //   setData(filteredProduct);
  //   console.log(filteredProduct);
  // }, [searchTerm, statusFilter, productOfferings]);

  const filteredProducts = recentOffers.filter((product) => {
    const orderValues = Object.values(product).join(" ").toLowerCase();
    const isMatchingSearchTerm = orderValues.includes(searchTerm.toLowerCase());
    const isMatchingStatus =
      statusFilter === "All" || product.status === statusFilter;

    return isMatchingSearchTerm && isMatchingStatus;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  {
    /*  Le code pour afficher 5 commande*/
  }

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  {
    /**switch color of state */
  }
  function getStateTextColor(status: string) {
    switch (status) {
      case "retired":
        return " text-yellow-900";
      case "in progress":
        return "text-blue-900";
      case "completed":
        return "text-green-900";
      case "canceled":
        return "text-red-900";
      default:
        return "";
    }
  }

  function getStateBgColor(
    status: string) {
    switch (
      status) {
      case "retired":
        return "bg-yellow-200 shadow-blue-300";
      case "draft":
        return "bg-blue-200  shadow-yellow-300";
      case "published":
        return "bg-green-200 shadow-green-300";
      case "archived":
        return "bg-red-200 shadow-red-300";
      default:
        return "";
    }
  }

  return (
    <>
      <div className="flex w-full rounded-lg bg-white  ">
        <div className="w-full">
          <div className="ml-2 flex mt-2 ">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div>
                  <h2 className="text-2xl font-semibold leading-tight">
                    Last Updated Product Offerings
                  </h2>
                </div>
                <div className="my-2 flex sm:flex-row flex-col">
                  <div className="flex flex-row mb-1 sm:mb-0">
                    <div className="relative">
                      <select
                        value={statusFilter}
                        onChange={handleStatusFilter}
                        className=" ml-2 px-8 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                      >
                        <option value="All">All</option>
                        <option value="retired">Retired</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                  <div className="block relative">
                    <input
                      placeholder=" Search..."
                      className=" mx-2 px-7 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="text-left w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="py-4 px-6 text-center bg-purple-800 font-semibold uppercase text-sm text-white border p-2 border-grey-light">
                            Display name
                          </th>
                          <th className="py-4 px-6 text-center bg-purple-800 font-semibold uppercase text-sm text-white border p-2 border-grey-light">
                            Description
                          </th>
                          <th className="py-4 px-6 text-center bg-purple-800 font-semibold uppercase text-sm text-white border p-2 border-grey-light">
                            Version
                          </th>
                          <th className="py-4 px-6 text-center bg-purple-800 font-semibold uppercase text-sm text-white border p-2 border-grey-light">
                            State
                          </th>
                         
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Last Update
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts
                          .slice(indexOfFirstOrder, indexOfLastOrder)
                          .map((product: any, index: number) => {
                            return (
                              <tr key={index}>
                                <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap text-main-color">
                                        <a
                                          href={product.link}
                                          className="text-blue-500 hover:text-blue-700"
                                        >
                                          {product.name}
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                <td className=" px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {product.description}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {product.internalVersion}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                  <span
                                    className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                      product.status,
                                    )} leading-tight`}
                                  >
                                    <span
                                      aria-hidden
                                      className={`absolute inset-0 ${getStateBgColor(
                                        product.status,
                                      )} rounded-full`}
                                    ></span>
                                    <span
                                      className={`relative inset-0 ${getStateTextColor(
                                        product.status,
                                      )} rounded-full`}
                                    >
                                      {product.status}
                                    </span>
                                  </span>
                                </td>
                             
                                <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                  {new Date(
                                          product.lastUpdate,
                                        ).toDateString()}
                                  </p>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    <div className=" bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
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
                          disabled={indexOfLastOrder >= recentOffers.length}
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
    </>
  );
};

export default TableProductOfferings;
