const jwt = require("jsonwebtoken");
const jwttoken =  process.env.JWT_SECRET || "manifnkdfjogdgdoem"
module.exports = function (req, res, next) {
  const token = req.cookies?.votetoken;

  if (!token) return res.status(401).json({ msg: "please login !" });

  try {
    const decoded = jwt.verify(token, jwttoken);
    req.user = decoded;
    console.log(decoded)
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};