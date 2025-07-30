require("dotenv").config();
const express = require("express");
const { connectDB, sequelize } = require("./config/db");
const authRoute = require("./routes/auth");
const downtimeRoute = require("./routes/downtime");
const usersRoute = require("./routes/users");

// const app = express();
// app.use(express.json());

// app.use("/api", authRoute);

//   // Ensure the PORT environment variable is set and use it in the worker
//   const PORT = process.env.PORT || 5000; // Use PORT from environment or default to 5000

//   // Start the server in the worker process
//   const server = app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Worker ${process.pid} is handling requests on port ${PORT}`);
//   });

const app = express();
app.use(express.json());

// API маршрут
app.use("/api", authRoute);

app.use("/api", downtimeRoute);

app.use("/api", usersRoute);

const PORT = process.env.PORT || 5001;

// const PORT = 3000;

(async () => {
    await connectDB(); // PostgreSQL холболтоо шалгана
    console.log(PORT);

    // Хүснэгт үүсгэх (хэрвээ байхгүй бол)
    await sequelize.sync({ alter: true }); // <<-- хүснэгт үүсгэх код

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
})();

