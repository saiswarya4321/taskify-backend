const express = require("express");
require("dotenv").config();
const cookie = require("cookie-parser");
const { connectionDb } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const { todoRouter } = require("./routes/todoRoutes");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cookie());

app.use(cors({
    origin: ['https://taskify-frontend-theta.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
}));

// Connect database
connectionDb();

// Routes
app.use("/user", userRouter);
app.use("/todo", todoRouter);

// Health check route
app.get("/", (req, res) => {
    res.send("Todo application");
});

// Body log middleware
app.use((req, res, next) => {
    console.log("BODY RECEIVED:", req.body);
    next();
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// ✅ Export the app instead of listening
module.exports = app;
