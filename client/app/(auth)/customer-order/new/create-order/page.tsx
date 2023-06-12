"use client";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import InputText from "../components/InputText";
import { NewCustomerOrderContext } from "../context/new-customer-order-context";

export default function CreateOrder() {
  const route = useRouter();

  const myContext = useContext(NewCustomerOrderContext);

  const handleContinueOnClick = () => {
    route.push("/customer-order/new/select-product");
  };

  return (
    <div className="create-order flex flex-col p-4 gap-4 w-full">
      <div className="flex justify-between w-full gap-4">
        <InputText
          slug="account"
          title="Account"
          required={true}
          placeholder="Account"
          value={myContext.account}
          onChange={myContext.setAccount}
        />
        <InputText
          slug="contact"
          title="Contact"
          required={true}
          placeholder="Contact"
          value={myContext.contact}
          onChange={myContext.setContact}
        />
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={handleContinueOnClick}
          className="rounded-md bg-[#5f249f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5f249f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5f249f]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
