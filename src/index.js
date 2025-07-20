const mongoose = require("mongoose");
const app = require("./app");
// console.log(process.env.MAILTRAP_TOKEN);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection failed", error);
    throw error;
  }
};
connectDB();
