import { Router } from "express";
import {
  addProductOffering,
  getArchivedProductOfferings,
  getProductOfferingById,
  getProductOfferings,
  publishProductOffering,
} from "../controllers/product-offering";

const productOfferingRoute = Router();

productOfferingRoute.get("/", getProductOfferings);

productOfferingRoute.get("/:id", getProductOfferingById);

productOfferingRoute.post("/", addProductOffering);

productOfferingRoute.patch("/:id", publishProductOffering);

productOfferingRoute.get("/archived/all", getArchivedProductOfferings);

export default productOfferingRoute;
