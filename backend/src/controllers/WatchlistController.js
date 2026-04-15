const Watchlist = require("../models/Watchlist");

class WatchlistController {
  async index(req, res) {
    try {
      const watchlist = await Watchlist.all();
      res.status(200).json({
        message: "Menampilkan semua daftar watchlist film",
        data: watchlist,
      });
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil data", error });
    }
  }

  async store(req, res) {
    try {
      const watchlist = await Watchlist.create(req.body);
      res.status(201).json({
        message: "Film berhasil ditambahkan ke watchlist",
        data: watchlist,
      });
    } catch (error) {
      res.status(500).json({ message: "Gagal menambah data", error });
    }
  }
}

module.exports = new WatchlistController();
