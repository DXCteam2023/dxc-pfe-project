import { createContext, useState } from "react";
import generateDateBasedId from "../utils/generateDateBasedId";

export type OptionType = {
  value: string;
  label: string;
};

export type ProductOfferingType = {
  value: string;
  label: string;
  productOfferingObject: any;
  quantity: number;
};

export type ProductOrderType = {
  id: string;
  locationId: string;
  firstname: string;
  lastname: string;
  email: string;
  mobilenumber: string;
  offerings: Array<ProductOfferingType>;
};

export type NewCustomerOrderContextType = {
  // STEP 1
  account: OptionType;
  setAccount: React.Dispatch<React.SetStateAction<OptionType>>;
  contact: OptionType;
  setContact: React.Dispatch<React.SetStateAction<OptionType>>;
  // STEP 2
  locations: Array<OptionType>;
  setLocations: React.Dispatch<React.SetStateAction<Array<OptionType>>>;
  productOrders: Array<ProductOrderType>;
  setProductOrders: React.Dispatch<
    React.SetStateAction<Array<ProductOrderType>>
  >;
  selectedLocationId: string;
  setSelectedLocationId: React.Dispatch<React.SetStateAction<string>>;
  getSelectedProductOrder: () => ProductOrderType | undefined;
  updateSelectedProductOrder: (
    propertyName: keyof ProductOrderType,
    propertyValue: any,
  ) => void;
  deleteProductOffering: (index: number) => void;
  deleteSelectedLocation: () => void;
  // STEP 3
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  productOffering: string;
  setProductOffering: React.Dispatch<React.SetStateAction<string>>;
  productSpecification: string;
  setProductSpecification: React.Dispatch<React.SetStateAction<string>>;
  orderedQuantity: string;
  setOrderedQuantity: React.Dispatch<React.SetStateAction<string>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  noneRecuringChangesPerUnit: number;
  setNoneRecuringChangesPerUnit: React.Dispatch<React.SetStateAction<number>>;
  monthlyRecurringChangesPerUnit: number;
  setMonthlyRecurringChangesPerUnit: React.Dispatch<
    React.SetStateAction<number>
  >;
};

export const NewCustomerOrderContext = createContext(
  {} as NewCustomerOrderContextType,
);

const NewCustomerOrderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // STEP 1
  const [account, setAccount] = useState({} as OptionType);
  const [contact, setContact] = useState({} as OptionType);
  // STEP 2
  const [locations, setLocations] = useState([] as OptionType[]);

  const [productOrders, setProductOrders] = useState([] as ProductOrderType[]);

  const [selectedLocationId, setSelectedLocationId] = useState("");

  // STEP 3
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const [productOffering, setProductOffering] = useState("");
  const [productSpecification, setProductSpecification] = useState("");
  const [orderedQuantity, setOrderedQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState(1);
  const [noneRecuringChangesPerUnit, setNoneRecuringChangesPerUnit] =
    useState(1);
  const [monthlyRecurringChangesPerUnit, setMonthlyRecurringChangesPerUnit] =
    useState(1);

  const getSelectedProductOrder = () => {
    let productOrderFound = productOrders.find(
      (productOrdersItem) =>
        productOrdersItem.locationId === selectedLocationId,
    );

    if (!productOrderFound) {
      // add a new product order with selected location to productOrders
      productOrderFound = {
        id: generateDateBasedId(),
        locationId: selectedLocationId,
        firstname: "",
        lastname: "",
        email: "",
        mobilenumber: "",
        offerings: [],
      };
      productOrders.push(productOrderFound);
    }

    return productOrderFound;
  };

  const updateSelectedProductOrder = (
    propertyName: keyof ProductOrderType,
    propertyValue: any,
  ) => {
    setProductOrders((previousProductOrders: Array<ProductOrderType>) => {
      return previousProductOrders.map(
        (previousProductOrdersItem: ProductOrderType) => {
          if (previousProductOrdersItem.locationId === selectedLocationId) {
            return {
              ...previousProductOrdersItem,
              [propertyName]: propertyValue,
            };
          } else {
            return previousProductOrdersItem;
          }
        },
      );
    });
  };

  const deleteProductOffering = (index: number) => {
    setProductOrders((previousProductOrders: Array<ProductOrderType>) => {
      return previousProductOrders.map(
        (previousProductOrdersItem: ProductOrderType) => {
          if (previousProductOrdersItem.locationId === selectedLocationId) {
            return {
              ...previousProductOrdersItem,
              offerings: previousProductOrdersItem.offerings.filter(
                (offering, index2) => index !== index2,
              ),
            };
          } else {
            return previousProductOrdersItem;
          }
        },
      );
    });
  };

  const deleteSelectedLocation = () => {
    const tmp = locations.filter(
      (location) => location.value !== selectedLocationId,
    );
    setLocations(tmp);
    setProductOrders(
      productOrders.filter(
        (productOrder) => productOrder.locationId !== selectedLocationId,
      ),
    );
    const firstLocation = tmp[0]?.value;
    setSelectedLocationId(firstLocation || "");
  };

  return (
    <NewCustomerOrderContext.Provider
      value={{
        // STEP 1
        account,
        setAccount,
        contact,
        setContact,
        // STEP 2
        locations,
        setLocations,
        productOrders,
        setProductOrders,
        selectedLocationId,
        setSelectedLocationId,
        getSelectedProductOrder,
        updateSelectedProductOrder,
        deleteProductOffering,
        deleteSelectedLocation,
        // STEP 3
        number,
        setNumber,
        location,
        setLocation,
        productOffering,
        setProductOffering,
        productSpecification,
        setProductSpecification,
        orderedQuantity,
        setOrderedQuantity,
        totalPrice,
        setTotalPrice,
        noneRecuringChangesPerUnit,
        setNoneRecuringChangesPerUnit,
        monthlyRecurringChangesPerUnit,
        setMonthlyRecurringChangesPerUnit,
      }}
    >
      {children}
    </NewCustomerOrderContext.Provider>
  );
};

export default NewCustomerOrderContextProvider;
