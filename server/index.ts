import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Connection from "./connection";
import userRoute from "./routes/user";
import customerOrderRoute from "./routes/customerOrder";
import productSpecRoute from "./routes/productSpecification";
import productOfferingRoute from "./routes/productOffering";

Connection();

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

// User routes
app.use("/api/user", userRoute);

// Customer Order routes
app.use("/api/customer-order", customerOrderRoute);

// Product Offering routes
app.use("/api/product-offering", productOfferingRoute);

// Product Specification routes
app.use("/api/product-specification", productSpecRoute);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
