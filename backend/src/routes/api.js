const express = require("express");
const router = express.Router();
const FilmController = require("../controllers/FilmController");
const WatchlistController = require("../controllers/WatchlistController");

// Ubah '/' menjadi '/films'
router.get("/films", FilmController.index);
router.get("/watchlist", WatchlistController.index);
router.post("/watchlist", WatchlistController.store);

module.exports = router;
