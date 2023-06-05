import { Router } from "express";
import { getProductSpecifications } from "../controllers/product-specification";
import { getProductOfferingById } from "../controllers/product-offering";

const productSpecRoute = Router();

productSpecRoute.get("/", getProductSpecifications);

productSpecRoute.get("/:id", getProductOfferingById);

export default productSpecRoute;
