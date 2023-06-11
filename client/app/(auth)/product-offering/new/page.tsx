"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import Link from "next/link";

import type {
  TProductSpecification,
  TSelectedProductSpec,
  TProductOfferingPrice,
  TCategory,
  TChannel,
} from "./types";

import {
  fetchProductSpecifications,
  fetchProductSpecificationDetails,
  // createProductOffering,
} from "./utils";

import "./Form.css";

export default function NewProductOfferingPage() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  //const [productPrice, setProductPrice] = useState(0);
  const [productSpecifications, setProductSpecifications] = useState<
    TProductSpecification[]
  >([]);
  const [chosenProductSpecification, setChosenProductSpecification] =
    useState("");
  const [category, setCategory] = useState<TCategory | null>(null);
  const [channel, setChannel] = useState<TChannel[] | null>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedProductSpec, setSelectedProductSpec] =
    useState<TSelectedProductSpec | null>(null);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState("");
  const [selectedCharacteristicValue, setSelectedCharacteristicValue] =
    useState("");
  const [productOfferingPrice, setProductOfferingPrice] =
    useState<TProductOfferingPrice>({
      price: { taxIncludedAmount: { unit: "", value: "" } },
      priceType: "",
    });

  useEffect(() => {
    fetchProductSpecifications(setProductSpecifications);
  }, []);

  const handleCharacteristicChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCharacteristic = event.target.value;
    setSelectedCharacteristic(selectedCharacteristic);
    setSelectedCharacteristicValue("");
  };

  const handleCharacteristicValueChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    setSelectedCharacteristicValue(value);
  };

  return (
    <div className="flex w-full">
      <div className="ml-2 flex mt-2 shadow-lg shadow-gray-500 md:shadow-1/2xl md:shadow-gray-500">
        <div className="Details">
          <nav className="navbar">
            <h3>ProductOffering</h3>
          </nav>
          <div className="Infos">
            {/* Add any other properties of the order object here */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Name:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="name"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              {/* <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                State:
              </label>

              <select
                id="state"
                name="state"
                autoComplete="state-name"
                className=" block w-full  bg-gray-200 text-gray-700 border border-Gray-500  py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-md  "
              >
                <option>Closed Complete</option>
                <option>In Progress</option>
                <option>On Hold</option>
                <option>Canceled</option>
                <option>Scheduled</option>
              </select>
            </div> */}
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                  Productspecifecation:
                </label>

                <select
                  className=" block w-full  bg-gray-200 text-gray-700 border border-Gray-500  py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-md  "
                  id="productSpecification"
                  value={chosenProductSpecification}
                  onChange={(e) => {
                    setChosenProductSpecification(e.target.value);
                    setCategory(null); // Updated
                    setChannel(null); // Updated
                  }}
                  onBlur={() =>
                    fetchProductSpecificationDetails(
                      setSelectedProductSpec,
                      setCategory,
                      setChannel,
                      chosenProductSpecification,
                    )
                  }
                  required
                >
                  <option value="">Select a product specification</option>
                  {productSpecifications.map((spec) => (
                    <option key={spec._id} value={spec._id}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Channel:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="channel"
                  type="text"
                  value={
                    channel ? channel.map((item) => item.name).join(", ") : []
                  }
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Category:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="category"
                  type="text"
                  value={category?.name || ""}
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Start Date:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  End Date:
                </label>

                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              {selectedProductSpec && (
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Product Spec Characteristic:
                  </label>
                  <select
                    className=" block w-full  bg-gray-200 text-gray-700 border border-Gray-500  py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-md  "
                    id="productSpecCharacteristic"
                    onChange={handleCharacteristicChange}
                  >
                    <option value="">
                      Select a product spec characteristic
                    </option>
                    {selectedProductSpec.productSpecCharacteristic.map(
                      (characteristic) => (
                        <option
                          key={characteristic.name}
                          value={characteristic.name}
                        >
                          {characteristic.name}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              )}
              {selectedCharacteristic && (
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Characteristic Value:
                  </label>
                  <select
                    className=" block w-full  bg-gray-200 text-gray-700 border border-Gray-500  py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-md  "
                    id="productSpecCharacteristicValue"
                    onChange={handleCharacteristicValueChange}
                  >
                    <option value="">Select a characteristic value</option>
                    {selectedProductSpec?.productSpecCharacteristic
                      .find(
                        (characteristic) =>
                          characteristic.name === selectedCharacteristic,
                      )
                      ?.productSpecCharacteristicValue.map((value) => (
                        <option key={value.value} value={value.value}>
                          {value.value}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Price Unit::
                </label>

                <input
                  className=" block w-full  bg-gray-200 text-gray-700 border border-Gray-500  py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-md  "
                  id="unit"
                  type="text"
                  value={productOfferingPrice.price.taxIncludedAmount.unit}
                  onChange={(e) =>
                    setProductOfferingPrice((prev) => ({
                      ...prev,
                      price: {
                        ...prev.price,
                        taxIncludedAmount: {
                          ...prev.price.taxIncludedAmount,
                          unit: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Price Value:
                </label>
                <input
                  className=" block w-full  bg-gray-200 text-gray-700 border border-Gray-500  py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-md  "
                  id="value"
                  type="text"
                  value={productOfferingPrice.price.taxIncludedAmount.value}
                  onChange={(e) =>
                    setProductOfferingPrice((prev) => ({
                      ...prev,
                      price: {
                        ...prev.price,
                        taxIncludedAmount: {
                          ...prev.price.taxIncludedAmount,
                          value: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Price Type
                </label>

                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="priceType"
                  value={productOfferingPrice.priceType}
                  onChange={(e) =>
                    setProductOfferingPrice((prev) => ({
                      ...prev,
                      priceType: e.target.value,
                    }))
                  }
                >
                  <option value="nonRecurring">Non-Recurring</option>
                  <option value="recurring">Recurring</option>
                </select>
              </div>
              <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Short description:
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href="/customer-order/all/product">
                  <button className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
