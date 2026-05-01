const db = require("../config/database");

class Film {
  // Ambil semua film (Sesuai tugas Sprint: Test Query SELECT)
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films";
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Tambah film baru (Untuk fitur CRUD)
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO films SET ?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  //nambah update dan delete
  static update(id, data) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE films SET ? WHERE id_film = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static delete(data) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM films WHERE id_film=?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Film;
