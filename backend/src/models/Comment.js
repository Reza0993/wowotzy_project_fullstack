const db = require("../config/database");

class Comment {
  // ✅ Mengambil komentar berdasarkan film (Mendukung Promise & Callback)
  static getByFilm(id_film, callback) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT c.*, u.username 
        FROM comments c 
        JOIN users u ON c.id_user = u.id_user 
        WHERE c.id_film = ? 
        ORDER BY c.tanggal DESC`;
      db.query(sql, [id_film], (err, results) => {
        if (err) {
          if (callback) callback(err, null);
          return reject(err);
        }
        if (callback) callback(null, results);
        resolve(results);
      });
    });
  }

  // ✅ Menambah komentar baru (Mendukung Promise & Callback)
  static create(data, callback) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO comments (id_user, id_film, komentar)
        VALUES (?, ?, ?)`;
      db.query(
        sql,
        [data.id_user, data.id_film, data.komentar],
        (err, results) => {
          if (err) {
            if (callback) callback(err, null);
            return reject(err);
          }
          const createdComment = {
            id_comment: results.insertId,
            id_user: data.id_user,
            id_film: data.id_film,
            komentar: data.komentar,
            tanggal: new Date(),
          };
          if (callback) callback(null, createdComment);
          resolve(createdComment);
        },
      );
    });
  }

  static delete(data, callback) {
    return new Promise((resolve, reject) => {
      const sql = " DELETE FROM comments WHERE id_comment=?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // ✅ Mengambil semua komentar untuk admin (Mendukung Promise & Callback)
  static getAll(callback) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT c.*, u.username, f.judul as judul_film
        FROM comments c 
        JOIN users u ON c.id_user = u.id_user 
        JOIN films f ON c.id_film = f.id_film
        ORDER BY c.tanggal DESC`;
      db.query(sql, (err, results) => {
        if (err) {
          if (callback) callback(err, null);
          return reject(err);
        }
        if (callback) callback(null, results);
        resolve(results);
      });
    });
  }
}

module.exports = Comment;
