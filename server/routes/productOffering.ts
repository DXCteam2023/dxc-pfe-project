import { Router } from "express";
import {
  addProductOffering,
  getProductOfferingById,
  getProductOfferings,
  updateProductOffering,  
} from "../controllers/product-offering";
const productOfferingRoute = Router();

productOfferingRoute.get("/", getProductOfferings);

productOfferingRoute.get("/:id", getProductOfferingById);

productOfferingRoute.post("/", addProductOffering);

productOfferingRoute.patch("/:id",updateProductOffering);

export default productOfferingRoute;
