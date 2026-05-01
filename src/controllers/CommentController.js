const Comment = require("../models/Comment");
const errorHandler = require("../utils/errorHandler");
const { validateComment } = require("../utils/Validation");

class CommentController {
  // ambil komentar berdasarkan film
  async getComments(req, res) {
  try {
    const id_film = req.params.id;

    const comments = await Comment.getByFilm(id_film);

    res.status(200).json({
      success: true,
      message: "Menampilkan komentar film",
      data: comments
    });

  } catch (error) {
    return errorHandler(res, error);
  }
}
  // tambah komentar
  async addComment(req, res) {
    try {
      const errors = validateComment(req.body);

      if (errors.length > 0) {
        return errorHandler(res, errors, 400, "Validasi gagal");
      }

      const result = await Comment.create(req.body);

      res.status(201).json({
        success: true,
        message: "Komentar berhasil ditambahkan!",
        data: {
          id_comment: result.insertId,
          ...req.body
        }
      });

    } catch (error) {
      return errorHandler(res, error);
    }
  }
}

module.exports = new CommentController();