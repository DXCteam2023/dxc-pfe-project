import React from "react";
import InputText from "../components/InputText";

type ItemDetailsType = { item: any, onClose: () => void };

export default function ItemDetails({ item, onClose }: ItemDetailsType) {
  console.log("ITEM DETAIL PROPS", item);
  return (
    <div className="create-order flex flex-col p-4 gap-4 w-full">
      <h4 className="font-extrabold">{item.number}</h4>
      <div className="flex justify-between w-full gap-4">
        <InputText
          slug="Product Offering"
          title="Product Offering"
          required={false}
          placeholder="Product Offering"
          value={item.productOffering}
        />
        <InputText
          slug="Location"
          title="Location"
          required={false}
          placeholder="Location"
          value={item.location.name}
        />
      </div>
      <InputText
        slug="Product Specification"
        title="Product Specification"
        required={false}
        placeholder="Product Specification"
        value={item.productSpecification}
      />
      <InputText
        slug="quantity"
        title="quantity"
        required={false}
        placeholder="quantity"
        value={item.orderedQuantity}
      />
      <InputText
        slug="price"
        title="Price"
        required={false}
        placeholder="price"
        value={item.price}
      />
      <button className="border bg-[#5f249f] text-white w-fit p-1 px-4 rounded-[5px] hover:opacity-80" onClick={onClose}>Close</button>
    </div>
  );
}
