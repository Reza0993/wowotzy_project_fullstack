const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const userId = req.headers["authorization"];

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan",
    });
  }
  const token = userId.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // 👈 simpan user dari token
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token tidak valid",
    });
  }
};

module.exports = authMiddleware;
