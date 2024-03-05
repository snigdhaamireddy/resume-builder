const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/resumeBuilder")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error :", err));

app.use(express.json());

app.listen(8080, () => console.log("Server started at http://localhost:8080"));