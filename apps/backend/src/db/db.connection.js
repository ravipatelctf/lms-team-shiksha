const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MongoUri = process.env.MONGODB;

async function initializeDatabase() {
    await mongoose
        .connect(MongoUri)
        .then(() => {
            console.log(`Connected to the database successfully.`);
        })
        .catch((error) => {
            console.error("Error connecting to the database", error);
        })
}

module.exports = { initializeDatabase };