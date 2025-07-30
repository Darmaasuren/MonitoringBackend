const express = require("express");
const router = express.Router();
const { userByEmail, 
        userByID, 
        updateUser, 
        deleteUser, 
        getUserAll
        } = require("../contollers/userController");

router.get("/user/all", getUserAll);

router.get("/user/email/:email", userByEmail);

router.get("/user/id/:id", userByID);

router.put("/user/id/:id", updateUser);

router.delete("/user/id/:id", deleteUser);

module.exports = router;