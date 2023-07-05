"use client";

import { useRouter } from "next/navigation";
import { BsFillTrash3Fill, BsPlusLg } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import InputText from "../components/InputText";
import SubLayout from "../components/SubLayout";
import {
  NewCustomerOrderContext,
  OptionType,
} from "../context/new-customer-order-context";
import ProductOfferingItem from "./ProductOfferingItem";

export default function ConfigureProduct() {
  const route = useRouter();

  const myContext = useContext(NewCustomerOrderContext);

  const [selected, setSelected] = useState<any>();

  useEffect(() => {
    if (selected?.offering?.generatedId) {
      // when selected does exist, and changes happen in myContext?.productOrders
      const productOrderFound = myContext.getSelectedProductOrder(
        selected.location.value,
      );
      const offeringFound = productOrderFound?.offerings.find(
        (offering) => offering.generatedId === selected.offering.generatedId,
      );
      // update selected.offering with the offeringFound in productOrderFound
      setSelected({ ...selected, offering: offeringFound });
    }
  }, [myContext?.productOrders, selected?.offering?.generatedId]);

  const handleContinueOnClick = () => {
    route.push("/customer-order/product/new/review-order");
  };

  const handleOfferingItemOnSelect = (offering: any, location: OptionType) => {
    console.log("handleOfferingItemOnSelect", offering, location);
    setSelected({
      offering,
      location,
    });
  };
  const handleQuantityOnChange = (value: string) => {
    let tmp = value;
    if (value === "") {
      tmp = "1";
    }

    myContext.updateSelectedProductOrderOfferingById(
      selected.location.value,
      selected.offering.generatedId,
      { quantity: parseInt(tmp) },
    );
  };

  return (
    <SubLayout
      leftChildren={
        <div className="flex flex-col">
          <div className="flex gap-4 justify-between items-center p-4">
            <h4 className="font-extrabold">Items</h4>
            <span className="flex gap-4 justify-between items-center">
              <BsFillTrash3Fill className="cursor-pointer" />
              <BsPlusLg className="cursor-pointer" />
            </span>
          </div>
          <div className="flex flex-col gap-2 text-xs whitespace-nowrap">
            {myContext.locations.map((location) => (
              <div>
                <div className="p-1 pb-0 border-b-2">{location.label}</div>
                <div className="flex flex-col">
                  {myContext.productOrders
                    ?.find(
                      (productOrder) =>
                        productOrder.locationId === location.value,
                    )
                    ?.offerings?.map((offering) => (
                      <ProductOfferingItem
                        item={offering}
                        onSelect={() =>
                          handleOfferingItemOnSelect(offering, location)
                        }
                        selected={selected}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
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
                  value={selected?.offering?.generatedId}
                  disabled={true}
                />
                <InputText
                  slug="Location"
                  title="Location"
                  required={false}
                  placeholder="Location"
                  value={selected?.location.label}
                  disabled={true}
                />
              </div>
              <div className="flex justify-center gap-4">
                <InputText
                  slug="Product Offering"
                  title="Product Offering"
                  required={false}
                  placeholder="Product Offering"
                  value={selected?.offering?.label}
                  disabled={true}
                />
                <InputText
                  slug="Product Specification"
                  title="Product Specification"
                  required={false}
                  placeholder="Product Specification"
                  value={
                    selected?.offering?.productOfferingObject
                      ?.productSpecification?.name
                  }
                  disabled={true}
                />
              </div>
              <div className="flex justify-center gap-4 w-1/2 pr-2">
                <InputText
                  slug="Ordered Quantity"
                  title="Ordered Quantity"
                  required={false}
                  placeholder="Ordered Quantity"
                  value={selected?.offering?.quantity}
                  onChange={handleQuantityOnChange}
                />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-extrabold">Pricing</h4>
            <div className="flex justify-center gap-4">
              <InputText
                slug="Monthly Recurring Changes Per Unit"
                title={`Monthly Recurring Changes Per Unit (${selected?.offering?.productOfferingObject?.productOfferingPrice?.[0]?.price?.taxIncludedAmount?.unit})`}
                required={false}
                placeholder="Monthly Recurring Changes Per Unit"
                value={
                  selected?.offering?.productOfferingObject
                    ?.productOfferingPrice[0].price.taxIncludedAmount.value
                }
                disabled={true}
              />
              <InputText
                slug="Total Price"
                title="Total Price"
                required={false}
                placeholder="Total Price"
                value={
                  ((selected?.offering?.productOfferingObject
                    ?.productOfferingPrice?.[0]?.price?.taxIncludedAmount
                    ?.value || 0) +
                    (selected?.offering?.productOfferingObject
                      ?.productOfferingPrice?.[1]?.price?.taxIncludedAmount
                      ?.value || 0)) *
                  (selected?.offering?.quantity || 1)
                }
                disabled={true}
              />
            </div>
            <div className="flex justify-center gap-4 w-1/2 pr-2">
              <InputText
                slug="None Recuring Changes Per Unit"
                title={`None Recuring Changes Per Unit (${selected?.offering?.productOfferingObject?.productOfferingPrice?.[1]?.price?.taxIncludedAmount?.unit})`}
                required={false}
                placeholder="None Recuring Changes Per Unit"
                value={
                  selected?.offering?.productOfferingObject
                    ?.productOfferingPrice[1].price.taxIncludedAmount.value
                }
                disabled={true}
              />
            </div>
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
