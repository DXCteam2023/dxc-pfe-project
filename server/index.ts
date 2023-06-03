import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

// User routes
app.use("/api/user" /* route */);

// Customer Order routes
app.use("/api/customer-order" /* route */);

// Product Offering routes
app.use("/api/product-offering" /* route */);

// Product Specification routes
app.use("/api/product-specification" /* route */);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
