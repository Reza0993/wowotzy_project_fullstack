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
}

module.exports = History;