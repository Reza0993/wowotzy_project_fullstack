const History = require("../models/History");
//const { validateWatchlist, validateFilm } = require("../utils/Validation");
const errorHandler = require("../utils/errorHandler");
class HistoryController{
      async index(req, res) {
    try {
      const history = await History.all();
      res.status(200).json({
        message: "Menampilkan semua daftar film PopTube",
        data: history,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Gagal mengambil data", error: error.message });
    }
  }

  async store(req, res) {
    try {
      //VALIDASI
      const errors = validateHistory(req.body);

      if (errors.length > 0) {
        return errorHandler(res, errors, 400, "Validasi gagal");
      }

      const film = await Film.create(req.body);

      res.status(201).json({
        success: true,
        message: "Film telah ditonton",
        data: film,
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

      const result = await History.delete(id);

      if (result.affectedRows === 0) {
        return errorHandler(res, "Data tidak ditemukan", 404);
      }

      res.status(200).json({
        success: true,
        message: "Film berhasil dihapus dari history",
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}

module.exports= new HistoryController();