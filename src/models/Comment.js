const db = require("../config/database");

class Comment {

  // ambil komentar berdasarkan film
  static getByFilm(id_film) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM comments WHERE id_film = ?";

      db.query(sql, [id_film], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // tambah komentar
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO comments (id_user, id_film, komentar)
        VALUES (?, ?, ?)
      `;

      db.query(
        sql,
        [data.id_user, data.id_film, data.komentar],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}

module.exports = Comment;