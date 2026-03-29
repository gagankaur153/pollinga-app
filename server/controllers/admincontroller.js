const User = require("../models/Usermodels");
const Poll = require("../models/Pollmodels");

const admindashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPolls = await Poll.countDocuments();
    if(!totalUsers || !totalPolls){
      res.json({msg:"not find"})
    }
console.log(totalUsers, totalPolls)
    res.json({
      totalUsers,
      totalPolls
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const removePoll = async (req, res) => {
  try {
    const userid = req.user.id
    await Poll.findByIdAndDelete(req.params.id);
    res.json({ msg: "Poll removed by admin" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  admindashboard,
  getAllUsers,
  removePoll
};