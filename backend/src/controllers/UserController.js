const User = require("../models/User");
const { validateUser } = require("../utils/Validation");
const errorHandler = require("../utils/errorHandler");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {

  async index(req, res) {
    try {

      const users = await User.all();

      res.status(200).json({
        success: true,
        message: "Menampilkan semua daftar user",
        data: users
      });

    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async show(req, res) {
    try {

      const id = req.params.id;

      if (isNaN(id)) {
        return errorHandler(res, "ID harus berupa angka", 400);
      }

      const user = await User.find(id);

      if (!user) {
        return errorHandler(res, "User tidak ditemukan", 404);
      }

      res.status(200).json({
        success: true,
        message: "Menampilkan detail user",
        data: user
      });

    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async store(req, res) {
    try {

      const errors = validateUser(req.body, false);

      if (errors.length > 0) {
        return errorHandler(res, errors, 400, "Validasi gagal");
      }

      const existingUser = await User.findByEmail(req.body.email);

      if (existingUser) {
        return errorHandler(res, "Email sudah terdaftar", 400);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const userData = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role || "user"
      };

      const user = await User.create(userData);

      res.status(201).json({
        success: true,
        message: "User berhasil ditambahkan",
        data: user
      });

    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async login(req, res) {
    try {

      const { email, password } = req.body;

      const user = await User.findByEmail(email);

      if (!user) {
        return errorHandler(res, "Email atau password salah", 401);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return errorHandler(res, "Email atau password salah", 401);
      }

      const token = jwt.sign(
        {
          id_user: user.id_user,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
      );

      res.status(200).json({
        success: true,
        message: "Login berhasil",
        token: token,
        user: {
          id_user: user.id_user,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });

    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async update(req, res) {
    try {

      const id = req.params.id;

      if (isNaN(id)) {
        return errorHandler(res, "ID harus berupa angka", 400);
      }

      const existingUser = await User.find(id);

      if (!existingUser) {
        return errorHandler(res, "User tidak ditemukan", 404);
      }

      const errors = validateUser(req.body, true);

      if (errors.length > 0) {
        return errorHandler(res, errors, 400, "Validasi gagal");
      }

      let updateData = {};

      if (req.body.username) updateData.username = req.body.username;
      if (req.body.email) updateData.email = req.body.email;
      if (req.body.role) updateData.role = req.body.role;

      if (req.body.password) {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        updateData.password = hashedPassword;
      }

      const result = await User.update(id, updateData);

      if (result.affectedRows === 0) {
        return errorHandler(res, "Gagal mengupdate user", 400);
      }

      const updatedUser = await User.find(id);

      res.status(200).json({
        success: true,
        message: "User berhasil diupdate",
        data: updatedUser
      });

    } catch (error) {
      return errorHandler(res, error);
    }
  }

  async delete(req, res) {
    try {

      const id = req.params.id;

      if (isNaN(id)) {
        return errorHandler(res, "ID harus berupa angka", 400);
      }

      const existingUser = await User.find(id);

      if (!existingUser) {
        return errorHandler(res, "User tidak ditemukan", 404);
      }

      const result = await User.delete(id);

      if (result.affectedRows === 0) {
        return errorHandler(res, "Gagal menghapus user", 400);
      }

      res.status(200).json({
        success: true,
        message: "User berhasil dihapus"
      });

    } catch (error) {
      return errorHandler(res, error);
    }
  }

}

module.exports = new UserController();