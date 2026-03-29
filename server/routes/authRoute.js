const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getuser
} = require("../controllers/authcontroller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/getuser',authMiddleware, getuser)
router.post("/logout", logoutUser);

module.exports = router;