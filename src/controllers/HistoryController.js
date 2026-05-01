const History = require("../models/History");
const errorHandler = require("../utils/errorHandler");
const { validate } = require("../utils/Validation");

class HistoryController {

  // MENAMPILKAN SEMUA HISTORY
  async index(req, res) {
    try {
      const history = await History.all();

      res.status(200).json({
        success: true,
        message: "Menampilkan semua daftar history film PopTube",
        data: history,
      });

    } catch (error) {
      return errorHandler(res, error);
    }
  }

  // MENAMBAHKAN HISTORY (FILM DITONTON)
  async store(req, res) {
    try {

      // VALIDASI
      const errors = validate(req.body);

      if (errors.length > 0) {
        return errorHandler(res, errors, 400, "Validasi gagal");
      }

      const result = await History.create(req.body);

      res.status(201).json({
        success: true,
        message: "Film telah ditonton",
        data: {
          id_history: result.insertId,
          ...req.body
        }
      });

    } catch (error) {
      return errorHandler(res, error);
    }
  }

  // MENGHAPUS HISTORY
  async delete(req, res) {
    try {

      const id = req.params.id;

      if (isNaN(id)) {
        return errorHandler(res, "ID harus berupa angka", 400);
      }

      const result = await History.delete(id);

      if (result.affectedRows === 0) {
        return errorHandler(res, "Data history tidak ditemukan", 404);
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

module.exports = new HistoryController();