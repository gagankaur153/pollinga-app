module.exports = function (req, res, next) {
  try {
    // authMiddleware already req.user set karta hai
    if (!req.user) {
      return res.status(401).json({ msg: "Not authenticated" });
    }

    // check role
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admin only." });
    }

    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};