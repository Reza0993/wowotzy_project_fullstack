const Watchlist = require("../models/Watchlist");
const { validateWatchlist, validateFilm } = require("../utils/Validation");
const errorHandler = require("../utils/errorHandler");

class WatchlistController {
  async index(req, res) {
    try {
      const watchlist = await Watchlist.all();

      res.status(200).json({
        success: true,
        message: "Menampilkan semua daftar watchlist film",
        data: watchlist,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async store(req, res) {
    try {
      // ✅ VALIDASI (sesuai materi: sebelum proses)
      const errors = validateWatchlist(req.body);

      if (errors.length > 0) {
        return errorHandler(res, errors, 400, "Validasi gagal");
      }

      const watchlist = await Watchlist.create(req.body);

      res.status(201).json({
        success: true,
        message: "Film berhasil ditambahkan ke watchlist",
        data: watchlist,
      });
    } catch (error) {
      // ✅ ERROR HANDLING TERPUSAT
      return errorHandler(res, error);
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      // Validasi sederhana
      if (isNaN(id)) {
        return errorHandler(res, "ID harus berupa angka", 400);
      }

      const result = await Watchlist.delete(id);

      if (result.affectedRows === 0) {
        return errorHandler(res, "Data tidak ditemukan", 404);
      }

      res.status(200).json({
        success: true,
        message: "Film berhasil dihapus dari watchlist",
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}

module.exports = new WatchlistController();
