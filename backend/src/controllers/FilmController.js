const Film = require('../models/Film');

class FilmController {
  async index(req, res) {
    try {
      const films = await Film.all();
      res.status(200).json({
        message: "Menampilkan semua daftar film PopTube",
        data: films
      });
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil data", error: error.message });
    }
  }

  async store(req, res) {
    try {
      const film = await Film.create(req.body);
      res.status(201).json({
        message: "Film berhasil ditambahkan",
        data: film
      });
    } catch (error) {
      res.status(500).json({ message: "Gagal menambah data", error: error.message });
    }
  }

  // TAMBAHKAN FUNGSI UPDATE INI AGAR TIDAK ERROR
  async update(req, res) {
    try {
      const { id } = req.params;
      const film = await Film.update(id, req.body); // Pastikan di model Film ada fungsi update
      
      if (!film) {
        return res.status(404).json({ message: "Film tidak ditemukan" });
      }

      res.status(200).json({
        message: "Film berhasil diperbarui",
        data: film
      });
    } catch (error) {
      res.status(500).json({ message: "Gagal memperbarui data", error: error.message });
    }
  }
}

module.exports = new FilmController();