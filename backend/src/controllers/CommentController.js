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

  // tambah komentar
  async addComment(req, res) {
    try {
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
}
// ambil komentar berdasarkan film

module.exports = new CommentController();
