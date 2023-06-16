"use client";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BsFillTrash3Fill, BsPlusLg } from "react-icons/bs";


import InputText from "../components/InputText";
import SubLayout from "../components/SubLayout";
import {
  NewCustomerOrderContext,
  ProductOrderType,
} from "../context/new-customer-order-context";
import LocationModal from "../components/LocationModal";
import SelectInput from "../components/SelectInput";

type OptionType = { value: string; label: string };

export default function SelectProduct() {
  const route = useRouter();

  const myContext = useContext(NewCustomerOrderContext);

  const [showNewLocationModal, setShowNewLocationModal] = useState(false);

  const [currentProductOrder, setCurrentProductOrder] =
    useState<ProductOrderType>();

  useEffect(() => {
    setCurrentProductOrder(myContext.getSelectedProductOrder());
  }, [myContext.productOrders]);

  useEffect(() => {
    console.log("currentProductOrder has changed", currentProductOrder);
  }, [currentProductOrder]);

  const handleContinueOnClick = () => {
    route.push("/customer-order/product/new/configure-product");
  };

  const handleQuantityOnChange = (value: string) => {
    let tamp = value;
    if (value === "") {
      tamp = "1";
    }
    // myContext.setQuantity(parseInt(tamp));
  };

  const handleLocationOnAdd = (newLocations: Array<OptionType>) => {
    const tamp = myContext.locations.concat(newLocations);
    myContext.setLocations(tamp);
    setShowNewLocationModal(false);
  };

  const handleLocationOnCancel = () => {
    setShowNewLocationModal(false);
  };

  const handleAddLocationOnClick = () => {
    setShowNewLocationModal(true);
  };

  // console.log("OFFERING - ", myContext.selectedOfferings);
  return (
    <SubLayout
      leftChildren={
        <div className="flex flex-col">
          {showNewLocationModal && (
            <LocationModal
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" },
              ]}
              onAdd={handleLocationOnAdd}
              onCancel={handleLocationOnCancel}
            />
          )}
          <div className="flex gap-4 justify-between items-center p-4">
            <h4 className="font-extrabold">Locations</h4>
            <span className="flex gap-4 justify-between items-center">
              <BsFillTrash3Fill className="cursor-pointer" />
              <BsPlusLg
                className="cursor-pointer"
                onClick={handleAddLocationOnClick}
              />
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {myContext.locations.map((location) => (
              <div className="text-sm p-1 border-l-2 border-l-[#2c755e] bg-[#daeae7]">
                {location.label}
              </div>
            ))}
          </div>
        </div>
      }
      rightChildren={
        <>
          <div>
            <h4 className="font-extrabold">Select Product</h4>
            <h6>For each location, choose a contact, product, and quantity.</h6>
          </div>
          <div>
            <h4 className="font-extrabold">Location Contact</h4>
            <div>
              <div className="flex justify-center gap-4">
                <InputText
                  slug="firt name"
                  title="Firt Name"
                  required={true}
                  placeholder="Firt Name"
                  value={currentProductOrder?.firstname}
                  onChange={(value: string) => {
                    myContext.updateSelectedProductOrder("firstname", value);
                  }}
                />
                <InputText
                  slug="last name"
                  title="Last Name"
                  required={true}
                  placeholder="Last Name"
                  value={currentProductOrder?.lastname}
                  onChange={(value: string) => {
                    myContext.updateSelectedProductOrder("lastname", value);
                  }}
                />
              </div>
              <div className="flex justify-center gap-4">
                <InputText
                  slug="email"
                  title="Email"
                  required={true}
                  placeholder="Email"
                  value={currentProductOrder?.email}
                  onChange={(value: string) => {
                    myContext.updateSelectedProductOrder("email", value);
                  }}
                />
                <InputText
                  slug="mobile number"
                  title="Mobile Number"
                  required={true}
                  placeholder="Mobile Number"
                  value={currentProductOrder?.mobilenumber}
                  onChange={(value: string) => {
                    myContext.updateSelectedProductOrder("mobilenumber", value);
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-extrabold">Product Offerings</h4>
            <div className="flex justify-center gap-4 p-4 border-2 rounded-md">
              <SelectInput
                options={[
                  { value: "2chocolate", label: "2 Chocolate" },
                  { value: "2strawberry", label: "2 Strawberry" },
                  { value: "2vanilla", label: "2 Vanilla" },
                ]}
                selected={currentProductOrder?.offerings || []}
                onChange={(values: Array<OptionType>) => {
                  myContext.updateSelectedProductOrder("offerings", values);
                }}
              />
              <InputText
                slug="quantity"
                title="Quantity"
                required={true}
                placeholder="Quantity"
                value={currentProductOrder?.quantity}
                onChange={(value: string) => {
                  myContext.updateSelectedProductOrder("quantity", value);
                }}
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Add Product Offerings
            </button>
          </div>
        </>
      }
      bottomChildren={
        <div>
          <button
            onClick={handleContinueOnClick}
            className="rounded-md bg-[#5f249f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5f249f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5f249f]"
          >
            Continue
          </button>
        </div>
      }
    />
  );
}
