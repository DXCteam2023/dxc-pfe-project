import {
  TDataCustomerOrder,
  TDataProductOffering,
  TDataProductSpecification,
} from "../types";

const handleSearchClick = (
  e: React.FormEvent<HTMLFormElement>,
  {
    setPopupOpen,
    products,
    searchTerm,
    setProducts,
    productOfferings,
    setProductOfferings,
    productSpecifications,
    setProductSpecifications,
  }: {
    setPopupOpen: (value: React.SetStateAction<boolean>) => void;
    products: TDataCustomerOrder[];
    searchTerm: string;
    setProducts: (value: React.SetStateAction<TDataCustomerOrder[]>) => void;
    productOfferings: TDataProductOffering[];
    setProductOfferings: (
      value: React.SetStateAction<TDataProductOffering[]>,
    ) => void;
    productSpecifications: TDataProductSpecification[];
    setProductSpecifications: (
      value: React.SetStateAction<TDataProductSpecification[]>,
    ) => void;
  },
) => {
  e.preventDefault();
  setPopupOpen(true);
  console.log(searchTerm);
  console.log(products);
  // const filteredOrders = products.filter((order) => {
  //   const orderValues = Object.values(order).join(" ").toLowerCase();
  //   return orderValues.includes(searchTerm.toLowerCase());
  // });
  // setProducts(filteredOrders);
  // setPopupOpen(true);
  // console.log(productOfferings);
  // console.log("Result Products Oders:", filteredOrders);
  const filteredProducts = productOfferings.filter((product) => {
    const productValues = Object.values(product).join(" ").toLowerCase();
    return productValues.includes(searchTerm.toLowerCase());
  });
  setProductOfferings(filteredProducts);
  console.log("Result Product Offering:", filteredProducts);
  setPopupOpen(true);
  console.log(productSpecifications);
  const filteredProductSpecifications = productSpecifications.filter(
    (product) => {
      const productValues = Object.values(product).join(" ").toLowerCase();
      return productValues.includes(searchTerm.toLowerCase());
    },
  );
  setProductSpecifications(filteredProductSpecifications);
  console.log("Result Product Specifications:", filteredProductSpecifications);
  setPopupOpen(true);
};

export default handleSearchClick;
