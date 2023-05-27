const express = require("express");
const connection = require("./db");
const routes = require("./routes/routes");
const app = express();
const cors = require("cors");


connection();

app.use(express.json());
app.use(cors());


app.use("/api", routes);

app.get("/", (req, res) => {
    res.send('hello');
});

const port = process.env.PORT || 8000;

app.listen(port, () => `Server running on port ${port}`);