const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");  // ← AuthController (huruf besar A)
const authMiddleware = require("../middleware/auth");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", authMiddleware, AuthController.logout);
router.get("/profile", authMiddleware, AuthController.getProfile);

module.exports = router;