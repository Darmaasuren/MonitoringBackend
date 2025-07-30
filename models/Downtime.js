const { DataTypes } = require("sequelize");
const { sequelize } = require('../config/db');

const Downtime = sequelize.define("Downtime", {
    pc_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shutdown_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    startup_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    downtime: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Downtime;