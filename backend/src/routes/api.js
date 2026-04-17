const express = require("express");
const router = express.Router();

// Import Controllers
const FilmController = require("../controllers/FilmController");
const WatchlistController = require("../controllers/WatchlistController");

// Import Middlewares (Validation Manual)
const validateFilm = require("../middlewares/filmValidation");
const validateWatchlist = require("../middlewares/watchlistValidation");

/**
 * Endpoint Film
 */
router.get("/film", FilmController.index);
// Validasi digunakan pada POST (Create) dan PUT (Update) sesuai instruksi PDF
router.post('/film', validateFilm, FilmController.store);
router.put('/film/:id', validateFilm, FilmController.update);

/**
 * Endpoint Watchlist
 */
router.get("/watchlist", WatchlistController.index);
router.post("/watchlist", validateWatchlist, WatchlistController.store);
router.delete("/watchlist/:id", WatchlistController.delete);

module.exports = router;