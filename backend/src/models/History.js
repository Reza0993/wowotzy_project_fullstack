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
        WHERE h.id_user = ?
        ORDER BY h.waktu_nonton DESC`;
      db.query(sql, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      // Cek apakah history sudah ada sebelumnya
      const checkSql = "SELECT id_history FROM history WHERE id_user = ? AND id_film = ?";
      db.query(checkSql, [data.id_user, data.id_film], (err, results) => {
        if (err) return reject(err);

        if (results.length > 0) {
          // Jika sudah ada, perbarui waktu tonton
          const updateSql = "UPDATE history SET waktu_nonton = CURRENT_TIMESTAMP WHERE id_history = ?";
          db.query(updateSql, [results[0].id_history], (err, updateResults) => {
            if (err) return reject(err);
            resolve(updateResults);
          });
        } else {
          // Jika belum ada, buat history baru
          const insertSql = "INSERT INTO history (id_user, id_film) VALUES (?,?)";
          db.query(insertSql, [data.id_user, data.id_film], (err, insertResults) => {
            if (err) return reject(err);
            resolve(insertResults);
          });
        }
      });
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
