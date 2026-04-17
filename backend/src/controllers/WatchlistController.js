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
      // Tambahkan .message agar errornya jelas
      res.status(500).json({ message: "Gagal mengambil data", error: error.message });
    }
  }

  async store(req, res) {
    try {
      // Validasi input manual tambahan (Optional jika middleware sudah ketat)
      const { id_user, id_film } = req.body;
      if (!id_user || !id_film) {
        return res.status(400).json({ message: "id_user dan id_film wajib diisi" });
      }

      const watchlist = await Watchlist.create(req.body);
      res.status(201).json({
        message: "Film berhasil ditambahkan ke watchlist",
        data: watchlist,
      });
    } catch (error) {
      res.status(500).json({ message: "Gagal menambah data", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const result = await Watchlist.delete(id);

      // Cek apakah ada baris yang terhapus
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Data watchlist tidak ditemukan",
        });
      }

      res.status(200).json({
        message: "Film berhasil dihapus dari watchlist",
      });
    } catch (error) {
      res.status(500).json({ message: "Gagal menghapus data", error: error.message });
    }
  }
}

module.exports = new WatchlistController();