import { createContext, useState } from "react";

type OptionType = {
  value: string;
  label: string;
};

export type ProductOrderType = {
  id: string;
  locationId: string;
  firstname: string;
  lastname: string;
  email: string;
  mobilenumber: string;
  offerings: Array<OptionType>;
  quantity: number;
};

type NewCustomerOrderContextType = {
  // STEP 1
  account: string;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  contact: string;
  setContact: React.Dispatch<React.SetStateAction<string>>;
  // STEP 2
  locations: Array<OptionType>;
  setLocations: React.Dispatch<React.SetStateAction<Array<OptionType>>>;
  productOrders: Array<ProductOrderType>;
  setProductOrders: React.Dispatch<
    React.SetStateAction<Array<ProductOrderType>>
  >;
  selectedProductOrderId: string;
  setSelectedProductOrderId: React.Dispatch<React.SetStateAction<string>>;
  getSelectedProductOrder: () => ProductOrderType | undefined;
  updateSelectedProductOrder: (
    propertyName: keyof ProductOrderType,
    propertyValue: any,
  ) => void;
  // firstname: string;
  // setFirstname: React.Dispatch<React.SetStateAction<string>>;
  // lastname: string;
  // setLastname: React.Dispatch<React.SetStateAction<string>>;
  // email: string;
  // setEmail: React.Dispatch<React.SetStateAction<string>>;
  // mobilenumber: string;
  // setMobilenumber: React.Dispatch<React.SetStateAction<string>>;
  // selectedOfferings: Array<OptionType>;
  // quantity: number;
  // setQuantity: React.Dispatch<React.SetStateAction<number>>;
  // setSelectedOfferings: React.Dispatch<React.SetStateAction<Array<OptionType>>>;
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

const EXAMPLE_LOCATIONS = [
  { value: "001", label: "LOCATION 001" },
  { value: "002", label: "LOCATION 002" },
  { value: "003", label: "LOCATION 003" },
];
const EXAMPLE_OFFERING = [
  { value: "001", label: "OFFERING 001" },
  { value: "002", label: "OFFERING 002" },
  { value: "003", label: "OFFERING 003" },
];
const EXAMPLE_PRODUCT_ORDER = [
  {
    id: "0001",
    locationId: "001",
    firstname: "firstname",
    lastname: "lastname",
    email: "email",
    mobilenumber: "mobilenumber",
    offerings: EXAMPLE_OFFERING,
    quantity: 1,
  },
];
const NewCustomerOrderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // STEP 1
  const [account, setAccount] = useState("");
  const [contact, setContact] = useState("");
  // STEP 2
  const [locations, setLocations] = useState(EXAMPLE_LOCATIONS as OptionType[]);

  const [productOrders, setProductOrders] = useState(
    EXAMPLE_PRODUCT_ORDER as ProductOrderType[],
  );
  const [selectedProductOrderId, setSelectedProductOrderId] = useState("0001");

  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobilenumber, setMobilenumber] = useState("");

  // const [selectedOfferings, setSelectedOfferings] = useState(
  //   EXAMPLE_OFFERING as OptionType[],
  // );
  // const [quantity, setQuantity] = useState(1);
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
    const productOrderFound = productOrders.find(
      (productOrdersItem) => productOrdersItem.id === selectedProductOrderId,
    );
    return productOrderFound;
  };

  const updateSelectedProductOrder = (
    propertyName: keyof ProductOrderType,
    propertyValue: any,
  ) => {
    setProductOrders((previousProductOrders: Array<ProductOrderType>) => {
      return previousProductOrders.map(
        (previousProductOrdersItem: ProductOrderType) => {
          if (previousProductOrdersItem.id === selectedProductOrderId) {
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
        selectedProductOrderId,
        setSelectedProductOrderId,
        getSelectedProductOrder,
        updateSelectedProductOrder,
        // firstname,
        // setFirstname,
        // lastname,
        // setLastname,
        // email,
        // setEmail,
        // mobilenumber,
        // setMobilenumber,
        // selectedOfferings,
        // setSelectedOfferings,
        // quantity,
        // setQuantity,
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
