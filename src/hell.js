
const dotenv = require("dotenv");

dotenv.config();
console.log(process.cwd())
console.log("Loading environment variables...");
console.log("MongoDB URI:", process.env.MONGODB_URI); 
console.log("Server Port:", process.env.PORT);  
console.log("Mailtrap Token:", process.env.MAILTRAP_TOKEN);
// Middleware to parse JSON requests