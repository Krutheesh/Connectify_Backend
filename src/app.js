const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());
app.use('/api', routes);

app.get("/", (req, res) => {
  res.send("Welcome to Connectify API");  
});


module.exports = app;
