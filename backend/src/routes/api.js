const express = require("express");
const router = express.Router();
const FilmController = require("../controllers/FilmController");
const WatchlistController = require("../controllers/WatchlistController");
const validateFilm = require("../middlewares/filmValidation");
const validateWatchlist = require("../middlewares/watchlistValidation");

// endpoint Film
router.get("/film", FilmController.index);
router.post('/film', validateFilm, FilmController.store);
router.put('/film/:id', validateFilm, FilmController.update);
// endpoint Watchlist
router.get("/watchlist", WatchlistController.index);
router.post("/watchlist", validateWatchlist, WatchlistController.store);
router.delete("/watchlist/:id", WatchlistController.delete);

module.exports = router;
