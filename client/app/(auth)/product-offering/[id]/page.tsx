"use client";

import axios from "axios";

import { useParams } from "next/navigation";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { IoIosArchive, IoMdRemoveCircle } from "react-icons/io";
import * as dotenv from "dotenv";

import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/header/Header";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const publishProductOffering = (id: string) => {
  try {
    axios
      .patch(`${AXIOS_URL}/api/product-offering/publish/servicenow/${id}`)
      .then(() => console.log("Product Offering has been published"))
      .catch(() =>
        console.log("There was an error while publishing the product offering"),
      );
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  } catch (e) {
    console.log(e);
  }
};

const archiveProductOffering = (id: string) => {
  try {
    axios
      .post(`${AXIOS_URL}/api/product-offering/archive/${id}`)
      .then(() => console.log("Product Offering has been archived"))
      .catch(() =>
        console.log("There was an error while archiving the product offering"),
      );
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  } catch (e) {
    console.log(e);
  }
};

export default async function SingleProductOfferingPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const productOffering = await axios(`${AXIOS_URL}/api/product-offering/${id}`)
    .then((response) => response.data)
    .catch((e) => console.log(e));

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="product-offering container mx-auto">
        <Header />
        <header className="py-5 flex items-center justify-between px-3">
          <div className="infos flex justify-between items-center">
            <div className="title font-medium text-lg me-3">
              {productOffering?.name}
            </div>
            <span
              className={
                " capitalize px-3 rounded-2xl text-white " +
                (productOffering?.status === "published"
                  ? "bg-green-500"
                  : productOffering?.status === "draft"
                  ? "bg-orange-400"
                  : productOffering?.status === "archived"
                  ? "bg-purple-400"
                  : "")
              }
            >
              {productOffering?.status}
            </span>
          </div>
          <div className="action-buttons flex gap-4">
            {productOffering?.status !== "published" ? (
              <button
                className="bg-green-400 py-1 px-3 rounded-md font-medium hover:bg-green-500 shadow-sm hover:shadow-md duration-300"
                onClick={() =>
                  publishProductOffering(productOffering.externalId)
                }
              >
                Publish
              </button>
            ) : (
              <button
                className="bg-orange-300 py-1 px-3 rounded-md font-medium hover:bg-orange-400 shadow-sm hover:shadow-md duration-300"
                onClick={() =>
                  archiveProductOffering(productOffering.externalId)
                }
              >
                Archive
              </button>
            )}
          </div>
        </header>
        <div className="my-5 p-5">
          <h1 className="text-4xl font-bold flex items-center">
            {productOffering?.status === "published" ? (
              <BsFillPatchCheckFill className="me-3 text-green-500" />
            ) : productOffering?.status === "draft" ? (
              <IoMdRemoveCircle className="me-3 text-orange-400" />
            ) : (
              <IoIosArchive className="me-3 text-purple-400" />
            )}
            {productOffering?.name}
          </h1>
          <div className="px-4 sm:px-0">
            <h3 className="text-lg  py-2 font-semibold leading-7 text-gray-500">
              {productOffering?.description}
              <div className="font-medium text-1xl">
                {productOffering.productOfferingPrice.map(
                  (offeringPrice: any, index: number) => {
                    return (
                      <div key={index} className="flex">
                        <span className="me-2">Price: </span>
                        <div className="text-green-600">
                          {offeringPrice.price.taxIncludedAmount.unit === "USD"
                            ? "$"
                            : "£"}
                          <span className="ms-1">
                            {offeringPrice.price.taxIncludedAmount.value}
                          </span>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </h3>
            <h2 className="mt-5 max-w-2xl text-2xl leading-6 text-blue-900 font-medium">
              Characteristics
            </h2>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {productOffering?.prodSpecCharValueUse.map(
                (characteristic: any, index: number) => {
                  return (
                    <div
                      className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                      key={index}
                    >
                      <dt className="leading-6 font-medium text-gray-900">
                        <h2>{characteristic.name}</h2>
                        <p className="text-sm text-gray-500">
                          {characteristic.description}
                        </p>
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 relative">
                        <ul className="flex gap-3 ">
                          {characteristic.productSpecCharacteristicValue
                            .length !== 0 ? (
                            characteristic.productSpecCharacteristicValue.map(
                              (characteristicValue: any, index: number) => {
                                return (
                                  <li
                                    className="py-1 px-3 shadow-md rounded-lg font-medium text-blue-800 hover:bg-blue-100 duration-300"
                                    key={index}
                                  >
                                    {characteristicValue.value}
                                  </li>
                                );
                              },
                            )
                          ) : (
                            <h3 className="font-medium text-1xl">Empty</h3>
                          )}
                        </ul>
                      </dd>
                    </div>
                  );
                },
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
