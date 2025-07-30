const express = require("express");
const router = express.Router();
const User = require("../models/Users");

const getUserAll = async (req, res) => {
    try {
        const all = await User.findAll();

        res.json(all);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
}

const userByEmail = async (req, res) => {

    try {
        const user = await User.findOne({
            where: { email: req.params.email },
            attributes: ["id", "username", "email", "createdAt"],
        });

        if (!user) {
            return res.status(404).json({ message: "User email not found!"});
        }

        res.json(user);
    }
    catch (error) {
        console.log(error.message);
        console.error(error.message);
        res.status(500).json({ message: "Server error"});
    }
};

const userByID = async (req, res) => {

    try {
        const userId = await User.findByPk(req.params.id, {
            attributes: ["id", "username", "email", "createdAt"],
        });

        console.log(userId);

        if (!userId) {
            return res.status(404).json({ message: "User ID not found"});
        }

        res.json(userId);

    }
    catch (error) {
        console.log(error.message);
        console.error(error.message);
        res.status(500).json({ message: "Server error"});
    }
};

const updateUser = async (req, res) => {

    console.log("REQ.BODY ===>", req.body);

    if (!req.body) {
        console.log("Request body is missing!");
        return res.status(400).json({ message: "Request body is missing!"});
    }

    const userID = req.params.id;
    const { username, email } = req.body;

    try {

        const user = await User.findByPk(userID)

        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User ID not found!"});
        }

        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        res.json({
            message: "User updated succesfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        });  
    }
    catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
};

const deleteUser = async (req, res) => {
    const userID = req.params.id;

    try {
        const user = await User.findByPk(userID);

        if (!user) {
            return res.status(404).json({ message: "User ID not found!"});
        }

        await user.destroy();

        res.json({message: "User deleted succesfully"});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Server error"});
    }
};


module.exports = { getUserAll, userByEmail, userByID, updateUser, deleteUser};

