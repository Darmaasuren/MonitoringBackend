const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const { sequelize } = require("../config/db");
const { where } = require("sequelize");
const User = require("../models/Users");

const JWT_SECRET = process.env.JWT_SECRET;

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
});

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
});

// const loginLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 5,
//     message: "Too many login attempts. Try again later.",
// });

const register = async (req, res) => {
    const { email, username, password } = req.body;
    
    const { error } = registerSchema.validate({email, username, password});
    if(error) {
        return res.status(400).json({ msg: error.details[0].message });
    }

    try {
        const existing = await User.findOne({where: { email }});
        if (existing) {
            return res.status(400).json({ msg: "Email already registered."});
        }

        await User.create({email, username, password});
        res.status(201).json({msg: "User resgistered"});
        console.log("User registered");
    }
    catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error"});
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const { error }  = loginSchema.validate({username, password});
    if (error) {
        console.log("Invalid input: ", error.details[0].message);
        return res.status(400).json({msg: error.details[0].message});
    }

    try {
        const user = await User.findOne({ where: { username }});
        if (!user) {
            console.log("Authentication failed.");
            return res.status(401).json({ msg: "Invalid username or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch){
            return res.status(401).json({ msg: "Invalid username or password"});
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {expiresIn: "12h"});

        res.json({ token, msg: "Login succes"});
        console.log("Login succes");
    }
    catch (error){
        console.log("Login error: " , error.message);
        res.status(500).json({msg: "Server error"});
    }
};

module.exports = { register, login };

