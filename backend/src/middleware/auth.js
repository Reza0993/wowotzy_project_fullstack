const authMiddleware = (req, res, next) => {
  const userId = req.headers["x-user-id"];
  
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Silakan login terlebih dahulu."
    });
  }
  
  req.userId = parseInt(userId);
  next();
};

module.exports = authMiddleware;