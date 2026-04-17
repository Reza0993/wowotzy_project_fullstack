const validateWatchlist = (req, res, next) => {
    const { id_user, id_film } = req.body;
    const errors = [];

    // Validasi ID User
    if (!id_user) {
        errors.push("ID User wajib diisi.");
    } else if (isNaN(id_user)) {
        errors.push("ID User harus berupa angka.");
    }

    // Validasi ID Film
    if (!id_film) {
        errors.push("ID Film wajib diisi.");
    } else if (isNaN(id_film)) {
        errors.push("ID Film harus berupa angka.");
    }

    // Jika ada error
    if (errors.length > 0) {
        return res.status(400).json({
            status: "fail",
            message: "Validasi gagal",
            errors: errors
        });
    }

    next();
};

module.exports = validateWatchlist;