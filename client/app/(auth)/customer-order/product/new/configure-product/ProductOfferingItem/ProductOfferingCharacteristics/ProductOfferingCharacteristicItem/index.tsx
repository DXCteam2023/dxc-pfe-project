import React, { useEffect, useState } from "react";

export default function ProductOfferingCharacteristicItem({ item }: any) {
  return <div className="p-1 pb-0 pl-8 border-b-2">{item.name}</div>;
}
