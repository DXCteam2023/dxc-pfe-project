
"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import Link from "next/link";

import "./Form.css";


export default function NewProductOfferingPage() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  //const [productPrice, setProductPrice] = useState(0);
  const [productSpecifications, setProductSpecifications] = useState<{
    _id: string; name: string; id: string; version: string; internalVersion: string; internalId: string
}[]>([]);
  const [choosenproductSpecifications, setChoosenProductSpecifications] = useState("");
  const [category, setCategory] = useState<{ id: string; name: string } | null>(null);
  const [channel, setChannel] = useState<{ id: string; name: string; }[] | null>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedProductSpec, setSelectedProductSpec] = useState<{
    id: string;
    name: string;
    productSpecCharacteristic: Array<{
      name: string;
      valueType: string;
      productSpecCharacteristicValue: Array<{ value: string }>;
    }>;
  } | null>(null);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState("");
  const [selectedCharacteristicValue, setSelectedCharacteristicValue] = useState("");
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
      const url = "http://localhost:5000/api/product-specification";
      const response = await axios.get(url);
      const data = await response.data;
      setProductSpecifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSpecificationDetails = async () => {
    try {
      const specificationUrl = `http://localhost:5000/api/product-specification/${choosenproductSpecifications}`;
      const specificationResponse = await axios.get(specificationUrl);
      const specificationData =await specificationResponse.data;
      setSelectedProductSpec(specificationData);
      setCategory({
        id: specificationData.category.id,
        name: specificationData.category.name,
      });
      setChannel(specificationData.channel || []); 
      
    } catch (err) {
      console.error(err);
    }
  };

  const handleCharacteristicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCharacteristic = event.target.value;
    setSelectedCharacteristic(selectedCharacteristic);
    setSelectedCharacteristicValue("");
  };

  const handleCharacteristicValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCharacteristicValue(value);
  };

 const createProduct = async (e: any) => {
  e.preventDefault();

  try {
    console.log("productName:", productName);
    console.log("productDescription:", productDescription);
    //console.log("productPrice:", productPrice);
    console.log("choosenproductSpecifications:", choosenproductSpecifications);
    console.log("category:", category);
    console.log("channel:", channel);

    const url = "http://localhost:8000/api/products";

    // Fetch the selected product specification details
    const specificationUrl = `http://localhost:5000/api/product-offering/${choosenproductSpecifications}`;
    const specificationResponse = await axios.get(specificationUrl);
    const specificationData = await specificationResponse.data;

    const productData = {
      name: productName,
      description: productDescription,
      //price: productPrice,
      productspecification: {
        //id: choosenproductSpecifications,
        id: specificationData.id,
        name: specificationData.name,
        version: specificationData.version,
        internalVersion: specificationData.internalVersion,
        internalId: specificationData.internalId,
      },
      category: {
        id: specificationData.category.id,
        name: specificationData.category.name,
      },
      channel: channel ? channel.map((ch) => ({ id: ch.id, name: ch.name })) : [], // Handle null case
      validFor: {
        startDateTime: startDate,
        endDateTime: endDate,
      },
      productSpecCharacteristic: selectedProductSpec?.productSpecCharacteristic.map(
        (characteristic: any) => ({
          name: characteristic.name,
          valueType: characteristic.valueType,
          productSpecCharacteristicValue: characteristic.productSpecCharacteristicValue.map(
            (value: any) => ({
              value: value.value,
            })
          ),
        })
      ),

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

    console.log(productData);

    await axios.post(url, productData);
    alert("Product created successfully");
    setProductName("");
    setProductDescription("");
    //setProductPrice(0);
    setChoosenProductSpecifications("");
    setCategory(null);
    setChannel(null);
    setStartDate("");
    setEndDate("");
    setSelectedProductSpec(null);
    setSelectedCharacteristic("");
    setSelectedCharacteristicValue("");
    setProductOfferingPrice({
        price: { taxIncludedAmount: { unit: "", value: "" } },
        priceType: "",
      });
  } catch (err) {
    console.error(err);
  }
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
            value={choosenproductSpecifications}
            onChange={(e) => {
              setChoosenProductSpecifications(e.target.value);
              setCategory(null); // Updated
              setChannel(null); // Updated
              
            }}
            onBlur={fetchSpecificationDetails}
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
                      value={channel ? channel.map(item => item.name).join(", ") : []}
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
              <option value="">Select a product spec characteristic</option>
              {selectedProductSpec.productSpecCharacteristic.map((characteristic) => (
                <option key={characteristic.name} value={characteristic.name}>
                  {characteristic.name}
                </option>
              ))}
            </select>
            </div>
            )}
            {selectedCharacteristic && (
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Characteristic Value:</label>
            <select
             className=" block w-full  bg-gray-200 text-gray-700 border border-Gray-500  py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-md  "

              id="productSpecCharacteristicValue"
              onChange={handleCharacteristicValueChange}
             
            >
              <option value="">Select a characteristic value</option>
              {selectedProductSpec?.productSpecCharacteristic
                .find((characteristic) => characteristic.name === selectedCharacteristic)
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