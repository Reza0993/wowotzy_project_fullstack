const Film = require("../models/Film");
const { validateWatchlist, validateFilm } = require("../utils/Validation");
const errorHandler = require("../utils/errorHandler");

class FilmController {
  async index(req, res) {
    try {
      const films = await Film.all();
      res.status(200).json({
        message: "Menampilkan semua daftar film PopTube",
        data: films,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Gagal mengambil data", error: error.message });
    }
  }
  //FUNGSI CREATE
  async store(req, res) {
    try {
      //VALIDASI
      const errors = await validateFilm(req.body);

      if (errors.length > 0) {
        return errorHandler(res, errors, 400, "Validasi gagal");
      }

      const film = await Film.create(req.body);

      res.status(201).json({
        success: true,
        message: "Film berhasil ditambahkan",
        data: film,
      });
    } catch (error) {
      // ✅ ERROR HANDLING TERPUSAT
      return errorHandler(res, error);
    }
  }

  //FUNGSI UPDATE
  async update(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        return errorHandler(res, "ID harus berupa angka", 400);
      }

      // VALIDASI
      const errors = validateFilm(req.body);
      if (errors.length > 0) {
        return errorHandler(res, errors, 400, "Validasi gagal");
      }
      // KIRIM id + data
      const result = await Film.update(id, req.body);

      if (result.affectedRows === 0) {
        return errorHandler(res, "Data tidak ditemukan", 404);
      }

      res.status(200).json({
        success: true,
        message: "Film berhasil diupdate",
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  //delete
  async delete(req, res) {
    try {
      const id = req.params.id;

      // Validasi sederhana
      if (isNaN(id)) {
        return errorHandler(res, "ID harus berupa angka", 400);
      }

      const result = await Film.delete(id);

      if (result.affectedRows === 0) {
        return errorHandler(res, "Data tidak ditemukan", 404);
      }

      res.status(200).json({
        success: true,
        message: "Film berhasil dihapus",
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}

module.exports = new FilmController();
