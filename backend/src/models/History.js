const db = require("../config/database");
class History{
    static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM history";
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

    static create(data) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO history (id_history, id_user, id_film, waktu_nonton) VALUES (?,?,?,?)";
      db.query(
        sql,
        [data.id_history, data.id_user, data.id_film, data.waktul_nonton],
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