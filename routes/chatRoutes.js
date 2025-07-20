const { Router } = require("express");
const { isLoggedIn } = require("../../middlewares/authMiddleware");
const { getStreamToken } = require("../../controllers/chatController");
getStreamToken;
const router = Router();

router.get("/token", isLoggedIn, getStreamToken);

module.exports = router;
