const Poll = require("../models/Pollmodels");
const Vote = require("../models/Votemodels");

const createPoll = async (req, res) => {
  try {
    const { question, options, expiresAt } = req.body;

    const poll = await Poll.create({
      question,
      options: options.map(text => ({ text })),
      expiresAt,
      createdBy: req.user.id
    });

    res.json(poll);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate("createdBy", "name");
    res.json(polls);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getSinglePoll = async (req, res) => {
  try {
      const userId = req.user.id;
    const poll = await Poll.find({createdBy:userId});
    if (!poll) return res.status(404).json({ msg: "Poll not found" });

    res.json(poll);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const votePoll = async (req, res) => {
  try {
    const pollId = req.params.id;
    const userId = req.user?.id;

    if (!pollId || !userId) {
      return res.status(400).json({ msg: "Vote data invalid hai" });
    }

    const { optionIndex } = req.body;

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ msg: "Poll nahi mili" });

    if (poll.expiresAt && new Date() > poll.expiresAt)
      return res.status(400).json({ msg: "Poll is expired" });

    const already = await Vote.findOne({ user: userId, poll: pollId });
    if (already) return res.status(400).json({ msg: "Already voted" });

    // ✅ Option validation
    if (
      optionIndex === undefined || 
      optionIndex < 0 || 
      optionIndex >= poll.options.length
    ) {
      return res.status(400).json({ msg: "wrong option select" });
    }

    // Increment vote
    poll.options[optionIndex].votes += 1;
    await poll.save();
console.log(userId, pollId)
    await Vote.create({
      user: userId,
      poll: pollId,
      optionIndex
    });

    res.json({ msg: "Successfully voted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal sever error" });
  }
};



module.exports = {
  createPoll,
  getAllPolls,
  getSinglePoll,
  votePoll
};