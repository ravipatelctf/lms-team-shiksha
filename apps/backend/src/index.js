const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Home route
app.get("/api", (req, res) => {
    res.status(200).json({"message": "Welcome to the home page of lms-team-shiksha backend"})
})

// Initialize server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})