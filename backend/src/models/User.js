const db = require("../config/database");

class User {
  // Ambil semua user
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT id_user, username, email, role FROM users";
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Ambil user berdasarkan ID
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT id_user, username, email, role FROM users WHERE id_user = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  // Ambil user berdasarkan email (untuk login & validasi)
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      db.query(sql, email, (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  // Tambah user baru
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO users SET ?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err);
        
        // Return user data without password
        const { password, ...userWithoutPassword } = data;
        resolve({
          id_user: results.insertId,
          ...userWithoutPassword
        });
      });
    });
  }

  // Update user
  static update(id, data) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE users SET ? WHERE id_user = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Delete user
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM users WHERE id_user = ?";
      db.query(sql, id, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Update role user (untuk admin)
  static updateRole(id, role) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE users SET role = ? WHERE id_user = ?";
      db.query(sql, [role, id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Method tambahan untuk login (tanpa bcrypt)
  static async login(email, password) {
    try {
      const user = await this.findByEmail(email);
      
      if (!user) {
        return null; // User tidak ditemukan
      }
      
      // Langsung compare password plain text
      if (user.password !== password) {
        return null; // Password salah
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
      
    } catch (error) {
      throw error;
    }
  }

  // Method untuk cek email exists
  static async emailExists(email) {
    try {
      const user = await this.findByEmail(email);
      return user !== null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;