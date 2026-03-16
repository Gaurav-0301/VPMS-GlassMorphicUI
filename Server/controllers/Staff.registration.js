const reg = require('../models/Registration.model');
const staff = require('../models/Staff.credential');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createStaff = async (req, res) => {
    const { name, email, password, role, dept } = req.body;

    try {
        if (!name || !email || !password || !role || !dept) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const staffDetail = await staff.create({
            name,
            email,
            password: hashedPassword,
            role,
            dept
        });

        return res.status(201).json({
            success: true,
            message: "New Staff Added successfully",
            data: {
                id: staff._id,
                name: staff.name,
                email: staff.email
            }
        });

    } catch (error) {
        // Handle Duplicate Email Error (MongoDB Error Code 11000)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "This email is already registered."
            });
        }

        console.error("Registration Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const loginStaff = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await staff.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

        // Generate Token
        const token = jwt.sign({ id: user._id, role: user.role }, "YOUR_SECRET_KEY", { expiresIn: '1d' });

        // Send back the role so the frontend knows where to redirect
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                dept: user.dept
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getHosts = async (req, res) => {
    try {
        const hosts = await staff.find({ role: "Host" }).select("name _id dept");
        res.status(200).json({ success: true, data: hosts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch hosts" });
    }
};


module.exports = {createStaff,loginStaff, getHosts};