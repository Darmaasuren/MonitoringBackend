require("dotenv").config({
    path:  "../.env",
    // quiet: true
    }
);
const path = require("path");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: "postgres",
        logging: false,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate ();
        console.log("Connect succesfully to Postgresql.");
    }
    catch(error) {
        console.log("Failed to connect Postgres");
        console.log(" " + error.message);
        process.exit(1);
    }
}

module.exports = {connectDB, sequelize}
// connectDB();