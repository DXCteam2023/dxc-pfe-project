import { Router } from "express";
import {
  addProductOrder,
  addServiceOrder,
  getCustomerOrderById,
  getCustomerOrders,
  getProductOrderById,
  getProductOrders,
  getServiceOrderById,
  getServiceOrders,
  updateProductOrder,
  updateServiceOrder,
} from "../controllers/customer-order";
 
const customerOrderRoute = Router();

customerOrderRoute.get("/", getCustomerOrders);

customerOrderRoute.get("/all/:id", getCustomerOrderById);

customerOrderRoute.get("/product", getProductOrders);

customerOrderRoute.get("/product/:id", getProductOrderById);

customerOrderRoute.get("/service", getServiceOrders);

customerOrderRoute.get("/service/:id", getServiceOrderById); 

customerOrderRoute.post("/product", addProductOrder);

customerOrderRoute.post("/service", addServiceOrder);

customerOrderRoute.patch("/product", updateProductOrder);

customerOrderRoute.patch("/service", updateServiceOrder);

export default customerOrderRoute;
