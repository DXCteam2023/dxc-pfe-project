import React from "react";

export default function ProductOfferingCharacteristicItem({
  offering,
  characteristics,
  selectedItem,
  setSelectedItem,
  locationId,
}: any) {
  const handleCharacteristicOnClick = (id: string) => {
    setSelectedItem({ id, offering,locationId });
  };
  return (
    <div className="p-1 pb-0 pl-8 border-b-2">
      {characteristics.map((characteristic: any) => (
        <div
          className={`cursor-pointer ${
            characteristic.isMandatory || characteristic.wasSelected
              ? "text-slate-500"
              : ""
          }${
            characteristic.id === selectedItem?.id &&
            offering?.generatedId === selectedItem?.offering?.generatedId
              ? " bg-green-300"
              : ""
          }`}
          onClick={() => handleCharacteristicOnClick(characteristic.id)}
        >
          {`${characteristic.name}${
            !characteristic.isMandatory ? " (Optional)" : ""
          }`}
        </div>
      ))}
    </div>
  );
}
