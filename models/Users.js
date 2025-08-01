const { DataTypes}  = require("sequelize");
const { sequelize } = require("../config/db");
const bcrypt = require("bcrypt");
// const { type } = require("os");
// const { default: isEmail } = require("validator/lib/isEmail");

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true},
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;




