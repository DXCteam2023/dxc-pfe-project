"use client";
import { off } from "process";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/header/Header";

// Importing utility functions
import { getProductSpecification } from "../utils";
import ChartSpecification from "./ChartSpecification";
import Banner from "../../dashboard/components/banner";

const SingleProductSpecificationPage = ({
  params,
}: {
  params: {
    id: string;
    productSpecification: string;
    productSpecificationName: string;
    name: string;
    internalId: string;
  };
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [productSpec, setProductSpec] = useState<any>();
  const [productOfferings, setProductOfferings] = useState<any[]>([]);
  const [filteredOffering, SetFiltredOffering] = useState<any[]>([]);

  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };
  useEffect(() => {
    getProductSpecification(params.id, setProductSpec);
  }, []);

  async function getProductOfferingsBySpecification() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product-offering",
      );
      const allProductOfferings = response.data;
      console.log(allProductOfferings);

      const filteredOfferings = allProductOfferings.filter((offering: any) => {
        return (
          offering.productSpecification &&
          offering.productSpecification.id &&
          offering.productSpecification.id.trim() === productSpec.id.trim()
        );
      });

      console.log("filteredOfferings", filteredOfferings);
      return filteredOfferings;
    } catch (error) {
      console.error("Error reading product offerings:", error);
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      const offerings = await getProductOfferingsBySpecification();
      setProductOfferings(offerings);
    }
    setTimeout(() => {
      console.log("After 2s");
      fetchData();
    }, 1000);
  }, [productSpec]);

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

  function getStateBgColor(status: string) {
    switch (status) {
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
    <div className="Product spec">
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          {productSpec && (
            <div>
              <div>
                <div className="h-full bg-white p-8">
                  <div className="bg-white rounded-lg shadow-xl pb-8">
                    <div className="mx-2 flex items-center font-semibold text-gray-900 text-xl leading-8">
                      <span className="text-purple-500"></span>
                      <span>Related Product Offerings</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="mx-2 w-full flex items-center space-x-4">
                        {productOfferings.length === 0 && (
                          <div className="w-full">
                            <div className="bg-white px-4 pt-4 pb-2 rounded-lg shadow-lg">
                              <table className="w-full">
                                <thead>
                                  <tr className="bg-gray-100 border-b">
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2 border-grey-light">
                                      Display Name
                                    </th>

                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                                      Description
                                    </th>
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2 border-grey-light">
                                      Version
                                    </th>
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
                                      Product Specification
                                    </th>
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
                                      Last Update
                                    </th>
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
                                      Status
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="mx-auto">
                                  <tr>
                                    <td colSpan={6} className="text-center">
                                      <span className="text-red-700 font-semibold text-md">
                                        No related offerings found.
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {productOfferings.length > 0 && (
                          <div className="w-full">
                            <div className="bg-white px-4 pt-4 pb-2 rounded-lg shadow-lg">
                              <table className="w-full">
                                <thead>
                                  <tr className="bg-gray-100 border-b">
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2 border-grey-light">
                                      Display Name
                                    </th>

                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                                      Description
                                    </th>
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2 border-grey-light">
                                      Version
                                    </th>
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
                                      Last Update
                                    </th>
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
                                      Product Specification
                                    </th>
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
                                      Status
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {productOfferings.map((offering: any) => (
                                    <tr key={offering.id} className="border-b">
                                      <td className="py-4 px-6 text-indigo-00 border p-2  border-grey-light">
                                        {offering.name}
                                      </td>
                                      <td className="py-4 px-6 text-gray-900 border p-2  border-grey-light">
                                        {offering.description}
                                      </td>
                                      <td className="py-4 px-6 text-gray-900 border p-2  border-grey-light">
                                        {offering.internalVersion}
                                      </td>
                                      <td className="py-4 px-6 text-blue-700 border p-2 font-semibold border-grey-light">
                                        {offering.productSpecification.name}
                                      </td>
                                      <td className="py-4 px-6 text-gray-900 border p-2 border-grey-light">
                                        {new Date(
                                          offering.lastUpdate,
                                        ).toDateString()}
                                      </td>
                                      <td className="py-2 px-4">
                                        <div
                                          className={`rounded-full py-1 px-4 ${getStateBgColor(
                                            offering.status,
                                          )}`}
                                        >
                                          <span
                                            className={`text-sm font-semibold ${getStateTextColor(
                                              offering.status,
                                            )}`}
                                          >
                                            {offering.status}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="w-full flex flex-col 2xl:w-1/3">
                      <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">
                          Product Specification Informations
                        </h4>
                        <ul className="mt-2 text-gray-700">
                          <li className="flex border-y py-2">
                            <span className="font-bold w-24"> ID:</span>
                            <span className="text-purple-800 font-semibold">
                              {productSpec.id}
                            </span>
                          </li>
                          <li className="flex border-b py-2">
                            <span className="font-bold w-24">Name:</span>
                            <span className="text-gray-700">
                              {" "}
                              {productSpec.name}
                            </span>
                          </li>
                          <li className="flex border-b py-2">
                            <span className="font-bold w-24">Version:</span>
                            <span className="text-gray-700">
                              {productSpec.version}
                            </span>
                          </li>
                          <li className="flex border-b py-2">
                            <span className="font-bold w-40">
                              Internal Version:
                            </span>
                            <span className="text-gray-700">
                              {productSpec.internalVersion}
                            </span>
                          </li>
                          {/* <li className="flex border-b py-2">
                          <span className="font-bold w-24">Internal ID:</span>
                          <span className="text-gray-700">
                            {productSpec.internalId}
                          </span>
                        </li> */}
                          <li className="flex border-b py-2">
                            <span className="font-bold w-24">Description:</span>
                            <span className="text-gray-700">
                              {productSpec.description}
                            </span>
                          </li>
                          <li className="flex border-b py-2">
                            <span className="font-bold w-40">Last Update:</span>
                            <span className="text-gray-700">
                              {new Date(productSpec.lastUpdate).toDateString()}
                            </span>
                          </li>
                          <li className="flex border-b py-2">
                            <span className="font-bold w-40">
                              Start Date Time:
                            </span>
                            <span className="text-gray-700">
                              {productSpec?.validFor?.startDateTime}
                            </span>
                          </li>
                          <li className="flex border-b py-2">
                            <span className="font-bold w-40">
                              End Date Time:
                            </span>
                            <span className="text-gray-700">
                              {productSpec?.validFor?.endDateTime}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                        {/* <ChartSpecification /> */}
                      </div>
                    </div>
                    <div className="flex  flex-col w-full 2xl:w-2/3">
                      <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                        <div className="relative ">
                          <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                          <div className="bg-white p-3 hover:shadow">
                            <div className="mt-8 flex items-center font-semibold text-gray-900 text-xl leading-8">
                              <span className="text-purple-500"></span>
                              <span>Related List</span>
                            </div>
                            <div className="container mr-5 ml-2 mx-auto bg-white shadow-xl">
                              <div className="w-11/12 mx-auto">
                                <div className="bg-white my-6">
                                  <button
                                    onClick={() => handleTabClick(0)}
                                    className={`${
                                      activeTab === 0
                                        ? "bg-purple-600 text-white"
                                        : ""
                                    } px-4 py-2 rounded-l-md transition duration-100`}
                                  >
                                    Service Specification
                                  </button>
                                  <button
                                    onClick={() => handleTabClick(1)}
                                    className={`${
                                      activeTab === 1
                                        ? "bg-purple-600 text-white"
                                        : ""
                                    } px-4 py-2 transition duration-100`}
                                  >
                                    Product Specification Relationship
                                  </button>
                                  <button
                                    onClick={() => handleTabClick(2)}
                                    className={`${
                                      activeTab === 2
                                        ? "bg-purple-600 text-white"
                                        : ""
                                    } px-4 py-2 rounded-r-md transition duration-100`}
                                  >
                                    Resource Specification
                                  </button>
                                </div>

                                {activeTab === 0 && (
                                  <Table1 product={productSpec} />
                                )}
                                {activeTab === 1 && (
                                  <Table2 product={productSpec} />
                                )}
                                {activeTab === 2 && (
                                  <Table3 product={productSpec} />
                                )}
                                {/* {activeTab === 2 && <Table4 product={product} />} */}
                              </div>
                            </div>
                            <div className="mt-10 flex items-center font-semibold text-gray-900 text-xl leading-8 bg-white">
                              <span className="text-purple-500 py-8"></span>
                              <span>Product Specification Characteristics</span>
                            </div>
                            <div className="container mr-5 ml-2 mx-auto bg-white shadow-xl">
                              <table className="text-left w-full border-collapse">
                                <thead>
                                  <tr>
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2 border-grey-light">
                                      Name
                                    </th>
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                                      Description
                                    </th>
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
                                      Value Type
                                    </th>
                                    <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
                                      start Date time
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {productSpec.productSpecCharacteristic.map(
                                    (relation: any, index: number) => {
                                      const name = relation["name"];
                                      const description =
                                        relation["description"];
                                      const valueType = relation["valueType"];

                                      return (
                                        <tr
                                          key={index}
                                          className="hover:bg-grey-lighter "
                                        >
                                          <td className="py-4 px-6  border p-2  border-grey-light">
                                            {name}
                                          </td>
                                          <td className="py-4 px-6  border p-2  border-grey-light">
                                            {description}
                                          </td>
                                          <td className="py-4 px-6  border p-2 border-grey-light">
                                            {valueType}
                                          </td>
                                          <td className="py-4 px-6 border text-indigo-600 font-semibold p-2 border-grey-light">
                                            {new Date(
                                              productSpec?.productSpecCharacteristic[0]?.validFor?.startDatetime,
                                            ).toDateString()}
                                          </td>
                                        </tr>
                                      );
                                    },
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-xl p-8"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const Table1 = ({ product }: any) => {
  return (
    <>
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            {/* <th className="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
            Id
          </th> */}
            <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2 border-grey-light">
              Name
            </th>
            <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2 border-grey-light">
              version
            </th>
            <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
              internalVersion
            </th>
          </tr>
        </thead>

        <tbody>
          {product.serviceSpecification.map((relation: any) => {
            const id = relation["id"];
            const name = relation["name"];
            const version = relation["version"];
            const internalVersion = relation["internalVersion"];

            return (
              <tr className="hover:bg-grey-lighter " key={id}>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {name}
                </td>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {version}
                </td>
                <td className="py-4 px-6  border p-2 border-grey-light">
                  {internalVersion}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const Table2 = ({ product }: any) => {
  const validFor = product.validFor;
  return (
    <>
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Name
            </th>
            <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Version
            </th>

            <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
              internal Version
            </th>
            <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
              type
            </th>
            <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Start Date Time
            </th>
            <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
              End Date Time
            </th>
          </tr>
        </thead>
        <tbody>
          {product.productSpecificationRelationship.map((relation: any) => {
            const name = relation["name"];
            const version = relation["version"];
            const internalVersion = relation["internalVersion"];
            const type = relation["type"];

            return (
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6  border p-2 border-grey-light">
                  {name}
                </td>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {version}
                </td>
                <td className="py-4 px-6 mx-auto border p-2  border-grey-light">
                  {internalVersion}
                </td>
                <td className="py-4 px-6 mx-auto border p-2  border-grey-light">
                  {type}
                </td>

                <td className="py-4 px-6 border p-2 border-grey-light">
                  <ul>
                    <li>
                      {new Date(
                        product?.productSpecificationRelationship[0]?.validFor?.startDateTime,
                      ).toDateString()}
                    </li>
                  </ul>
                </td>
                <td className="py-4 px-6 border p-2 border-grey-light">
                  <ul>
                    <li>
                      {
                        product?.productSpecificationRelationship[0]?.validFor
                          ?.endDateTime
                      }
                    </li>
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
const Table3 = ({ product }: any) => {
  const serviceOrderItems = product.serviceOrderItem;
  return (
    <>
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Name
            </th>
            <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Version
            </th>

            <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border p-2  border-grey-light">
              internal Version
            </th>
          </tr>
        </thead>
        <tbody>
          {product.resourceSpecification.map((relation: any) => {
            const name = relation["name"];
            const version = relation["version"];
            const internalVersion = relation["internalVersion"];

            return (
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6  border p-2 border-grey-light">
                  {name}
                </td>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {version}
                </td>
                <td className="py-4 px-6 mx-auto border p-2  border-grey-light">
                  {internalVersion}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SingleProductSpecificationPage;
