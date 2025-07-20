const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const connectDB = require("./db");
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

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT, () => {
      console.log(
        "successfully listening on port  ",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
    console.error("Database cannot be connected!!");
  });
module.exports = app;
