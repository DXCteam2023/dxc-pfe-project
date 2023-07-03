import React from "react";
import ProductOfferingCharacteristics from "./ProductOfferingCharacteristics";

export default function ProductOfferingItem({ item, onSelect, selected }: any) {
  return (
    <div>
      <div
        className={`p-1 pb-0 pl-4 border-b-2 cursor-pointer ${
          selected?.offering?.generatedId === item?.generatedId
            ? "border-l-2 border-l-[#2c755e] bg-[#daeae7]"
            : ""
        }`}
        onClick={onSelect}
      >
        {item?.productOfferingObject?.productSpecification?.name}
      </div>
      <ProductOfferingCharacteristics
        items={item?.productOfferingObject?.prodSpecCharValueUse}
      />
    </div>
  );
}
