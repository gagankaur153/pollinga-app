const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const { createPoll, getAllPolls, getSinglePoll, votePoll,} = require("../controllers/poolContoller");

router.post("/", auth, createPoll);
router.get("/", getAllPolls);
router.get("/mypolls", auth, getSinglePoll);
router.post("/:id/vote", auth, votePoll);

module.exports = router;