import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
