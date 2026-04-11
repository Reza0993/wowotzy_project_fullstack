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
      res.status(500).json({ message: "Gagal mengambil data", error });
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
      res.status(500).json({ message: "Gagal menambah data", error });
    }
  }
}

module.exports = new FilmController();