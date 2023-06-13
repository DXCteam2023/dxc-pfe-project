import { createContext, useState } from "react";

type NewCustomerOrderContextType = {
  // STEP 1
  account: string;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  contact: string;
  setContact: React.Dispatch<React.SetStateAction<string>>;
  // STEP 2
  firstname: string;
  setFirstname: React.Dispatch<React.SetStateAction<string>>;
  lastname: string;
  setLastname: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  mobilenumber: string;
  setMobilenumber: React.Dispatch<React.SetStateAction<string>>;
  offerings: string;
  setOfferings: React.Dispatch<React.SetStateAction<string>>;
  locations: Array<string>;
  setLocations: React.Dispatch<React.SetStateAction<Array<string>>>;
  // STEP 3
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
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
  const [account, setAccount] = useState("account");
  const [contact, setContact] = useState("contact");
  // STEP 2
  const [firstname, setFirstname] = useState("firstname");
  const [lastname, setLastname] = useState("lastname");
  const [email, setEmail] = useState("email");
  const [mobilenumber, setMobilenumber] = useState("mobilenumber");
  const [offerings, setOfferings] = useState("offerings");
  const [quantity, setQuantity] = useState(1);
  const [locations, setLocations] = useState([
    "locations001",
    "location002",
    "location003",
  ]);
  // STEP 3
  const [number, setNumber] = useState("number");
  const [location, setLocation] = useState("location");
  const [productOffering, setProductOffering] = useState("productOffering");
  const [productSpecification, setProductSpecification] = useState(
    "productSpecification",
  );
  const [orderedQuantity, setOrderedQuantity] = useState("orderedQuantity");
  const [totalPrice, setTotalPrice] = useState(1);
  const [noneRecuringChangesPerUnit, setNoneRecuringChangesPerUnit] =
    useState(1);
  const [monthlyRecurringChangesPerUnit, setMonthlyRecurringChangesPerUnit] =
    useState(1);

  return (
    <NewCustomerOrderContext.Provider
      value={{
        // STEP 1
        account,
        setAccount,
        contact,
        setContact,
        // STEP 2
        firstname,
        setFirstname,
        lastname,
        setLastname,
        email,
        setEmail,
        mobilenumber,
        setMobilenumber,
        offerings,
        setOfferings,
        quantity,
        setQuantity,
        locations,
        setLocations,
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
