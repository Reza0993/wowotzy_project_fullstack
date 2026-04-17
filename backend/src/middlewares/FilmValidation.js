const validateFilm = (req, res, next) => {
    const { judul, deskripsi, genre, rating, tahun_rilis } = req.body;
    const errors = [];

    // Validasi Judul
    if (!judul) {
        errors.push("Judul film tidak boleh kosong.");
    } else if (judul.length < 3) {
        errors.push("Judul film minimal 3 karakter.");
    }

    // Validasi Deskripsi
    if (!deskripsi) {
        errors.push("Deskripsi tidak boleh kosong.");
    } else if (deskripsi.length < 10) {
        errors.push("Deskripsi minimal 10 karakter.");
    }

    // Validasi Genre
    if (!genre) {
        errors.push("Genre harus dipilih.");
    }

    // Validasi Rating (Jika ada input)
    if (rating && (isNaN(rating) || rating < 0 || rating > 10)) {
        errors.push("Rating harus berupa angka antara 0 sampai 10.");
    }

    // Jika ada error, kirim respon 400 sesuai tugas minggu ke-5
    if (errors.length > 0) {
        return res.status(400).json({
            status: "fail",
            message: "Validasi gagal",
            errors: errors
        });
    }

    next();
};

module.exports = validateFilm;