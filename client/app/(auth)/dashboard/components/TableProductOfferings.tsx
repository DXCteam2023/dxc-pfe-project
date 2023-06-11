"use client";
import React, { useState, useEffect, SyntheticEvent } from "react";
import Image from "next/image";
import { dataCostumerOrders } from "../data/dataCostumerOrders";
import { dataProductOfferings } from "../data/dataProductOfferings";

const TableProductOfferings = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [statusFilter, setStatusFilter] = useState<string>("All");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  // const filteredProducts = dataProductOfferings.filter((product) => {
  //  const orderValues = Object.values(product).join(" ").toLowerCase();
  //  const isMatchingSearchTerm = orderValues.includes(searchTerm.toLowerCase());
  //  const isMatchingStatus =
  //   statusFilter === "All" || product.state === statusFilter;

  // return isMatchingSearchTerm && isMatchingStatus;
  //});
  {
    /*  Le code pour afficher 5 commande*/
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
      case "draft":
        return "bg-yellow-200 shadow-yellow-300";
      case "published":
        return "bg-green-200 shadow-green-300";
      case "archived":
        return "bg-red-200 shadow-red-300";
      default:
        return "";
    }
  }

  const recentOffers = dataProductOfferings.sort((a, b) => {
    const date1 = new Date(
      parseInt(a.last_update.split("/")[2]),
      parseInt(a.last_update.split("/")[1]) - 1,
      parseInt(a.last_update.split("/")[0]),
    );
    const date2 = new Date(
      parseInt(b.last_update.split("/")[2]),
      parseInt(b.last_update.split("/")[1]) - 1,
      parseInt(b.last_update.split("/")[0]),
    );
    return date2.getTime() - date1.getTime();
  });
  const filteredProducts = recentOffers.filter((product) => {
    const orderValues = Object.values(product).join(" ").toLowerCase();
    const isMatchingSearchTerm = orderValues.includes(searchTerm.toLowerCase());
    const isMatchingStatus =
      statusFilter === "All" || product.state === statusFilter;

    return isMatchingSearchTerm && isMatchingStatus;
  });

  return (
    <>
      <div className="flex w-full">
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
                        className=" ml-2 px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                      >
                        <option value="All">All</option>
                        <option value="new">New</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                  <div className="block relative">
                    <input
                      placeholder=" Search..."
                      className=" mx-2 px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
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
                            Display name
                          </th>
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Version
                          </th>
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            State
                          </th>
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Short Description
                          </th>
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Contract Terms
                          </th>
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Start date
                          </th>
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            End date
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
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap text-main-color">
                                        <a
                                          href={product.link}
                                          className="text-blue-500 hover:text-blue-700"
                                        >
                                          {product.number}
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {product.display_name}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {product.version}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <span
                                    className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                      product.state,
                                    )} leading-tight`}
                                  >
                                    <span
                                      aria-hidden
                                      className={`absolute inset-0 ${getStateBgColor(
                                        product.state,
                                      )} opacity-50 rounded-full`}
                                    ></span>
                                    <span className="relative">
                                      {product.state}
                                    </span>
                                  </span>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {product.price} $
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {product.short_description}
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {product.Contract_terms}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {product.start_date}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {product.end_date}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {product.last_update}
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
