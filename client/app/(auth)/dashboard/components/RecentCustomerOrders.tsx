"use client";
import React, { useState, useEffect, SyntheticEvent } from "react";
import Image from "next/image";
import { dataCostumerOrders } from "../data/dataCostumerOrders";
const BarChart = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [statusFilter, setStatusFilter] = useState<string>("All");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const filteredOrders = dataCostumerOrders.filter((order) => {
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
  const ordersPerPage = 5;

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
      case "completed":
        return "bg-green-200 shadow-green-300";
      case "canceled":
        return "bg-red-200 shadow-red-300";
      default:
        return "";
    }
  }
  const recentOrders = filteredOrders.sort((a, b) => {
    const date1 = new Date(
      parseInt(a.orderDate.split("/")[2]),
      parseInt(a.orderDate.split("/")[1]) - 1,
      parseInt(a.orderDate.split("/")[0]),
    );
    const date2 = new Date(
      parseInt(b.orderDate.split("/")[2]),
      parseInt(b.orderDate.split("/")[1]) - 1,
      parseInt(b.orderDate.split("/")[0]),
    );
    return date2.getTime() - date1.getTime();
  });

  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="ml-2 flex mt-2 ">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
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
                      className="  ml-2 px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
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
                  <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current text-gray-500"
                    >
                      <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                    </svg>
                  </span>
                  <input
                    placeholder=" Search"
                    className="mx-2 px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Number
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold  uppercase tracking-wider">
                          Account
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Created At
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Created By
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders
                        .slice(indexOfFirstOrder, indexOfLastOrder)
                        .map((order: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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

                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.account}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.orderDate}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span
                                  className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                    order.state,
                                  )} leading-tight`}
                                >
                                  <span
                                    aria-hidden
                                    className={`absolute inset-0 ${getStateBgColor(
                                      order.state,
                                    )} opacity-50 rounded-full`}
                                  ></span>
                                  <span className="relative">
                                    {order.state}
                                  </span>
                                </span>
                              </td>

                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.category}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.contact}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.created_by}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.price}
                                </p>
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
                        className="text-sm bg-wpurple-700 hover:bg-purple-400 text-white fo font-semibold py-2 px-4 rounded-l"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>

                      <button
                        className="text-sm bg-purple-700 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-r"
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
