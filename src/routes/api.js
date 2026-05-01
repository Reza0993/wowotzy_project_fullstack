const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const AuthController = require("../controllers/AuthController");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
require("dotenv").config();

// Login
router.post("/login", AuthController.login);
//Register
router.post("/register", AuthController.register);

// Import Controllers
const FilmController = require("../controllers/FilmController");
const WatchlistController = require("../controllers/WatchlistController");
const HistoryController = require("../controllers/HistoryController");
const CommentController = require("../controllers/CommentController");
const UserController = require("../controllers/UserController");

/**
 * Endpoint User (CRUD)
 */
router.get("/user", UserController.index);
router.get("/user/:id", UserController.show);
router.post("/user", UserController.store);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);

/**
 * Endpoint Film
 */
router.get("/film", FilmController.index);
router.post("/film", FilmController.store);
router.put("/film/:id", FilmController.update);
router.delete("/films/:id", FilmController.delete);

/**
 * Endpoint Watchlist
 */
router.get("/watchlist", WatchlistController.index);
router.post("/watchlist", WatchlistController.store);
router.delete("/watchlist/:id", WatchlistController.delete);

/**
 * Endpoint History
 */
router.get("/history", HistoryController.index);
router.post("/history", HistoryController.store);
router.delete("/history/:id", HistoryController.delete);

/**
 * Endpoint Comments
 */
router.get("/comments/:id", CommentController.getComments);
router.post("/comments", CommentController.addComment);

module.exports = router;