import { Router } from "express";
import {
  addCustomerOrder,
  getCustomerOrderById,
  getCustomerOrders,
  updateCustomerOrder,
} from "../controllers/customer-order";

const customerOrderRoute = Router();

customerOrderRoute.get("/", getCustomerOrders);

customerOrderRoute.get("/:id", getCustomerOrderById);

customerOrderRoute.post("/", addCustomerOrder);

customerOrderRoute.patch("/:id", updateCustomerOrder);

export default customerOrderRoute;
