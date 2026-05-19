const Film = require("../models/Film");
const { validateWatchlist, validateFilm } = require("../utils/Validation");
const errorHandler = require("../utils/errorHandler");

class FilmController {
  // GET ALL
  async index(req, res) {
    try {
      const films = await Film.all();
      res.status(200).json({
        message: "Menampilkan semua daftar film PopTube",
        data: films,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengambil data",
        error: error.message,
      });
    }
  }


  // GET DETAIL FILM
async show(req, res) {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      return errorHandler(res, "ID harus berupa angka", 400);
    }

    const film = await Film.find(id);

    if (!film) {
      return errorHandler(res, "Film tidak ditemukan", 404);
    }

    res.status(200).json({
      success: true,
      data: film,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
}


  // CREATE + UPLOAD FILE
  async store(req, res) {
    try {
      // VALIDASI BODY
      const errors = await validateFilm(req.body, req.file);

      if (errors.length > 0) {
        return errorHandler(res, errors, 400, "Validasi gagal");
      }

      // ✅ AMBIL FILE DARI MULTER
      let image = null;
      if (req.file) {
        image = req.file.filename;
      }

      // ✅ GABUNG DATA
      const data = {
        ...req.body,
        foto_url: image,
      };

      const film = await Film.create(data);

      res.status(201).json({
        success: true,
        message: "Film berhasil ditambahkan",
        data: film,
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  // UPDATE + OPSIONAL UPDATE FILE
  async update(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        return errorHandler(res, "ID harus berupa angka", 400);
      }

      // VALIDASI
      const errors = validateFilm(req.body, req.file, true);
      if (errors.length > 0) {
        return errorHandler(res, errors, 400, "Validasi gagal");
      }

      // ✅ HANDLE FILE BARU (JIKA ADA)
      let image = req.body.foto_url;

      if (req.file) {
        image = req.file.filename;
      }

      const data = {
        ...req.body,
        foto_url: image,
      };

      // Hapus properti 'image' agar tidak bentrok dengan kolom database
      delete data.image;

      const result = await Film.update(id, data);

      if (result.affectedRows === 0) {
        return errorHandler(res, "Data tidak ditemukan", 404);
      }

      res.status(200).json({
        success: true,
        message: "Film berhasil diupdate",
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      const id = req.params.id;

      if (isNaN(id)) {
        return errorHandler(res, "ID harus berupa angka", 400);
      }

      const result = await Film.delete(id);

      if (result.affectedRows === 0) {
        return errorHandler(res, "Data tidak ditemukan", 404);
      }

      res.status(200).json({
        success: true,
        message: "Film berhasil dihapus",
      });
    } catch (error) {
      return errorHandler(res, error);
    }
  }
}

module.exports = new FilmController();
