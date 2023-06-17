"use client";
import Header from "@/app/(auth)/dashboard/components/header/Header";
import axios from "axios";
import React, { useState, useEffect, SyntheticEvent } from "react";

const ArchivedProductOfferings = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dataoriginal, setDataOriginal] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    await axios
      .get(
        "https://dxc-pfe-project-server.vercel.app/api/product-offering/archived/all",
      )
      .then((response) => {
        setData(response.data);
        setDataOriginal(response.data);
      });
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filteredServices = dataoriginal.filter((service) => {
      const serviceValues = Object.values(service).join(" ").toLowerCase();
      const isMatchingSearchTerm = serviceValues.includes(
        searchTerm.toLowerCase(),
      );

      return isMatchingSearchTerm;
    });

    setData(filteredServices);
    console.log(filteredServices);
  }, [searchTerm]);

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

  return (
    <div className="flex w-full">
      <div className="w-full">
        <Header />
        <h1 className="text-center text-blue-700 text-4xl font-bold my-5">
          Archived Product Offerings
        </h1>
        <div className="ml-2 flex mt-2 ">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div></div>
              <div className="my-2 flex sm:flex-row flex-col">
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
                          name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold  uppercase tracking-wider">
                          description
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          lastUpdate
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          version
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          productOfferingTerm
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          productSpecification
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          status
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          category
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        .slice(indexOfFirstOrder, indexOfLastOrder)
                        .map((order: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      <a className="text-blue-500 hover:text-blue-700 text-main-color">
                                        {order.name}
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.description}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.lastUpdate}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span
                                  className={`relative inline-block px-3 py-1 font-semibold  leading-tight`}
                                >
                                  <span className="relative">
                                    {order.version}
                                  </span>
                                </span>
                              </td>

                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.productOfferingTerm}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.productSpecification.name}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.status}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.category[0].name}
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
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
                        disabled={indexOfLastOrder >= data.length}
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

export default ArchivedProductOfferings;
