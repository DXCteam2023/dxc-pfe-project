import axios from "axios";

import { BsFillPatchCheckFill } from "react-icons/bs";
import { IoMdRemoveCircle } from "react-icons/io";

import Sidebar from "../../dashboard/components/Sidebar";

export default async function SingleProductOfferingPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;

  const productOffering = await axios(
    `http://localhost:5000/api/product-offering/${id}`,
  )
    .then((response) => response.data)
    .catch((e) => console.log(e));

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="product-offering container mx-auto">
        <header className="py-5 flex items-center justify-between px-3">
          <div className="infos flex justify-between items-center">
            <div className="title font-medium text-lg me-3">
              {productOffering.display_name}
            </div>
            <span
              className={
                " capitalize px-3 rounded-2xl text-white " +
                (productOffering.status === "published"
                  ? "bg-green-500"
                  : "bg-orange-400")
              }
            >
              {productOffering.status}
            </span>
          </div>
          <div className="action-buttons flex gap-4">
            <button className="bg-blue-400 py-1 px-3 rounded-md text-white font-medium hover:bg-blue-500 shadow-sm hover:shadow-md duration-300">
              Copy
            </button>
            {productOffering.status === "published" ? (
              <button className="bg-orange-300 py-1 px-3 rounded-md font-medium hover:bg-blue-500 shadow-sm hover:shadow-md duration-300">
                Archive
              </button>
            ) : (
              <button className="bg-green-400 py-1 px-3 rounded-md font-medium hover:bg-green-500 shadow-sm hover:shadow-md duration-300">
                Publish
              </button>
            )}
          </div>
        </header>
        <div className="my-5 p-5">
          <h1 className="text-4xl font-bold flex items-center">
            {productOffering.status === "published" ? (
              <BsFillPatchCheckFill className="me-3 text-green-500" />
            ) : (
              <IoMdRemoveCircle className="me-3 text-orange-400" />
            )}
            {productOffering.name}
          </h1>
          <div className="px-4 sm:px-0">
            <h3 className="text-lg  py-2 font-semibold leading-7 text-gray-500">
              {productOffering.description}
            </h3>
            <h2 className="mt-5 max-w-2xl text-2xl leading-6 text-blue-900 font-medium">
              Characteristics
            </h2>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {productOffering.prodSpecCharValueUse.map(
                (characteristic: any) => {
                  return (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="leading-6 font-medium text-gray-900">
                        <h2>{characteristic.name}</h2>
                        <p className="text-sm text-gray-500">
                          {characteristic.description}
                        </p>
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 relative">
                        <ul className="flex gap-3 ">
                          {characteristic.productSpecCharacteristicValue
                            .length !== 0 ? (
                            characteristic.productSpecCharacteristicValue.map(
                              (characteristicValue: any) => {
                                return (
                                  <li className="py-1 px-3 shadow-md rounded-lg font-medium text-blue-800 hover:bg-blue-100 duration-300">
                                    {characteristicValue.value}
                                  </li>
                                );
                              },
                            )
                          ) : (
                            <h3 className="font-medium text-1xl">Empty</h3>
                          )}
                        </ul>
                      </dd>
                    </div>
                  );
                },
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
