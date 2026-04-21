const History = require("../models/History");
//const { validateWatchlist, validateFilm } = require("../utils/Validation");
const errorHandler = require("../utils/errorHandler");
class HistoryController{
      async index(req, res) {
    try {
      const history = await History.all();
      res.status(200).json({
        message: "Menampilkan semua daftar film PopTube",
        data: history,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Gagal mengambil data", error: error.message });
    }
  }
}

module.exports= new HistoryController();