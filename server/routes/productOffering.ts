import { Router } from "express";
import {
  addProductOffering,
  archiveProductOffering,
  getProductOfferingById,
  getProductOfferings,
} from "../controllers/product-offering";

const productOfferingRoute = Router();

productOfferingRoute.get("/", getProductOfferings);

productOfferingRoute.get("/:id", getProductOfferingById);

productOfferingRoute.post("/", addProductOffering);

productOfferingRoute.patch("/:id", archiveProductOffering);

export default productOfferingRoute;
