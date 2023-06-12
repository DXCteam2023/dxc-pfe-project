import { Router } from "express";
import {
  addProductOffering,
  archiveProductOffering,
  getArchivedProductOfferings,
  getProductOfferingById,
  getProductOfferings,
} from "../controllers/product-offering";

const productOfferingRoute = Router();

productOfferingRoute.get("/", getProductOfferings);

productOfferingRoute.get("/:id", getProductOfferingById);

productOfferingRoute.post("/", addProductOffering);

productOfferingRoute.patch("/:id", archiveProductOffering);

productOfferingRoute.get("/archived/all", getArchivedProductOfferings)

export default productOfferingRoute;
