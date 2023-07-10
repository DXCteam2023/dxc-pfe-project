import { Router } from "express";
import {
  addProductOffering,
  archiveProductOffering,
  getArchivedProductOfferings,
  getProductOfferingById,
  getProductOfferings,
  publishProductOffering,
  updateProductOffering,
} from "../controllers/product-offering";

const productOfferingRoute = Router();

productOfferingRoute.get("/", getProductOfferings);

productOfferingRoute.get("/:id", getProductOfferingById);

productOfferingRoute.post("/", addProductOffering);

productOfferingRoute.patch("/update/:id", updateProductOffering);

productOfferingRoute.patch("/publish/servicenow/:id", publishProductOffering);

productOfferingRoute.post("/archive/:id", archiveProductOffering);

productOfferingRoute.get("/archived/all", getArchivedProductOfferings);

export default productOfferingRoute;
