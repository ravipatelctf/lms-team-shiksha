const express = require("express");
const router = express.Router();
router.use(express.json());
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.models");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

// Signup route
router.post("/signup", async (req, res) => {
    const {username, email, password} = req.body;
    console.log({username, email, password});
    try {
        const isExistingUser = await User.findOne({username});
        console.log(isExistingUser)
        if (isExistingUser) {
            return res.status(400).json({"error": "User already exists. Please login instead."})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({username, email, password: hashedPassword});
        const savedUser = await newUser.save();
        console.log("savedUser", savedUser)
        res.status(201).json({"message": "User signup successful."});

    } catch (error) {
        res.status(500).json({"error": "User signed failed"});
    }
})

// Login route
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({"error": "User not found."});
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (isPasswordMatched === false) {
            return res.status(400).json({"error": "Invalid Credentials."});
        }

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "4h"});

        res.status(200).json({"message": "Login successful", username: user.username, token})

    } catch (error) {
        res.status(500).json({"error": "Failed to login"});
    }
});

// Middleware for protecting other routes
const verifyJwt = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({"error": "No token provided"});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(402).json({"error": "Invalid token."});
    }
}

module.exports = {router, verifyJwt};