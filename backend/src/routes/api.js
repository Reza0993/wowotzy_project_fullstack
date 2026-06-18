const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/auth"); // ✅ Impor Auth Middleware

const FilmController = require("../controllers/FilmController");
const WatchlistController = require("../controllers/WatchlistController");
const HistoryController = require("../controllers/HistoryController");
const CommentController = require("../controllers/CommentController");
const UserController = require("../controllers/UserController");
const StatsController = require("../controllers/StatsController");

router.get("/users", UserController.index);
router.get("/users/:id", UserController.show);
router.post("/users", UserController.store);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

router.get("/film", FilmController.index);
//router.post("/film", FilmController.store);
router.get("/film/:id", FilmController.show);
router.put(
  "/film/:id",
  authMiddleware,
  upload.single("foto_url"),
  FilmController.update,
);
router.delete("/film/:id", authMiddleware, FilmController.delete);
router.post(
  "/film",
  authMiddleware,
  upload.single("foto_url"),
  FilmController.store,
);

// ✅ Rute Watchlist yang Dilindungi JWT
router.get("/watchlist", authMiddleware, WatchlistController.index);
router.post("/watchlist", authMiddleware, WatchlistController.store);
router.delete("/watchlist/:id", authMiddleware, WatchlistController.delete);

// ✅ Rute History yang Dilindungi JWT
router.get("/history", authMiddleware, HistoryController.index);
router.post("/history", authMiddleware, HistoryController.store);
router.delete("/history/:id", authMiddleware, HistoryController.delete);

// ✅ Rute Komentar (Melihat bersifat publik, Mengirim dilindungi JWT)
router.get("/comments/:id", CommentController.getComments);
router.post("/comments", authMiddleware, CommentController.addComment);

// di bagian atas: const StatsController = require("../controllers/StatsController");
router.get("/stats", authMiddleware, StatsController.index);
router.get("/activities", authMiddleware, StatsController.activities);

module.exports = router;
