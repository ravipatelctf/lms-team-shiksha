const { initializeDatabase } = require("./db/db.connection");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const {router: authRoutes, verifyJwt} = require("./routes/auth.routes");

initializeDatabase();

// Auth routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the LMS backend API!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
