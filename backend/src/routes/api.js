const express = require("express");
const router = express.Router();

// Import Controllers
const FilmController = require("../controllers/FilmController");
const WatchlistController = require("../controllers/WatchlistController");
const HistoryController = require("../controllers/HistoryController");

// Import Middlewares (Validation Manual)

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

router.get("/history", HistoryController.index);

module.exports = router;
