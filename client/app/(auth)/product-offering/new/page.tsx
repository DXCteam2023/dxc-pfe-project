"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
// import axios, { AxiosResponse } from "axios";
import axios from "axios";
import * as dotenv from "dotenv";
import Link from "next/link";
import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/header/Header";

import "./Form.css";
// eslint-disable-next-line import/order
import Swal from "sweetalert2";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface ProductSpecification {
  _id: string;
  name: string;
  id: string;
  version: string;
  internalVersion: string;
  internalId: string;
}

interface ProductCharacteristic {
  name: string;
  valueType: string;
  productSpecCharacteristicValue: Array<{ value: string }>;
}

interface ProductSpecificationRelationship {
  id: string;
  name: string;
}

interface SelectedProductSpec {
  id: string;
  name: string;
  productSpecCharacteristic: ProductCharacteristic[];
  productSpecificationRelationship: ProductSpecificationRelationship[];
  version: string;
  internalId: string;
  internalVersion: string;
  category: {
    id: string;
    name: string;
  };
  channel: Array<{ id: string; name: string }>;
}

interface RelatedProductSpec {
  id: string;
  name: string;
  productSpecCharacteristic: ProductCharacteristic[];
}

export default function NewProductOfferingPage() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState<{ id: string; name: string } | null>(
    null,
  );
  const [channel, setChannel] = useState<{ id: string; name: string }[] | null>(
    null,
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [productSpecifications, setProductSpecifications] = useState<
    ProductSpecification[]
  >([]);
  const [chosenProductSpecification, setChosenProductSpecification] =
    useState<string>("");
  const [selectedProductSpec, setSelectedProductSpec] =
    useState<SelectedProductSpec | null>(null);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState<
    string[]
  >([]);
  const [selectedCharacteristicValues, setSelectedCharacteristicValues] =
    useState<Array<Array<string>>>([]);
  const [
    relatedProductSpecCharacteristics,
    setRelatedProductSpecCharacteristics,
  ] = useState<RelatedProductSpec[] | null>(null);
  const [characteristics, setCharacteristics] = useState<string[]>([]);
  const [productOfferingPrice, setProductOfferingPrice] = useState<{
    price: {
      taxIncludedAmount: {
        unit: string;
        value: string;
      };
    };
    priceType: string;
  }>({ price: { taxIncludedAmount: { unit: "", value: "" } }, priceType: "" });

  useEffect(() => {
    fetchProductSpecifications();
  }, []);
  const fetchProductSpecifications = async () => {
    try {
      const response = await axios.get<ProductSpecification[]>(
        `${AXIOS_URL}/api/product-specification`,
      );
      const data = response.data;
      setProductSpecifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSpecificationDetails = async () => {
    try {
      const response = await axios.get<SelectedProductSpec>(
        `${AXIOS_URL}/api/product-specification/${chosenProductSpecification}`,
      );
      const data = response.data;
      console.log("Fetched specification details:", data);
      setSelectedProductSpec(data);
      setCategory({
        id: data.category?.id,
        name: data.category?.name,
      });
      setChannel(data.channel || []);

      // Fetch related product specification characteristics and values
      if (
        data.productSpecificationRelationship &&
        data.productSpecificationRelationship.length > 0
      ) {
        const relatedProductSpecIds = data.productSpecificationRelationship.map(
          (relatedSpec: ProductSpecificationRelationship) => relatedSpec.id,
        );

        const relatedProductSpecPromises = relatedProductSpecIds.map(
          async (relatedProductId: string) => {
            try {
              const response = await axios.get<RelatedProductSpec>(
                `${AXIOS_URL}/api/product-specification/byid/${relatedProductId}`,
              );
              return response.data;
            } catch (error) {
              console.error(
                `Error fetching related product specification with ID ${relatedProductId}:`,
                error,
              );
              return null;
            }
          },
        );

        const relatedProductSpecData = await Promise.all(
          relatedProductSpecPromises,
        );
        setRelatedProductSpecCharacteristics(
          relatedProductSpecData.filter(
            (spec): spec is RelatedProductSpec => spec !== null,
          ),
        );
      } else {
        setRelatedProductSpecCharacteristics([]);
      }
    } catch (error) {
      console.error(
        `Error fetching product specification details for ID ${chosenProductSpecification}:`,
        error,
      );
    }
  };
  const handleCharacteristicChange = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const value = event.target.value;
    const updatedCharacteristics = [...selectedCharacteristic];
    updatedCharacteristics[index] = value;
    setSelectedCharacteristic(updatedCharacteristics);
  };

  const handleCharacteristicValueChange = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value,
    );
    const updatedCharacteristicValues = [...selectedCharacteristicValues];
    updatedCharacteristicValues[index] = selectedValues;
    setSelectedCharacteristicValues(updatedCharacteristicValues);
  };

  const addCharacteristic = () => {
    setCharacteristics([...characteristics, ""]);
    setSelectedCharacteristic([...selectedCharacteristic, ""]);
    setSelectedCharacteristicValues([...selectedCharacteristicValues, []]);
  };

  const createProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const url = `${AXIOS_URL}/api/product-offering`;

      const specificationUrl = `${AXIOS_URL}/api/product-specification/${chosenProductSpecification}`;
      const specificationResponse = await axios.get<SelectedProductSpec>(
        specificationUrl,
      );
      const specificationData = specificationResponse.data;

      const productSpecCharacteristics = selectedCharacteristic.map(
        (characteristic, index) => {
          const selectedCharacteristicData =
            selectedProductSpec?.productSpecCharacteristic.find(
              (char) => char.name === characteristic,
            );

          const selectedValues = selectedCharacteristicValues[index].map(
            (value) => ({
              value: value,
            }),
          );

          return {
            name: characteristic,
            valueType: selectedCharacteristicData?.valueType,
            productSpecCharacteristicValue: selectedValues,
            /*productSpecification: {
            id: specificationData.id,
            name: specificationData.name,
            version: specificationData.version,
          },*/
          };
        },
      );

      const productData = {
        name: productName,
        description: productDescription,
        id: "",
        productSpecification: {
          id: specificationData.id,
          name: specificationData.name,
          version: "",
          internalVersion: specificationData.version,
          internalId: specificationData.id,
        },
        // Assigning _id to externalId
        category: {
          id: specificationData.category?.id,
          name: specificationData.category?.name,
        },
        channel: channel
          ? channel.map((ch) => ({ id: ch.id, name: ch.name }))
          : [],

        validFor: {
          startDateTime: startDate,
          endDateTime: endDate,
        },
        productSpecCharacteristic: productSpecCharacteristics,
        productOfferingPrice: [
          {
            price: {
              taxIncludedAmount: {
                unit: productOfferingPrice.price.taxIncludedAmount.unit,
                value: productOfferingPrice.price.taxIncludedAmount.value,
              },
            },
            priceType: productOfferingPrice.priceType,
          },
        ],
      };

      console.log("Product Data:", productData);

      await axios.post(url, productData);
      // alert("Product created successfully");

      Swal.fire("Done", "Product created successfully", "success");

      setProductName("");
      setProductDescription("");

      setChosenProductSpecification("");
      setCategory(null);
      setChannel(null);
      setStartDate("");
      setEndDate("");
      setSelectedProductSpec(null);
      setSelectedCharacteristic([]);
      setSelectedCharacteristicValues([]);
      setProductOfferingPrice({
        price: { taxIncludedAmount: { unit: "", value: "" } },
        priceType: "",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white min-h-screen-100 w-5/6">
        <Header />
        <div className="flex w-full">
          <div className="ml-2 flex mt-2 shadow-lg shadow-gray-500 md:shadow-1/2xl md:shadow-gray-500">
            <div className="Details">
              <nav className="navbar">
                <h3>ProductOffering</h3>
              </nav>
              <form onSubmit={createProduct}>
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
                        onBlur={fetchSpecificationDetails}
                      >
                        <option value="">Select a product specification</option>
                        {productSpecifications.map((spec) => (
                          <option key={spec._id} value={spec._id}>
                            {spec.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Channel:
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="channel"
                        type="text"
                        value={
                          channel
                            ? channel.map((item) => item.name).join(", ")
                            : []
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
                        type="text"
                        value={category?.name || ""}
                        readOnly
                      />
                    </div>

                    {characteristics.map((characteristic, index) => (
                      <div
                        key={index}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                      >
                        <label
                          htmlFor={`characteristic-${index}`}
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                          Product Spec Characteristic {index + 1}:
                        </label>
                        <select
                          className="block w-full bg-gray-200 text-gray-700 border border-Gray-500 py-3 px-4 mb-3 leading-tight focus:outline-none rounded-md"
                          id={`characteristic-${index}`}
                          value={characteristic}
                          onChange={(e) => handleCharacteristicChange(e, index)}
                        >
                          <option value="">Select Characteristic</option>
                          {selectedProductSpec &&
                            selectedProductSpec.productSpecCharacteristic &&
                            selectedProductSpec.productSpecCharacteristic.map(
                              (char) => (
                                <option key={char.name} value={char.name}>
                                  {char.name}
                                </option>
                              ),
                            )}
                          {relatedProductSpecCharacteristics &&
                            relatedProductSpecCharacteristics.flatMap(
                              (relatedSpec) =>
                                relatedSpec.productSpecCharacteristic.map(
                                  (char) => (
                                    <option key={char.name} value={char.name}>
                                      {char.name}
                                    </option>
                                  ),
                                ),
                            )}
                        </select>

                        {index === selectedCharacteristic.length - 1 && (
                          <div>
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor={`values-${index}`}
                            >
                              Characteristic Value:
                            </label>
                            <select
                              className="block w-full bg-gray-200 text-gray-700 border border-Gray-500 py-3 px-4 mb-3 leading-tight focus:outline-none rounded-md"
                              id={`values-${index}`}
                              multiple
                              value={selectedCharacteristicValues[index]}
                              onChange={(event) =>
                                handleCharacteristicValueChange(event, index)
                              }
                            >
                              {(selectedProductSpec &&
                                selectedCharacteristic[index] &&
                                selectedProductSpec.productSpecCharacteristic
                                  .find(
                                    (char) =>
                                      char.name ===
                                      selectedCharacteristic[index],
                                  )
                                  ?.productSpecCharacteristicValue.map(
                                    (value) => (
                                      <option
                                        key={value.value}
                                        value={value.value}
                                      >
                                        {value.value}
                                      </option>
                                    ),
                                  )) ||
                                (relatedProductSpecCharacteristics &&
                                  selectedCharacteristic[index] &&
                                  relatedProductSpecCharacteristics.flatMap(
                                    (relatedSpec) =>
                                      relatedSpec.productSpecCharacteristic
                                        .filter(
                                          (char) =>
                                            char.name ===
                                            selectedCharacteristic[index],
                                        )
                                        .flatMap((char) =>
                                          char.productSpecCharacteristicValue.map(
                                            (value) => (
                                              <option
                                                key={value.value}
                                                value={value.value}
                                              >
                                                {value.value}
                                              </option>
                                            ),
                                          ),
                                        ),
                                  ))}
                            </select>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <button
                        className="buttonadd"
                        type="button"
                        onClick={addCharacteristic}
                      >
                        Add Characteristic
                      </button>
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Start Date:
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Price Unit::
                      </label>

                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="unit"
                        type="text"
                        value={
                          productOfferingPrice.price.taxIncludedAmount.unit
                        }
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
                        value={
                          productOfferingPrice.price.taxIncludedAmount.value
                        }
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
                        <option value="">Choose price type</option>
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
                      <Link href="#">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
