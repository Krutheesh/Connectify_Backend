const asyncHandler = require("../utils/asyncHandler");
const {generateStreamToken} = require("../config/stream");
module.exports.getStreamToken = asyncHandler(async(req,res) => {
const token = generateStreamToken(req.user.id);
res.status(200).json({
    success: true,
    token: token
  });
} )