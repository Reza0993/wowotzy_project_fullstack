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

  async delete(req, res) {
    try {
      const id = req.params.id;
      const watchlist = await Watchlist.delete(id);
      if (watchlist.affectedRows === 0) {
        return res.status(404).json({
          message: "Film tidak berhasil ditemukan",
        });
      }

      res.json({
        message: "Film berhasil dihapus ke watchlist",
      });
    } catch (error) {
      res.status(500).json({ message: "Gagal menghapus data", error });
    }
  }
}

module.exports = new WatchlistController();
