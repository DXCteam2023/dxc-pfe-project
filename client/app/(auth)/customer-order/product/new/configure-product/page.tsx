"use client";

import { useRouter } from "next/navigation";
import { BsFillTrash3Fill, BsPlusLg } from "react-icons/bs";
import InputText from "../components/InputText";
import SubLayout from "../components/SubLayout";
import { useContext } from "react";
import { NewCustomerOrderContext } from "../context/new-customer-order-context";

export default function ConfigureProduct() {
  const route = useRouter();

  const myContext = useContext(NewCustomerOrderContext);

  const handleContinueOnClick = () => {
    route.push("/customer-order/product/new/review-order");
  };

  const handleMonthlyRecurringChangesPerUnitOnChange = (value: string) => {
    let tamp = value;
    if (value == "") {
      tamp = "1";
    }
    myContext.setMonthlyRecurringChangesPerUnit(parseInt(tamp));
  };
  const handleTotalPriceOnChange = (value: string) => {
    let tamp = value;
    if (value == "") {
      tamp = "1";
    }
    myContext.setTotalPrice(parseInt(tamp));
  };
  const handleNoneRecuringChangesPerUnitOnChange = (value: string) => {
    let tamp = value;
    if (value == "") {
      tamp = "1";
    }
    myContext.setNoneRecuringChangesPerUnit(parseInt(tamp));
  };

  return (
    <SubLayout
      leftChildren={
        <div className="flex gap-4 justify-between items-center">
          <h4 className="font-extrabold">Items</h4>
          <span className="flex gap-4 justify-between items-center">
            <BsFillTrash3Fill className="cursor-pointer" />
            <BsPlusLg className="cursor-pointer" />
          </span>
        </div>
      }
      rightChildren={
        <>
          <div>
            <h4 className="font-extrabold">Order Line Item</h4>
            <div>
              <div className="flex justify-center gap-4">
                <InputText
                  slug="number"
                  title="Number"
                  required={false}
                  placeholder="Number"
                  value={myContext.number}
                  onChange={myContext.setNumber}
                />
                <InputText
                  slug="Location"
                  title="Location"
                  required={false}
                  placeholder="Location"
                  value={myContext.location}
                  onChange={myContext.setLocation}
                />
              </div>
              <div className="flex justify-center gap-4">
                <InputText
                  slug="Product Offering"
                  title="Product Offering"
                  required={false}
                  placeholder="Product Offering"
                  value={myContext.productOffering}
                  onChange={myContext.setProductOffering}
                />
                <InputText
                  slug="Product Specification"
                  title="Product Specification"
                  required={false}
                  placeholder="Product Specification"
                  value={myContext.productSpecification}
                  onChange={myContext.setProductSpecification}
                />
              </div>
              <div className="flex justify-center gap-4 w-1/2 pr-2">
                <InputText
                  slug="Ordered Quantity"
                  title="Ordered Quantity"
                  required={false}
                  placeholder="Ordered Quantity"
                  value={myContext.orderedQuantity}
                  onChange={myContext.setOrderedQuantity}
                />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-extrabold">Pricing</h4>
            <div className="flex justify-center gap-4">
              <InputText
                slug="Monthly Recurring Changes Per Unit"
                title="Monthly Recurring Changes Per Unit"
                required={false}
                placeholder="Monthly Recurring Changes Per Unit"
                value={myContext.monthlyRecurringChangesPerUnit}
                onChange={handleMonthlyRecurringChangesPerUnitOnChange}
              />
              <InputText
                slug="Total Price"
                title="Total Price"
                required={false}
                placeholder="Total Price"
                value={myContext.totalPrice}
                onChange={handleTotalPriceOnChange}
              />
            </div>
            <div className="flex justify-center gap-4 w-1/2 pr-2">
              <InputText
                slug="None Recuring Changes Per Unit"
                title="None Recuring Changes Per Unit"
                required={false}
                placeholder="None Recuring Changes Per Unit"
                value={myContext.noneRecuringChangesPerUnit}
                onChange={handleNoneRecuringChangesPerUnitOnChange}
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
