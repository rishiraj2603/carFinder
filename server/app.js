require("dotenv").config();
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Car = require("./models/car");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
mongoose
  .connect(MONGO_DB_URL || "mongodb://localhost:27017/carsList")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(4000, () => {
  console.log("Server is running on port 5000");
});
