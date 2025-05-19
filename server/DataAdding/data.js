require("dotenv").config({ path: "../.env" });
const axios = require("axios");
const mongoose = require("mongoose");
const Car = require("../models/car");

console.log(process.env.MONGO_DB_URL);
// Connect to MongoDB with error handling
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

async function addData() {
  try {
    console.log("Fetching data from API...");
    const response = await axios.get(
      "https://private-anon-cbac7150b9-carsapi1.apiary-mock.com/cars"
    );
    const jsonData = response.data;
    console.log(`Retrieved ${jsonData.length} cars from API`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < jsonData.length; i++) {
      try {
        const newCar = new Car(jsonData[i]);
        await newCar.save();
        successCount++;
        if (successCount % 50 === 0) {
          console.log(`Successfully saved ${successCount} cars`);
        }
      } catch (error) {
        errorCount++;
        console.error(`Error saving car at index ${i}:`, error.message);
        console.error("Car data:", JSON.stringify(jsonData[i], null, 2));
      }
    }

    console.log(`\nMigration completed:`);
    console.log(`Successfully saved: ${successCount} cars`);
    console.log(`Failed to save: ${errorCount} cars`);

    // Close the MongoDB connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Fatal error:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

addData();
