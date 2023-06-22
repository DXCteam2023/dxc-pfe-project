"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BsFillTrash3Fill, BsPlusLg } from "react-icons/bs";

import InputText from "../components/InputText";
import SubLayout from "../components/SubLayout";
import {
  NewCustomerOrderContext,
  ProductOfferingType,
  ProductOrderType,
  OptionType,
} from "../context/new-customer-order-context";
import LocationModal from "../components/LocationModal";
import SelectInput from "../components/SelectInput";
import {
  ProductOfferingServices,
  LocationServices,
  ProductOrderServices,
} from "../services";
import ProductOfferingItem from "./ProductOfferingItem";
import generateCreateOrderRequestBody from "../utils/generateCreateOrderRequestBody";

export default function SelectProduct() {
  const route = useRouter();

  const myContext = useContext(NewCustomerOrderContext);

  const [showNewLocationModal, setShowNewLocationModal] = useState(false);

  const [currentProductOrder, setCurrentProductOrder] =
    useState<ProductOrderType>();

  const [productOfferings, setProductOfferings] = useState(
    [] as Array<ProductOfferingType>,
  );

  const [accountLocations, setAccountLocations] = useState(
    [] as Array<OptionType>,
  );

  useEffect(() => {
    const getLocationsByAccountId = async () => {
      const response = await LocationServices.getLocationsByAccountId(
        myContext.account.value,
      );
      console.log("getLocationsByAccountId response", response);

      const locationsIds = response.data.result.map(
        (accountAddressRelationship: any) =>
          accountAddressRelationship.location.value,
      );
      console.log("getLocationsByAccountId locationsIds", locationsIds);

      const response2 = await LocationServices.getLocationsWidthIds(
        locationsIds,
      );

      console.log("getLocationsByAccountId response2", response2);

      const requiredData = response2.data.result.map((location: any) => {
        return {
          value: location.sys_id,
          label: location.name,
        };
      });

      console.log("requiredData", requiredData);

      setAccountLocations(requiredData);
    };
    const getAllProductOfferings = async () => {
      const response = await ProductOfferingServices.getAllProductOfferings();

      console.log("getAllProductOfferings response", response);

      const requiredData = response.data.map((productOffering: any) => {
        return {
          value: productOffering.id,
          label: productOffering.name,
          productOfferingObject: productOffering,
        };
      });
      console.log("requiredData", requiredData);
      setProductOfferings(requiredData);
    };
    getLocationsByAccountId();
    getAllProductOfferings();
  }, []);

  useEffect(() => {
    setCurrentProductOrder(myContext.getSelectedProductOrder());
  }, [myContext.productOrders, myContext.selectedLocationId]);

  useEffect(() => {
    console.log("currentProductOrder has changed", currentProductOrder);
  }, [currentProductOrder]);

  const handleConfigureOnClick = async () => {
    // prepare all data (request body)
    const requestBody = generateCreateOrderRequestBody(myContext);
    console.log("handleConfigureOnClick requestBody", requestBody);

    // call instance to create order
    await ProductOrderServices.createOrder(requestBody);

    // redirect to step 3
    // route.push("/customer-order/product/new/configure-product");
  };

  const handleQuantityOnChange = (value: string) => {
    let tamp = value;
    if (value === "") {
      tamp = "1";
    }
    // myContext.setQuantity(parseInt(tamp));
  };

  const handleLocationOnAdd = (newLocations: Array<OptionType>) => {
    const tamp = myContext.locations.concat(newLocations);
    myContext.setLocations(tamp);
    setShowNewLocationModal(false);
  };

  const handleLocationOnCancel = () => {
    setShowNewLocationModal(false);
  };

  const handleAddLocationOnClick = () => {
    setShowNewLocationModal(true);
  };

  const handleProductOfferingOnChange = (option: OptionType, index: number) => {
    console.log("handleProductOfferingOnChange onChange", option);
    const currentOfferings = currentProductOrder?.offerings || [];
    myContext.updateSelectedProductOrder(
      "offerings",
      currentOfferings.map((offering, i) => (i === index ? option : offering)),
    );
  };

  const handleAddProductOfferingOnClick = () => {
    const currentOfferings = currentProductOrder?.offerings || [];
    myContext.updateSelectedProductOrder("offerings", [
      ...currentOfferings,
      { quantity: 1 },
    ]);
  };

  const handleLocationLabelOnClick = (locationId: string) => {
    console.log("handleLocationLabelOnClick", locationId);
    myContext.setSelectedLocationId(locationId);
  };

  // console.log("OFFERING - ", myContext.selectedOfferings);
  return (
    <SubLayout
      leftChildren={
        <div className="flex flex-col">
          {showNewLocationModal && (
            <LocationModal
              options={accountLocations}
              onAdd={handleLocationOnAdd}
              onCancel={handleLocationOnCancel}
            />
          )}
          <div className="flex gap-4 justify-between items-center p-4">
            <h4 className="font-extrabold">Locations</h4>
            <span className="flex gap-4 justify-between items-center">
              <BsFillTrash3Fill className="cursor-pointer" />
              <BsPlusLg
                className="cursor-pointer"
                onClick={handleAddLocationOnClick}
              />
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {myContext.locations.map((location) => (
              <div
                className={`text-sm p-1 ${
                  myContext.selectedLocationId === location.value
                    ? "border-l-2 border-l-[#2c755e] bg-[#daeae7]"
                    : ""
                }`}
                onClick={() => handleLocationLabelOnClick(location.value)}
              >
                {location.label}
              </div>
            ))}
          </div>
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
                  value={currentProductOrder?.firstname}
                  onChange={(value: string) => {
                    myContext.updateSelectedProductOrder("firstname", value);
                  }}
                />
                <InputText
                  slug="last name"
                  title="Last Name"
                  required={true}
                  placeholder="Last Name"
                  value={currentProductOrder?.lastname}
                  onChange={(value: string) => {
                    myContext.updateSelectedProductOrder("lastname", value);
                  }}
                />
              </div>
              <div className="flex justify-center gap-4">
                <InputText
                  slug="email"
                  title="Email"
                  required={true}
                  placeholder="Email"
                  value={currentProductOrder?.email}
                  onChange={(value: string) => {
                    myContext.updateSelectedProductOrder("email", value);
                  }}
                />
                <InputText
                  slug="mobile number"
                  title="Mobile Number"
                  required={true}
                  placeholder="Mobile Number"
                  value={currentProductOrder?.mobilenumber}
                  onChange={(value: string) => {
                    myContext.updateSelectedProductOrder("mobilenumber", value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-extrabold">Product Offerings</h4>
            {currentProductOrder?.offerings.map((productOffering, index) => (
              <ProductOfferingItem
                options={productOfferings}
                selected={productOffering}
                onChange={(option) =>
                  handleProductOfferingOnChange(option, index)
                }
              />
            ))}
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={handleAddProductOfferingOnClick}
            >
              Add Product Offerings
            </button>
          </div>
        </>
      }
      bottomChildren={
        <div>
          <button
            onClick={handleConfigureOnClick}
            className="rounded-md bg-[#5f249f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5f249f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5f249f]"
          >
            Configure
          </button>
        </div>
      }
    />
  );
}
