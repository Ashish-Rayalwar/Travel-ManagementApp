const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const multer = require("multer");
const cors = require("cors");
const path = require("path");
// const cookieParser = require("cookie-parser");
const { dbConnection } = require("./database/db");
const userRoute = require("./routes/userRoutes");
const travelRoute = require("./routes/travelRoutes");
require("dotenv").config();
app.use(multer().any());
// app.use(cors());
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../build")));

app.use("/api/accounts", userRoute);
app.use("/api", travelRoute);

const url = process.env.URL;

const port = process.env.PORT || 5000;
dbConnection(url);

app.listen(port, () => {
  console.log(`server start on port ${port}`);
});

app.get("*", (req, res) => {
  const file = path.join(__dirname, "../build/index.html");
  res.sendFile(file);
});
