import React from "react";
import InputText from "../components/InputText";

type ItemDetailsType = { item: any };

export default function ItemDetails({ item }: ItemDetailsType) {
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
          value={item.productSpecification}
        />
      </div>
      <InputText
        slug="Product Specification"
        title="Product Specification"
        required={false}
        placeholder="Product Specification"
        value={item.location}
      />
      <InputText
        slug="Something"
        title="Something"
        required={false}
        placeholder="Something"
        value={item.orderedQuantity}
      />
    </div>
  );
}
