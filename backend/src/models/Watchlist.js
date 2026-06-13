const db = require("../config/database");

class Watchlist {
  static all() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM watchlist`;
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // ✅ Mengambil watchlist spesifik milik satu user dan join dengan film
  static findByUser(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT w.id_watchlist, w.id_user, w.id_film, w.tanggal_tambah, 
               f.judul, f.deskripsi, f.video_url, f.foto_url
        FROM watchlist w
        JOIN films f ON w.id_film = f.id_film
        WHERE w.id_user = ?`;
      db.query(sql, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO watchlist (id_user, id_film) VALUES (?,?)";
      db.query(
        sql,
        [data.id_user, data.id_film],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        },
      );
    });
  }

  static delete(data) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM watchlist WHERE id_watchlist=?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Watchlist;
