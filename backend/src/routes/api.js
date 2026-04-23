const express = require("express");
const router = express.Router();

// Import Controllers
const FilmController = require("../controllers/FilmController");
const WatchlistController = require("../controllers/WatchlistController");
const HistoryController = require("../controllers/HistoryController");
const CommentController = require("../controllers/CommentController");

/**
 * Endpoint Film
 */
router.get("/film", FilmController.index);
router.post("/film", FilmController.store);
router.put("/film/:id", FilmController.update);

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
