"use client";
import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface ProductOrders {
  state: string;
  orderDate: string;
  ponr: string;
}
const BarChart = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<ProductOrders[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  useEffect(() => {
    getProductOrders();
  }, []);

  async function getProductOrders() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/product`,
      );
      const productsData = response.data;
      setProducts(productsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des products:", error);
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const filteredOrders = products.filter((order) => {
    const orderValues = Object.values(order).join(" ").toLowerCase();
    const isMatchingSearchTerm = orderValues.includes(searchTerm.toLowerCase());
    const isMatchingStatus =
      statusFilter === "All" || order.state === statusFilter;

    return isMatchingSearchTerm && isMatchingStatus;
  });

  {
    /* Le code pour afficher 5 commande*/
  }

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

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
  function getStateTextColor(state: string) {
    switch (state) {
      case "new":
        return "text-blue-900";
      case "in progress":
        return "text-yellow-900";
      case "in draft":
        return "text-orange-900";
      case "completed":
        return "text-green-900";
      case "canceled":
        return "text-red-900";
      default:
        return "";
    }
  }

  function getStateBgColor(state: string) {
    switch (state) {
      case "new":
        return "bg-blue-200 shadow-blue-300";
      case "in progress":
        return "bg-yellow-200 shadow-yellow-300";
      case "in draft":
        return "bg-orange-200 shadow-orange-300";
      case "completed":
        return "bg-green-200 shadow-green-300";
      case "canceled":
        return "bg-red-200 shadow-red-300";
      default:
        return "";
    }
  }
  const recentOrders = filteredOrders.sort((a, b) => {
    const date1 = new Date(a.orderDate);
    const date2 = new Date(b.orderDate);
    return date2.getTime() - date1.getTime();
  });

  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className=" flex mt-2 ">
          <div className="container mx-auto ">
            <div className="py-1">
              <div>
                <h2 className="text-2xl font-semibold leading-tight">
                  Recents Customer Orders
                </h2>
              </div>
              <div className="my-2 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={handleStatusFilter}
                      className="  ml-2 px-8 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                    >
                      <option value="All">All</option>
                      <option value="new">New</option>
                      <option value="in progress">In progress</option>
                      <option value="completed">Completed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </div>
                </div>
                <div className="block relative">
                  <input
                    placeholder=" Search..."
                    className="mx-2 px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full  overflow-hidden">
                  <table className="text-left w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 font-semibold uppercase text-sm text-white border p-2 border-grey-light">
                          Number
                        </th>
                        {/* <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold  uppercase tracking-wider">
                          Account
                        </th> */}
                        <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 font-semibold uppercase text-sm text-white border p-2 border-grey-light">
                          Created At
                        </th>
                        <th className=" py-4 px-6 text-center bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600  font-semibold uppercase text-sm text-white border p-2 border-grey-light">
                          Status
                        </th>
                        {/* <th className="py-4 px-6 text-center bg-purple-800 font-semibold uppercase text-sm text-white border p-2 border-grey-light">
                          Type
                        </th> */}
                        <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 font-semibold uppercase text-sm text-white border p-2 border-grey-light">
                          Requested Start Date
                        </th>
                        <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 font-semibold uppercase text-sm text-white border p-2 border-grey-light">
                          Requested Completion Date
                        </th>
                        {/* <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Total
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders
                        .slice(indexOfFirstOrder, indexOfLastOrder)
                        .map((order: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td className="px-5 py-5 border p-2  border-grey-light px-5 py-5 border-dashed border-t border-gray-200 px-3 text-md ">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      <a
                                        href={order.link}
                                        className="text-blue-500 hover:text-blue-700 text-main-color"
                                      >
                                        {order.number}
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.account}
                                </p>
                              </td> */}
                              <td className="px-5 py-5 border p-2  border-grey-light px-5 py-5 border-dashed border-t border-gray-200 px-3 text-md ">
                                <p className="text-indigo-900  font-semibold whitespace-no-wrap">
                                  {new Date(order.orderDate).toDateString()}
                                </p>
                              </td>
                              <td className="px-5 py-5 border p-2  border-grey-light px-5 py-5 border-dashed border-t border-gray-200 px-3 text-md ">
                                <span
                                  className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                    order.state,
                                  )} leading-tight`}
                                >
                                  <span
                                    aria-hidden
                                    className={`absolute inset-0 ${getStateBgColor(
                                      order.state,
                                    )} rounded-full`}
                                  ></span>
                                  <span
                                    className={`relative inset-0 ${getStateTextColor(
                                      order.state,
                                    )} rounded-full`}
                                  >
                                    {order.state}
                                  </span>
                                </span>
                              </td>

                              {/* <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.category}
                                    </p>
                                  </div>
                                </div>
                              </td> */}
                              <td className="px-5 py-5 border p-2  border-grey-light px-5 py-5 border-dashed border-t border-gray-200 px-3 text-md ">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {new Date(
                                        order.requestedStartDate,
                                      ).toDateString()}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-5 border p-2  border-grey-light px-5 py-5 border-dashed border-t border-gray-200 px-3 text-md ">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {new Date(
                                    order.requestedCompletionDate,
                                  ).toDateString()}
                                </p>
                              </td>
                              {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.price}
                                </p>
                              </td> */}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                    <span className="text-xs xs:text-sm text-gray-900">
                      Showing {indexOfFirstOrder + 1} to{" "}
                      {Math.min(indexOfLastOrder, recentOrders.length)} of{" "}
                      {recentOrders.length} Entries
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                      <button
                        className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white fo font-semibold py-2 px-4 rounded-l"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>

                      <button
                        className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-r"
                        onClick={handleNextPage}
                        disabled={indexOfLastOrder >= recentOrders.length}
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
  );
};

export default BarChart;
