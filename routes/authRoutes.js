const { Router } = require("express");
const { isLoggedIn } = require("../../middlewares/authMiddleware");
const {
  signup,
  signin,
  logout,
  onboard,
  getProfile,
} = require("../../controllers/authController");

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/onboard", isLoggedIn, onboard);
router.get("/me", isLoggedIn, getProfile);

module.exports = router;
//
