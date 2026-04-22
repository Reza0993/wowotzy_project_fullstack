const db = require("../config/database");

// ambil komentar berdasarkan film
const getByFilm = (id_film, callback) => {
  const sql = "SELECT * FROM comments WHERE id_film = ?";
  db.query(sql, [id_film], callback);
};

// tambah komentar
const create = (data, callback) => {
  const sql = `
    INSERT INTO comments (id_user, id_film, komentar)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [data.id_user, data.id_film, data.komentar], callback);
};

module.exports = {
  getByFilm,
  create
};