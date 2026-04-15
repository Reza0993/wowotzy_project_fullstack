const db = require("../config/database");

class Watchlist {
  static all() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          w.id_watchlist,
          role.role,
          judul.judul,
          w.tanggal_tambah
        FROM watchlist w
        JOIN users role ON w.id_user = role.id_user
        JOIN films judul ON w.id_film = judul.id_film`;
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO watchlist (id_watchlist, id_user, id_film, tanggal_tambah) VALUES (?,?,?,?)";
      db.query(
        sql,
        [data.id_watchlist, data.id_user, data.id_film, data.tanggal_tambah],
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
