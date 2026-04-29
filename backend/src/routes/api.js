const express = require("express");
const router = express.Router();

const FilmController = require("../controllers/FilmController");
const WatchlistController = require("../controllers/WatchlistController");
const HistoryController = require("../controllers/HistoryController");
const CommentController = require("../controllers/CommentController");
const UserController = require("../controllers/UserController");

const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");

/**
USER
*/

router.post("/login", UserController.login);

router.get("/user", auth, authorize("admin"), UserController.index);
router.get("/user/:id", auth, UserController.show);
router.post("/user", UserController.store);
router.put("/user/:id", auth, UserController.update);
router.delete("/user/:id", UserController.delete);
/**router.delete("/user/:id", auth, authorize("admin"), UserController.delete);

/**
FILM
*/

router.get("/film", FilmController.index);
router.post("/film", auth, authorize("admin"), FilmController.store);
router.put("/film/:id", auth, authorize("admin"), FilmController.update);
router.delete("/film/:id", auth, authorize("admin"), FilmController.delete);

/**
WATCHLIST
*/

router.get("/watchlist", auth, WatchlistController.index);
router.post("/watchlist", auth, WatchlistController.store);
router.delete("/watchlist/:id", auth, WatchlistController.delete);

/**
HISTORY
*/

router.get("/history", auth, HistoryController.index);
router.post("/history", auth, HistoryController.store);
router.delete("/history/:id", auth, HistoryController.delete);

/**
COMMENTS
*/

router.get("/comments/:id", CommentController.getComments);
router.post("/comments", auth, CommentController.addComment);

module.exports = router;