// import axios from "axios";
// import { productOfferings } from "./data";

import productOfferingStyles from "./id.module.css";

export default async function SingleProductOfferingPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;
  // const singleProductOffering = productOfferings.filter(
  //   (po) => po.id === +id,
  // )[0];

  // console.log(id);

  const singleProductOffering = await fetch(
    `http://localhost:3000/api/product-offering/${id}`,
    { cache: "no-store" },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  if (singleProductOffering) {
    console.log(singleProductOffering);
  }

  return (
    <h1>Single Product Offering</h1>
    // <div className="product-offering container mx-auto">
    //   <header className="py-5 flex items-center justify-between bg-slate-300 px-3">
    //     <div className="infos flex justify-between items-center">
    //       <div className="title font-medium text-lg me-3">
    //         {singleProductOffering.name}
    //       </div>
    //       <span
    //         className={
    //           productOfferingStyles.tag +
    //           " capitalize px-3 rounded-2xl text-white " +
    //           (singleProductOffering.status === "published"
    //             ? "bg-green-500"
    //             : "bg-orange-400")
    //         }
    //       >
    //         {singleProductOffering.status}
    //       </span>
    //     </div>
    //     <div className="action-buttons">
    //       {singleProductOffering.status === "published" ? (
    //         <button className="bg-blue-400 py-1 px-3 rounded-md text-white font-medium hover:bg-blue-500 shadow-sm hover:shadow-md duration-300">
    //           Archive
    //         </button>
    //       ) : (
    //         <button className="bg-blue-400 py-1 px-3 rounded-md text-white font-medium hover:bg-blue-500 shadow-sm hover:shadow-md duration-300">
    //           Publish
    //         </button>
    //       )}
    //     </div>
    //   </header>
    // </div>
  );
}
