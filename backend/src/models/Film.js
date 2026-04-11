const db = require('../config/database');

class Film {
  // Ambil semua film (Sesuai tugas Sprint: Test Query SELECT)
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM film";
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Tambah film baru (Untuk fitur CRUD)
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO film SET ?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Film;