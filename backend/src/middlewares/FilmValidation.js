const Joi = require('joi');

const validateFilm = (req, res, next) => {
    const schema = Joi.object({
        judul: Joi.string().min(3).required(),
        deskripsi: Joi.string().min(10).required(),
        genre: Joi.string().required(),
        rating: Joi.number().min(0).max(10).precision(1),
        tahun_rilis: Joi.number().integer().min(1900).max(new Date().getFullYear())
    });

    const { error } = schema.validate(req.body);
    if (error) {
        // Mengembalikan response error yang jelas sesuai instruksi tugas
        return res.status(400).json({
            status: "fail",
            message: "Validasi gagal",
            errors: error.details.map(err => err.message)
        });
    }
    next();
};

module.exports = validateFilm;