const {StreamChat} = require("stream-chat");
const dotenv = require("dotenv");
dotenv.config();
const {STREAM_API_KEY, STREAM_API_SECRET} = process.env;
const streamClient = StreamChat.getInstance(STREAM_API_KEY,STREAM_API_SECRET);

module.exports.upsertStreamUser = async(userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
    
  } catch (error) {
    console.log("Error in upserting Stream user:", error);

  }
}
module.exports.generateStreamToken = (userId) => {
  try {
    // ensure userId is a string
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
}