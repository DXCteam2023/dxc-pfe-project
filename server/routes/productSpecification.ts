import { Router } from "express";
import {
  getProductSpecificationById,
  getProductSpecifications,
} from "../controllers/product-specification";

const productSpecRoute = Router();

productSpecRoute.get("/", getProductSpecifications);

productSpecRoute.get("/:id", getProductSpecificationById);

export default productSpecRoute;
