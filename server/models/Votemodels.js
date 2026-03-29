const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll",
    required: true
  },

  optionIndex: {
    type: Number,
    required: true
  }

}, { timestamps: true });

voteSchema.index({poll: 1, user: 1}, {unique: true})

module.exports = mongoose.model("Vote", voteSchema);