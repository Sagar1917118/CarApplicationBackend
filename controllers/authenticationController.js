const User = require("../models/users"); // Adjust path if needed
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
// SIGNUP FUNCTION
const signup = async (req, res) => {
    try {
        const { name, email, password} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully."});
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Server error." });
    }
};

// LOGIN FUNCTION
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Create JWT token (replace 'secret' with your environment variable or config)
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET, // Use the secret key from .env
            { expiresIn: '24h' }     // Token expiration time
        );
        res.status(200).json({ message: "Login successful.", token});
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server error." });
    }
};

module.exports = { signup, login };
