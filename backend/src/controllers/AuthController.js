const User = require("../models/User");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthController {
  // REGISTER
  async register(req, res) {
    try {
      const { username, email, password, role } = req.body;

      if (!username || !email || !password) {
        return errorHandler(
          res,
          "Username, email, dan password wajib diisi",
          400,
        );
      }

      if (username.length < 3) {
        return errorHandler(res, "Username minimal 3 karakter", 400);
      }

      if (password.length < 4) {
        return errorHandler(res, "Password minimal 4 karakter", 400);
      }

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return errorHandler(res, "Email sudah terdaftar", 400);
      }

      // ✅ Hash password secara aman menggunakan bcrypt sebelum disimpan
      const hashedPassword = await bcrypt.hash(password, 10);

      const userData = {
        username,
        email,
        password: hashedPassword,
        role: role || "user",
      };

      const newUser = await User.create(userData);

      res.status(201).json({
        success: true,
        message: "Registrasi berhasil! Silakan login.",
        data: newUser,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  // LOGIN
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return errorHandler(res, "Email dan password wajib diisi", 400);
      }

      const user = await User.findByEmail(email);

      // ✅ Cocokkan hash password menggunakan bcrypt, berikan fallback perbandingan langsung untuk kompatibilitas data bawaan DB
      let isMatch = false;
      try {
        isMatch = await bcrypt.compare(password, user.password);
      } catch (err) {
        console.error("Bcrypt compare error:", err);
      }

      if (!isMatch && user.password !== password) {
        return errorHandler(res, "Email atau password salah", 401);
      }

      //const { password: _, ...userWithoutPassword } = user;

      const token = jwt.sign(
        {
          id: user.id_user,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      res.status(200).json({
        success: true,
        message: "Login berhasil!",
        //data: userWithoutPassword,
        token: token,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  // GET PROFILE
  async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.find(userId);

      if (!user) {
        return errorHandler(res, "User tidak ditemukan", 404);
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  // LOGOUT
  async logout(req, res) {
    res.status(200).json({
      success: true,
      message: "Logout berhasil",
    });
  }
}

module.exports = new AuthController();
