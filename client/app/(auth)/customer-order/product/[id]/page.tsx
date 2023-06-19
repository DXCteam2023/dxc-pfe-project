"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dotenv from "dotenv";

import "../styles.css";

import UpdateProductForm from "../UpdateProductForm";
import Sidebar from "../../../dashboard/components/Sidebar";
import Header from "../../../dashboard/components/header/Header";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const page = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<any>();
  const [activeTab, setActiveTab] = useState(0);
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
  const [editingProductId, setEditingUserId] = useState(null);
  // const [products, setproducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleEditeProduct = () => {
    setShowForm(true);
    console.log("show form");
  };
  const handleCancel = () => {};

  // console.log("products", products);

  return (
    <div>
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          {product && (
            <div>
              <div className="h-full bg-white p-8">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                  <div className="flex items-center mt-2">
                    <div className=" mx-2 w-full flex items-center space-x-4 mt-2">
                      {showForm ? (
                        <UpdateProductForm
                          product={product}
                          onClose={() => setShowForm(false)}
                        />
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditeProduct()}
                            className="btn"
                          >
                            <span>Update</span>
                          </button>
                          <button
                            onClick={() => handleCancel()}
                            className="btn"
                          >
                            <span>Cancel Order</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                  <div className="w-full flex flex-col 2xl:w-1/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                      <h4 className="text-xl text-gray-900 font-bold">
                        product Order Informations
                      </h4>
                      <ul className="mt-2 text-gray-700">
                        <li className="flex border-y py-2">
                          <span className="font-bold w-24">External ID:</span>
                          <span className="text-gray-700">
                            {product.externalId}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Order Date:</span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(product.orderDate).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">State:</span>
                          <span className="text-gray-700">{product.state}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Start Date:</span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(
                              product.requestedStartDate,
                            ).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">
                            Resquested Completion Date:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(
                              product.requestedCompletionDate,
                            ).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">
                            Completion Date:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(product.completionDate).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">
                            Completion Date:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(
                              product.expectedCompletionDate,
                            ).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">PONR</span>
                          <span className="text-gray-700">{product.ponr}</span>
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
                                  Related Party
                                </button>
                                <button
                                  onClick={() => handleTabClick(1)}
                                  className={`${
                                    activeTab === 1
                                      ? "bg-purple-600 text-white"
                                      : ""
                                  } px-4 py-2 transition duration-100`}
                                >
                                  product Order Items
                                </button>
                                <button
                                  onClick={() => handleTabClick(2)}
                                  className={`${
                                    activeTab === 2
                                      ? "bg-purple-600 text-white"
                                      : ""
                                  } px-4 py-2 rounded-r-md transition duration-100`}
                                >
                                  product Characteristics
                                </button>
                              </div>

                              {activeTab === 0 && <Table1 product={product} />}
                              {activeTab === 1 && <Table2 product={product} />}
                              {activeTab === 2 && <Table3 product={product} />}
                            </div>
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
              Reference Type
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Referred Type
            </th>
          </tr>
        </thead>

        <tbody>
          {product.relatedParty.map((relation: any) => {
            const id = relation["@id"];
            const name = relation["name"];
            const referredType = relation["@referredType"];
            const type = relation["@type"];

            return (
              <tr className="hover:bg-grey-lighter " key={id}>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {name}
                </td>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {referredType}
                </td>
                <td className="py-4 px-6  border p-2 border-grey-light">
                  {type}
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
  const orderRelationships = product.orderRelationship;
  const productOrderItems = product.productOrderItem;
  return (
    <>
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              ID
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Action
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              order Relationship
            </th>

            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              product
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              state
            </th>
          </tr>
        </thead>
        <tbody>
          {product.productOrderItem.map((relation: any) => {
            const action = relation["action"];
            const id = relation["id"];
            const orderRelationship = relation["orderRelationship"];
            const state = relation["state"];

            return (
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6  border p-2 border-grey-light">
                  {id}
                </td>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {action}
                </td>
                <td className="py-4 px-6 mx-auto border p-2  border-grey-light">
                  <ul>
                    {orderRelationship.map((relation: any) => (
                      <li key={relation.id}>{relation.relationshipType}</li>
                    ))}
                  </ul>
                </td>

                <td className="py-4 px-6  border p-2 border-grey-light">
                  {" "}
                  <ul>
                    {productOrderItems.map((item: any) => (
                      <li key={item.id}>{item.product["@type"]}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-4 px-6 border p-2  border-grey-light">
                  {state}
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
  const productOrderItems = product.productOrderItem;
  return (
    <>
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
              Name
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {productOrderItems.map((item: any) => (
            <>
              <tr key={item.id}></tr>
              {item.product.productCharacteristic.map((characteristic: any) => (
                <tr key={characteristic.name}>
                  <td className="py-4 px-6  border p-2  border-grey-light">
                    {characteristic.name}
                  </td>
                  <td className="py-4 px-6 border p-2  border-grey-light mx-auto">
                    {characteristic.value}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default page;
function getProductOrders() {
  throw new Error("Function not implemented.");
}
