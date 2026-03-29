const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {  getAllUsers, removePoll, admindashboard } = require("../controllers/admincontroller");

router.get("/dashboard", auth, admin, admindashboard);
router.get("/users", auth, admin, getAllUsers);
router.delete("/poll/:id", auth, admin, removePoll);

module.exports = router;