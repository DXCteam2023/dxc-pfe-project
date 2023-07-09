import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Connection from "./connection";
import userRoute from "./routes/user";
import customerOrderRoute from "./routes/customerOrder";
import productSpecRoute from "./routes/productSpecification";
import productOfferingRoute from "./routes/productOffering";
import incidentRouter from "./routes/incident";
import accountRoute from "./routes/customer";

Connection();

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

const corsConfig = {
  origin: ["https://dxc-pfe-project.vercel.app", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(express.json());
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
// app.use(cors());

// User routes
app.use("/api/user", userRoute);

// Customer Order routes
app.use("/api/customer-order", customerOrderRoute);

// Product Offering routes
app.use("/api/product-offering", productOfferingRoute);

// Product Specification routes
app.use("/api/product-specification", productSpecRoute);

//Incident router
app.use("/api/incidents", incidentRouter);

// Account router
app.use("/api/account", accountRoute);

// app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
export default app;
