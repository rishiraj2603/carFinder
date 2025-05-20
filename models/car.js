const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  horsepower: {
    type: String,
    required: true,
  },
});
const Car = mongoose.model("Car", carSchema);
module.exports = Car;
