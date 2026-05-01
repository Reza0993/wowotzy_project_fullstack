const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const FilmController = require("../controllers/FilmController");
const WatchlistController = require("../controllers/WatchlistController");
const HistoryController = require("../controllers/HistoryController");
const CommentController = require("../controllers/CommentController");
const UserController = require("../controllers/UserController");

router.get("/users", UserController.index);
router.get("/users/:id", UserController.show);
router.post("/users", UserController.store);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

router.get("/film", FilmController.index);
//router.post("/film", FilmController.store);
router.put("/film/:id", FilmController.update);
router.delete("/film/:id", FilmController.delete);
router.post("/film", upload.single("foto_url"), FilmController.store);

router.get("/watchlist", WatchlistController.index);
router.post("/watchlist", WatchlistController.store);
router.delete("/watchlist/:id", WatchlistController.delete);

router.get("/history", HistoryController.index);
router.post("/history", HistoryController.store);
router.delete("/history/:id", HistoryController.delete);

router.get("/comments/:id", CommentController.getComments);
router.post("/comments", CommentController.addComment);

module.exports = router;
