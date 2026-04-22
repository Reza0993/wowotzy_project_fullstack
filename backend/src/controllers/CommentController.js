const Comment = require("../models/Comment");

// ambil komentar berdasarkan film
const getComments = (req, res) => {
  const id_film = req.params.id;

  Comment.getByFilm(id_film, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(result);
  });
};

// tambah komentar
const addComment = (req, res) => {
  const data = {
    id_user: req.body.id_user,
    id_film: req.body.id_film,
    komentar: req.body.komentar
  };

  Comment.create(data, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Komentar berhasil ditambahkan!" });
  });
};

module.exports = {
  getComments,
  addComment
};