const express = require("express");
const router = express.Router();
router.use(express.json());
const { User } = require("../models/user.models");
const bcrypt = require("bcrypt");


// Register route
router.post("/register", async (req, res) => {
    const {username, email, password, role} = req.body;
    try {
        const isExistingUser = await User.findOne({username});
    } catch (error) {
        
    }
})