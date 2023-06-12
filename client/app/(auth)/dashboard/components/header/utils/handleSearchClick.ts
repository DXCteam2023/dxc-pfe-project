import { TDataCustomerOrder, TDataProductOffering } from "../types";

const handleSearchClick = (
  e: React.FormEvent<HTMLFormElement>,
  {
    setPopupOpen,
    dataCostumerOrders,
    searchTerm,
    setCustomerResults,
    dataProductOfferings,
    setSearchResults,
  }: {
    setPopupOpen: (value: React.SetStateAction<boolean>) => void;
    dataCostumerOrders: TDataCustomerOrder[];
    searchTerm: string;
    setCustomerResults: (
      value: React.SetStateAction<TDataCustomerOrder[]>,
    ) => void;
    dataProductOfferings: TDataProductOffering[];
    setSearchResults: (
      value: React.SetStateAction<TDataProductOffering[]>,
    ) => void;
  },
) => {
  e.preventDefault();
  setPopupOpen(true);
  const filteredOrders = dataCostumerOrders.filter((order) => {
    const orderValues = Object.values(order).join(" ").toLowerCase();
    return orderValues.includes(searchTerm.toLowerCase());
  });
  setCustomerResults(filteredOrders);
  const filteredProducts = dataProductOfferings.filter((product) => {
    const productValues = Object.values(product).join(" ").toLowerCase();
    return productValues.includes(searchTerm.toLowerCase());
  });
  setSearchResults(filteredProducts);
  setPopupOpen(true);
};

export default handleSearchClick;
