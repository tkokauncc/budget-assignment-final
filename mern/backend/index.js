const compression = require("compression");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
//for gzip compression
app.use(compression({ threshold: 0 }));
//routes
const authRoute = require("./AuthRoute");
const budgetsRoute = require("./BudgetRoute");
const tokenVerificationMiddleware = require("./tokenVerificationMiddleware");

const PORT = 5000;
// const MONGO_URL = "mongodb://root:rootpassword@localhost:27017";
const MONGO_URL = "mongodb://root:rootpassword@mongo:27017";

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/", authRoute);
app.use("/api", tokenVerificationMiddleware, budgetsRoute);
