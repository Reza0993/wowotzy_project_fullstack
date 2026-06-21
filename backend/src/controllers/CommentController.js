const Comment = require("../models/Comment");
const errorHandler = require("../utils/errorHandler");
const {
  validate,
  validateFilm,
  validateComment,
} = require("../utils/Validation");

class CommentController {
  async getComments(req, res) {
    const id_film = req.params.id;

    Comment.getByFilm(id_film, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(result);
    });
  }

  // ✅ Mengambil semua komentar untuk admin
  async getAllComments(req, res) {
    try {
      const result = await Comment.getAll();
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  // tambah komentar
  async addComment(req, res) {
    try {
      // ✅ Injeksi id_user secara aman dari token JWT sebelum validasi
      req.body.id_user = req.user.id;

      const errors = validateComment(req.body);

      if (errors.length > 0) {
        return errorHandler(res, errors, 400, "Validasi gagal");
      }

      const comment = await Comment.create(req.body);

      res.status(201).json({
        success: true,
        message: "Komentar berhasil ditambahkan!",
        data: comment,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async deleteComment(req, res) {
    try {
      const id = req.params.id;

      if (isNaN(id)) {
        return errorHandler(res, "ID harus berupa angka", 400);
      }

      const result = await Comment.delete(id);
      if (result.affectedRows === 0) {
        return errorHandler(res, "Data tidak ditemukan", 404);
      }
      res.status(200).json({
        success: true,
        message: "Komentar berhasil dihapus",
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}
// ambil komentar berdasarkan film

module.exports = new CommentController();
