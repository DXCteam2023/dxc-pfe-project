import express from "express";
import connection from "./db.js";
import routes from "./routes/routes.js";
import cors from "cors";

const app = express();

connection();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("hello");
});

const port = process.env.PORT || 8000;

app.listen(port, () => `Server running on port ${port}`);
