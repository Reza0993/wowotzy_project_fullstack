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

  static create(data) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO watchlist (id_watchlist, id_user, id_film) VALUES (?,?,?)";
      db.query(
        sql,
        [data.id_watchlist, data.id_user, data.id_film],
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
