"use client";

import ItemDetails from "./ItemDetails";

const COLUMNS = [
  { title: "Numbers" },
  { title: "Product Offering" },
  { title: "Product Specification" },
  { title: "Ordered Quantity" },
  { title: "Location" },
];

const DATA = Array(5)
  .fill(0)
  .map((_, i) => ({
    number: "ORDL00099" + i,
    productOffering: "Premium SD WAN OFFERING " + i,
    productSpecification: "SD WAN SERVICE PACKAGE " + i,
    orderedQuantity: 1,
    location: "100 south charles street Batiment MD " + i,
  }));

export default function ReviewOrder() {
  return (
    <div className="review-order w-full p-4">
      <h4 className="font-extrabold">Order summary</h4>
      <h6>List</h6>
      <div className="flex gap-4">
        <table className="table-auto w-full border-2">
          <thead>
            <tr className="border-2">
              {COLUMNS.map((column) => (
                <th>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DATA.map((item) => (
              <tr className="border-2 text-center">
                <td>{item.number}</td>
                <td>{item.productOffering}</td>
                <td>{item.productSpecification}</td>
                <td>{item.orderedQuantity}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <ItemDetails item={DATA[0]} />
        </div>
      </div>
    </div>
  );
}
