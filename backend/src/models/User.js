const db = require("../config/database");

class User {
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT id_user, username, email, role FROM users";
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT id_user, username, email, role FROM users WHERE id_user = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      db.query(sql, email, (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO users SET ?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err);
        
        const { password, ...userWithoutPassword } = data;
        resolve({
          id_user: results.insertId,
          ...userWithoutPassword
        });
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE users SET ? WHERE id_user = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM users WHERE id_user = ?";
      db.query(sql, id, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static updateRole(id, role) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE users SET role = ? WHERE id_user = ?";
      db.query(sql, [role, id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = User;