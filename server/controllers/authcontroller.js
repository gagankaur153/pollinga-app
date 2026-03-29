const User = require("../models/Usermodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwttoken =  process.env.JWT_SECRET || "manifnkdfjogdgdoem"
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    res.json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role, email:user.email },
     jwttoken,
      { expiresIn: "1d" }
    );

    res.cookie("votetoken", token, {
      httpOnly: true,
      secure: false
    });

    res.json({ msg: "Login successful", data:token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getuser = async (req,res) => {
  const userinfo = await req.user
  res.status(200).json(userinfo);
}

const logoutUser = (req, res) => {
  res.clearCookie("votetoken");
  res.json({ msg: "Logged out" });
};

module.exports = {
 registerUser,
 loginUser,
 getuser,
 logoutUser
};