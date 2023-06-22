"use client";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import {
  NewCustomerOrderContext,
  OptionType,
} from "../context/new-customer-order-context";
import { AccountServices, ContactServices } from "../services";

export default function CreateOrder() {
  const route = useRouter();

  const myContext = useContext(NewCustomerOrderContext);

  const [contacts, setContacts] = useState([] as Array<OptionType>);

  useEffect(() => {
    const getAccountById = async () => {
      const response = await AccountServices.getAccountById(
        "ffc68911c35420105252716b7d40dd55",
      );

      console.log("getAccountById response.data.result", response.data.result);

      myContext.setAccount({
        value: response.data.result.sys_id,
        label: response.data.result.name,
      });
    };

    const getContacts = async () => {
      const response = await ContactServices.getContacts();

      console.log("getContacts response.data.result", response);

      const requiredData = response.data.result.map((contact: any) => {
        return {
          value: contact.sys_id,
          label: contact.name,
        };
      });
      console.log("requiredData", requiredData);
      setContacts(requiredData);
    };

    getAccountById();
    getContacts();
  }, []);

  const handleContinueOnClick = () => {
    route.push("/customer-order/product/new/select-product");
  };

  return (
    <div className="create-order flex flex-col p-4 gap-4 w-full">
      <div className="flex justify-between w-full gap-4">
        <InputText
          slug="account"
          title="Account"
          required={true}
          placeholder="Account"
          value={myContext.account.label}
        />
        <div className="sm:col-span-3 w-full">
          <label className="block text-xs font-medium leading-6 text-gray-900">
            Contact *
          </label>
          <SelectInput
            className="mt-2 w-full"
            options={contacts}
            selected={[myContext.contact]}
            onChange={myContext.setContact}
            isMulti={false}
          />
        </div>
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
