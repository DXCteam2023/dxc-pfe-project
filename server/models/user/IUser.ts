type Order = {
  orderNumber: string;
  id: string;
  productOfferings: string[];
  state: string;
  orderDate: string;
  type: string;
};

type ProductOffering = {
  number: string;
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  contractTerm: string;
  state: string;
};
export default interface IUserDocument {
  userID: string;
  username: string;
  password: string;
  profile: string;
  role: string;
  createdAt: Date;
  orders?: Order[];
  totalOrders?: number;
  productOfferings?: ProductOffering[];
  totalProductOfferings?: number;
  generateAuthToken(): string;
}
