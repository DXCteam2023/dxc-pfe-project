"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/app/(auth)/dashboard/components/Sidebar";
import Header from "@/app/(auth)/dashboard/components/Header";
import axios from "axios";

const Page = ({ params }: { params: { id: string } }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [product, setProduct] = useState<any>();
  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };
  useEffect(() => {
    getProductSpecification();
  }, [product]);
  console.log(product);
  async function getProductSpecification() {
    try {
      const id = params.id;
      console.log(id);
      const response = await axios.get(
        `http://localhost:5000/api/product-specification/${id}`,
      );

      const productData = response.data;
      console.log(response.data);
      setProduct(productData);
    } catch (error) {
      console.error("Error while fetching product specification:", error);
    }
  }

  //console.log(product);

  return (
    <div className="Product spec">
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          {product && (
            <div>
              <div className="h-full bg-white p-8">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                  <div className=" mx-2 flex items-center font-semibold text-gray-900 text-xl leading-8">
                    <span className="text-purple-500"></span>
                    <span>Related Product Offerings</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className=" mx-2 w-full flex items-center space-x-4 mt-2">
                      {/* <>
                          <button
                            
                            className="flex items-center bg-purple-600 hover:bg-purple-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                          >
                            <span>Update</span>
                          </button>
                          <button
                            
                            className="flex items-center bg-purple-600 hover:bg-purple-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                          >
                            <span>Cancel Order</span>
                          </button>
                        </>
                      */}
                    </div>
                  </div>
                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                  <div className="w-full flex flex-col 2xl:w-1/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                      <h4 className="text-xl text-gray-900 font-bold">
                        product Specification Informations
                      </h4>
                      <ul className="mt-2 text-gray-700">
                        <li className="flex border-y py-2">
                          <span className="font-bold w-24"> ID:</span>
                          <span className="text-gray-700">{product.id}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Name:</span>
                          <span className="text-gray-700"> {product.name}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Version:</span>
                          <span className="text-gray-700">
                            {product.version}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">
                            Internal Version:
                          </span>
                          <span className="text-gray-700">
                            {product.internalVersion}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Internal ID:</span>
                          <span className="text-gray-700">
                            {product.internalId}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Description:</span>
                          <span className="text-gray-700">
                            {product.description}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Last Update:</span>
                          <span className="text-gray-700">
                            {product.lastUpdate}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">
                            Start Date Time:
                          </span>
                          <span className="text-gray-700">
                            {product?.validFor?.startDateTime}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">End Date Time:</span>
                          <span className="text-gray-700">
                            {product?.validFor?.endDateTime}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                      <div className="relative ">
                        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                        {/* <div className="bg-white p-3 hover:shadow">
                          <div className="flex items-center font-semibold text-gray-900 text-xl leading-8">
                            <span className="text-purple-500"></span>
                            <span>i don't know </span>
                          </div>
                          <div className="container mr-5 ml-2 mx-auto bg-white shadow-xl">
                            <div className="w-11/12 mx-auto">
                              <div className="bg-white my-6">
                                <table className="text-left w-full border-collapse">
                                  <thead>
                                    <tr>
                                      <th className="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        Name
                                      </th>
                                      <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        Profile
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="hover:bg-grey-lighter">
                                      <td className="py-4 px-6 border-b border-grey-light"></td>
                                      <td className="py-4 px-6 text-center border-b border-grey-light"></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full 2xl:w-2/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                      <div className="relative ">
                        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                        <div className="bg-white p-3 hover:shadow">
                          <div className="flex items-center font-semibold text-gray-900 text-xl leading-8">
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
                                  service Specification
                                </button>
                                <button
                                  onClick={() => handleTabClick(1)}
                                  className={`${
                                    activeTab === 1
                                      ? "bg-purple-600 text-white"
                                      : ""
                                  } px-4 py-2 transition duration-100`}
                                >
                                  product Specification Relationship
                                </button>
                                <button
                                  onClick={() => handleTabClick(2)}
                                  className={`${
                                    activeTab === 2
                                      ? "bg-purple-600 text-white"
                                      : ""
                                  } px-4 py-2 rounded-r-md transition duration-100`}
                                >
                                  resource Specification
                                </button>
                              </div>

                              {activeTab === 0 && <Table1 product={product} />}
                              {activeTab === 1 && <Table2 product={product} />}
                              {activeTab === 2 && <Table3 product={product} />}
                              {/* {activeTab === 2 && <Table4 product={product} />} */}
                            </div>
                          </div>
                          <div className="mt-10 flex items-center font-semibold text-gray-900 text-xl leading-8 bg-white">
                            <span className="text-purple-500"></span>
                            <span>product Specification Characteristics</span>
                          </div>
                          <div className="container mr-5 ml-2 mx-auto bg-white shadow-xl">
                            <table className="text-left w-full border-collapse">
                              <thead>
                                <tr>
                                  <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                                    Name
                                  </th>
                                  <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                                    Description
                                  </th>
                                  <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
                                    Value Type
                                  </th>
                                  <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
                                    start Date time
                                  </th>
                                  
                                </tr>
                              </thead>

                              <tbody>
                                {product.productSpecCharacteristic.map(
                                  (relation: any) => {
                                    const name = relation["name"];
                                    const description = relation["description"];
                                    const valueType = relation["valueType"];

                                    return (
                                      <tr className="hover:bg-grey-lighter ">
                                        <td className="py-4 px-6  border p-2  border-grey-light">
                                          {name}
                                        </td>
                                        <td className="py-4 px-6  border p-2  border-grey-light">
                                          {description}
                                        </td>
                                        <td className="py-4 px-6  border p-2 border-grey-light">
                                          {valueType}
                                        </td>
                                        <td className="py-4 px-6 border p-2 border-grey-light">
                                          {
                                            product
                                              ?.productSpecCharacteristic[0]
                                              ?.validFor?.startDatetime
                                          }
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
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
              Name
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
              version
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
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
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Name
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Version
            </th>

            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              internal Version
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              type
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Start Date Time
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
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
                      {
                        product?.productSpecificationRelationship[0]?.validFor
                          ?.startDateTime
                      }
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
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Name
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Version
            </th>

            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
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

export default Page;

