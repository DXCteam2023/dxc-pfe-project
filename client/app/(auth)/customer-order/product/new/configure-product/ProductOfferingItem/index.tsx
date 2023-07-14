import React, { useEffect, useState } from "react";

import ProductOfferingCharacteristics from "./ProductOfferingCharacteristics";

export default function ProductOfferingItem({ item, onSelect, selected }: any) {
  const [selectedCharcteristics, setSelectedCharcteristics] = useState([]);

  useEffect(() => {
    const mandatoryPlusSelectedCharacteristics =
      item?.optionsCharacteristics.filter(
        (characteristic: any) =>
          characteristic.isMandatory ||
          item?.selectedCharacteristicsIds?.includes(characteristic.id),
      );
    console.log(
      "mandatoryPlusSelectedCharacteristics",
      mandatoryPlusSelectedCharacteristics,
      item,
    );
    // characteristics(with all properties) that are selected
    const tmp2 = item?.productOfferingObject?.prodSpecCharValueUse.filter(
      (item: any) =>
        mandatoryPlusSelectedCharacteristics.find(
          (item2: any) => item2.name === item.name,
        ),
    );
    setSelectedCharcteristics(tmp2);
  }, [item]);
  console.log(
    "conditions",
    selected?.offering?.generatedId === item?.generatedId,
    !selected?.characteristicName,
    selected,
  );
  return (
    <div>
      <div
        className={`p-1 pb-0 pl-4 border-b-2 cursor-pointer ${
          selected?.offering?.generatedId === item?.generatedId &&
          !selected?.characteristicName
            ? "border-l-2 border-l-[#2c755e] bg-[#daeae7]"
            : ""
        }`}
        onClick={() => onSelect()}
      >
        {item?.productOfferingObject?.productSpecification?.name}
      </div>
      <ProductOfferingCharacteristics
        items={selectedCharcteristics}
        onSelect={onSelect}
        selected={selected}
      />
    </div>
  );
}
