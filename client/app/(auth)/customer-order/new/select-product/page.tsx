"use client";

import { useRouter } from "next/navigation";
import { BsFillTrash3Fill, BsPlusLg } from "react-icons/bs";
import InputText from "../components/InputText";
import SubLayout from "../components/SubLayout";

export default function SelectProduct() {
  const route = useRouter();

  const handleContinueOnClick = () => {
    route.push("/customer-order/new/configure-product");
  };

  return (
    <SubLayout
      leftChildren={
        <div className="flex gap-4 justify-between items-center">
          <h4 className="font-extrabold">Locations</h4>
          <span className="flex gap-4 justify-between items-center">
            <BsFillTrash3Fill className="cursor-pointer" />
            <BsPlusLg className="cursor-pointer" />
          </span>
        </div>
      }
      rightChildren={
        <>
          <div>
            <h4 className="font-extrabold">Select Product</h4>
            <h6>For each location, choose a contact, product, and quantity.</h6>
          </div>
          <div>
            <h4 className="font-extrabold">Location Contact</h4>
            <div>
              <div className="flex justify-center gap-4">
                <InputText
                  slug="firt name"
                  title="Firt Name"
                  required={true}
                  placeholder="Firt Name"
                />
                <InputText
                  slug="last name"
                  title="Last Name"
                  required={true}
                  placeholder="Last Name"
                />
              </div>
              <div className="flex justify-center gap-4">
                <InputText
                  slug="email"
                  title="Email"
                  required={true}
                  placeholder="Email"
                />
                <InputText
                  slug="mobile number"
                  title="Mobile Number"
                  required={true}
                  placeholder="Mobile Number"
                />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-extrabold">Product Offerings</h4>
            <div className="flex justify-center gap-4 p-4 border-2 rounded-md">
              <InputText
                slug="offerings"
                title="Offerings"
                required={true}
                placeholder="Offerings"
              />
              <InputText
                slug="quantity"
                title="Quantity"
                required={true}
                placeholder="Quantity"
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Add Product Offerings
            </button>
          </div>
        </>
      }
      bottomChildren={
        <div>
          <button
            onClick={handleContinueOnClick}
            className="rounded-md bg-[#5f249f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5f249f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5f249f]"
          >
            Continue
          </button>
        </div>
      }
    />
  );
}
