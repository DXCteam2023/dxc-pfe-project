import { Router } from "express";
import {
  addProductOffering,
  getArchivedProductOfferings,
  getProductOfferingById,
  getProductOfferings,
  updateProductOffering,
} from "../controllers/product-offering";

const productOfferingRoute = Router();

productOfferingRoute.get("/", getProductOfferings);

productOfferingRoute.get("/:id", getProductOfferingById);

productOfferingRoute.post("/", addProductOffering);

productOfferingRoute.patch("/:id", updateProductOffering);

productOfferingRoute.get("/archived/all", getArchivedProductOfferings);

export default productOfferingRoute;
