import React, { useEffect, useState } from "react";

import ProductOfferingCharacteristics from "./ProductOfferingCharacteristics";

export default function ProductOfferingItem({ item, onSelect, selected }: any) {
  const [selectedCharcteristics, setSelectedCharcteristics] = useState([]);

  useEffect(() => {
    const mandatoryPlusSelectedCharacteristics =
      item?.optionsCharacteristics.filter(
        (item: any) =>
          item.isMandatory ||
          item?.selectedCharacteristicsIds?.includes(item.id),
      );
    // characteristics(with all properties) that are selected
    const tmp2 = item?.productOfferingObject?.prodSpecCharValueUse.filter(
      (item: any) =>
        mandatoryPlusSelectedCharacteristics.find(
          (item2: any) => item2.name === item.name,
        ),
    );
    setSelectedCharcteristics(tmp2);
  }, [
    item?.productOfferingObject?.prodSpecCharValueUse,
    item?.optionsCharacteristics,
    item?.selectedCharacteristicsIds,
  ]);

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
      <ProductOfferingCharacteristics items={selectedCharcteristics} />
    </div>
  );
}
