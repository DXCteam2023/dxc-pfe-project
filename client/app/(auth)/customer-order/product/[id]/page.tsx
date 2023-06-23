"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { IoMdOptions } from "react-icons/io";
import { FiFilter, FiRefreshCcw } from "react-icons/fi";
import * as dotenv from "dotenv";
import NoRecord from "../../../../../public/assets/NoRecord.png";
import Sidebar from "../../../dashboard/components/Sidebar";
import Header from "../../../dashboard/components/header/Header";

import "../styles.css";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const page = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<any>();
  const [activeTab, setActiveTab] = useState(0);
  const [stateFilter, setStateFilter] = useState("");
  const [selectedPONR, setSelectedPONR] = useState("");

  const handleStateFilter = (state: string) => {
    setStateFilter(state);
  };

  const handleAllFilter = () => {
    setStateFilter("");
    setSelectedPONR("");
  };
  const handlePONRFilter = (value: string) => {
    setSelectedPONR(value);
  };
  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };
  useEffect(() => {
    getProductOrderById();
  }, []);

  async function getProductOrderById() {
    try {
      const id = params.id;
      console.log("params id", params.id);
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/product/${id}`,
      );
      console.log(response);
      const ProductOrderData = response.data;

      setProduct(ProductOrderData);
      console.log("Product Data:", ProductOrderData);
    } catch (error) {
      console.error("Error while fetching product order:", error);
    }
  }

  const [visibleInputs, setVisibleInputs] = useState<number[]>([]);
  const [versionColumnVisible, setVersionColumnVisible] = useState(false);
  const [relationColumnVisible, setrelationColumnVisible] = useState(false);
  const [idColumnVisible, setidColumnVisible] = useState(false);
  const toggleInputVisibility = (index: number) => {
    if (visibleInputs.includes(index)) {
      setVisibleInputs(visibleInputs.filter((item) => item !== index));
    } else {
      setVisibleInputs([...visibleInputs, index]);
    }
  };
  const handleTestClick = () => {
    setVersionColumnVisible(true);
  };
  const handlerelationClick = () => {
    setrelationColumnVisible(true);
  };
  const handleidClick = () => {
    setidColumnVisible(true);
  };

  return (
    <div>
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-gray min-h-screen-100 w-5/6">
          <Header />
          {product && (
            <div>
              <div className="h-full bg-white p-8">
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
                            Product Orders
                          </a>
                        </div>
                      </li>
                    </ol>
                  </nav>

                  <button className="btn2">Change</button>
                  <button className="btn1">Disconnect</button>

                  <div className="flex flex-wrap -mx-3 mb-6 mt-20">
                    <div className="w-full md:w-1/3 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                        External ID:
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        value={product._id}
                        disabled
                      ></input>
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                        State:
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        value={product.state}
                        disabled
                      ></input>
                    </div>

                    <div className="w-full md:w-1/3 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                        Order Date:
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        value={product.orderDate}
                      ></input>
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                        Resquested Completion Date:
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        value={product.requestedCompletionDate}
                      ></input>
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                        PONR:
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        value={product.ponr ? "True" : "False"}
                      ></input>
                    </div>

                    <div className="w-full md:w-1/3 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                        Channel:
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        value={product.channel[0].name}
                      ></input>
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                        Expected Completion Date:
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        value={product.expectedCompletionDate}
                      ></input>
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                        Completion Date:
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        value={product.completionDate}
                      ></input>
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                        Requested Start Date:
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        value={product.requestedStartDate}
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="tabs">
                  <div
                    className={`tab ${activeTab === 0 ? "active" : ""}`}
                    onClick={() => handleTabClick(0)}
                  >
                    product Order Item
                  </div>
                  <div
                    className={`tab ${activeTab === 1 ? "active" : ""}`}
                    onClick={() => handleTabClick(1)}
                  >
                    Related Party
                  </div>
                  <div
                    className={`tab ${activeTab === 2 ? "active" : ""}`}
                    onClick={() => handleTabClick(2)}
                  >
                    Note
                  </div>
                </div>
                <div
                  className={`tab-content ${activeTab === 0 ? "active" : ""}`}
                >
                  <div className="dropdown">
                    <button
                      className="dropbtn"
                      onClick={handleAllFilter}
                      title="Refresh"
                    >
                      <FiRefreshCcw size={20} color="white" />
                    </button>
                  </div>
                  <div className="dropdown">
                    <button className="dropbtn">
                      <IoMdOptions size={20} color="white" />
                    </button>
                    <div className="dropdown-content">
                      <div className="submenu">
                        <a href="#">SHOW/HIDE</a>
                        <div className="submenu-content">
                          <a
                            className="px-3 py-1.5 rounded-md bg-white border border-gray-300"
                            onClick={() =>
                              setVersionColumnVisible(!versionColumnVisible)
                            }
                          >
                            {versionColumnVisible ? "Hide" : "Show"} version
                          </a>
                          <a
                            className="px-3 py-1.5 rounded-md bg-white border border-gray-300"
                            onClick={() => setidColumnVisible(!idColumnVisible)}
                          >
                            {idColumnVisible ? "Hide" : "Show"} ID
                          </a>
                          <a
                            className="px-3 py-1.5 rounded-md bg-white border border-gray-300"
                            onClick={() =>
                              setrelationColumnVisible(!relationColumnVisible)
                            }
                          >
                            {relationColumnVisible ? "Hide" : "Show"}{" "}
                            relationship
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button className="dropbtn">
                      <FiFilter size={20} color="white" />
                    </button>
                    <div className="dropdown-content">
                      <div className="submenu">
                        <a href="#">State</a>
                        <div className="submenu-content">
                          <a onClick={() => handleStateFilter("completed")}>
                            <p className="text-black-500">Completed</p>
                          </a>
                          <a onClick={() => handleStateFilter("canceled")}>
                            <p className="text-black-500">Canceled</p>
                          </a>
                          <a onClick={() => handleStateFilter("on hold")}>
                            <p className="text-black-500">On Hold</p>
                          </a>
                          <a onClick={() => handleStateFilter("In progress")}>
                            <p className="text-black-500">In Progress</p>
                          </a>
                          <a onClick={() => handleStateFilter("scheduled")}>
                            <p className="text-black-500">Scheduled</p>
                          </a>
                          <a onClick={() => handleStateFilter("new")}>
                            <p className="text-black-500">New</p>
                          </a>
                          <a onClick={() => handleStateFilter("in draft")}>
                            <p className="text-black-500">in draft</p>
                          </a>
                        </div>
                      </div>
                      <div className="submenu">
                        <a href="#">PONR</a>
                        <div className="submenu-content">
                          <a onClick={() => handlePONRFilter("true")}>
                            <p className="text-black-500">True</p>
                          </a>
                          <a onClick={() => handlePONRFilter("false")}>
                            <p className="text-black-500">False</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto table-container">
                    <div className="table-responsive">
                      <table className="w-full max-w-full mx-auto shadow rounded-lg overflow-hidden">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider">
                              Order Line Item
                            </th>
                            <th
                              className={`px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider ${
                                idColumnVisible ? "" : "hidden"
                              }`}
                            >
                              id
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider">
                              ponr
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider">
                              quantity
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider">
                              action
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider">
                              product Specification
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider">
                              Product Offering
                            </th>
                            <th
                              className={`px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider ${
                                relationColumnVisible ? "" : "hidden"
                              }`}
                            >
                              Relationship
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider">
                              state
                            </th>
                            <th
                              className={`px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider ${
                                versionColumnVisible ? "" : "hidden"
                              }`}
                            >
                              {" "}
                              version
                            </th>

                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider">
                              itemPrice
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.productOrderItem.length === 0 ? (
                            <tr className="tabbody">
                              <td colSpan={8} className="no-results">
                                <center>
                                  <Image
                                    className="image"
                                    src={NoRecord}
                                    alt="No record"
                                  />
                                </center>
                                <center>No records to display</center>
                              </td>
                            </tr>
                          ) : (
                            product.productOrderItem
                              .filter((item: any) => {
                                // Filtrer par état
                                if (
                                  stateFilter !== "" &&
                                  item.state !== stateFilter
                                ) {
                                  return false;
                                }

                                // Filtrer par PONR
                                if (
                                  selectedPONR !== "" &&
                                  item.ponr !== selectedPONR
                                ) {
                                  return false;
                                }

                                return true;
                              })
                              .map((item: any, index: number) => (
                                <tr key={index}>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <div className="flex items-center">
                                      <div className="ml-3">
                                        <a className="text-gray-900 whitespace-no-wrap">{`ORDL${(
                                          index + 1
                                        )
                                          .toString()
                                          .padStart(7, "0")}`}</a>{" "}
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className={`px-5 py-5 border-b border-gray-200 bg-white text-sm text-center ${
                                      idColumnVisible ? "" : "hidden"
                                    }`}
                                  >
                                    {" "}
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {item.id}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <span
                                      className={`relative inline-block px-3 py-1 font-semibold rounded-full text-black-900 leading-tight ${
                                        item.ponr
                                          ? "bg-green-200"
                                          : "bg-red-200"
                                      }`}
                                    >
                                      <span className="relative ">
                                        {item.ponr ? "True" : "False"}
                                      </span>
                                    </span>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {item.quantity}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {item.action}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {item.product.productSpecification.name}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {item.productOffering.name}
                                    </p>
                                  </td>
                                  <td
                                    className={`px-5 py-5 border-b border-gray-200 bg-white text-sm text-center ${
                                      relationColumnVisible ? "" : "hidden"
                                    }`}
                                  >
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {
                                        item.productOrderItemRelationship[0]
                                          .relationshipType
                                      }
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                                      <span
                                        aria-hidden
                                        className={`absolute inset-0 ${
                                          item.state === "completed"
                                            ? "bg-green-200"
                                            : item.state === "on hold"
                                            ? "bg-yellow-200"
                                            : item.state === "in progress"
                                            ? "bg-blue-200"
                                            : item.state === "canceled"
                                            ? "bg-red-200"
                                            : item.state === "scheduled"
                                            ? "bg-purple-200"
                                            : ""
                                        } rounded-full`}
                                      ></span>
                                      <span className="relative">
                                        {item.state}
                                      </span>
                                    </span>
                                  </td>
                                  <td
                                    className={`px-5 py-5 border-b border-gray-200 bg-white text-sm text-center ${
                                      versionColumnVisible ? "" : "hidden"
                                    }`}
                                  >
                                    {" "}
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {item.version}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    {item.itemPrice.map(
                                      (
                                        price: {
                                          priceType: string;
                                          price: {
                                            taxIncludedAmount: {
                                              value: any;
                                              unit: any;
                                            };
                                          };
                                        },
                                        priceIndex:
                                          | React.Key
                                          | null
                                          | undefined,
                                      ) => {
                                        if (price.priceType === "recurring") {
                                          return (
                                            <p
                                              key={priceIndex}
                                              className="text-gray-900 whitespace-no-wrap"
                                            >
                                              {`${price.price.taxIncludedAmount.value} ${price.price.taxIncludedAmount.unit}`}
                                            </p>
                                          );
                                        }
                                        return null;
                                      },
                                    )}
                                  </td>
                                </tr>
                              ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div
                  className={`tab-content ${activeTab === 1 ? "active" : ""}`}
                >
                  <div className="overflow-x-auto table-container">
                    <div className="table-responsive">
                      <div className="dropdown">
                        <button className="dropbtn" title="Refresh">
                          <FiRefreshCcw size={20} color="white" />
                        </button>
                      </div>
                      <div className="dropdown">
                        <button className="dropbtn" title="Refresh">
                          <IoMdOptions size={20} color="white" />
                        </button>
                      </div>
                      <div className="dropdown">
                        <button className="dropbtn" title="Refresh">
                          <FiFilter size={20} color="white" />
                        </button>
                      </div>
                      <table className=" w-full max-w-full mx-auto shadow rounded-lg overflow-hidden">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider">
                              id
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider">
                              REFERRED TYPE
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-center text-xs font-semibold uppercase tracking-wider">
                              TYPE
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.relatedParty.map(
                            (
                              relatedParty: {
                                [x: string]: any;
                                _id: any;
                                name: any;
                              },
                              index: React.Key | null | undefined,
                            ) => (
                              <tr key={index}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {relatedParty.name}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {relatedParty._id}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {relatedParty["@referredType"]}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {relatedParty["@type"]}
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div
                  className={`tab-content ${activeTab === 2 ? "active" : ""}`}
                >
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    value={product.note}
                  ></input>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
