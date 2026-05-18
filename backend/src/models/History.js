const db = require("../config/database");
class History {
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM history";
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // ✅ Mengambil history spesifik milik satu user dan join dengan film
  static findByUser(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT h.id_history, h.id_user, h.id_film, h.waktu_nonton, 
               f.judul, f.deskripsi, f.video_url, f.foto_url
        FROM history h
        JOIN films f ON h.id_film = f.id_film
        WHERE h.id_user = ?`;
      db.query(sql, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO history (id_history, id_user, id_film) VALUES (?,?,?)";
      db.query(
        sql,
        [data.id_history, data.id_user, data.id_film],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        },
      );
    });
  }

  static delete(data) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM history WHERE id_history=?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = History;
