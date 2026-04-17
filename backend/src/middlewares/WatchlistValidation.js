const Joi = require('joi');

const validateWatchlist = (req, res, next) => {
    const schema = Joi.object({
        id_user: Joi.number().integer().required().messages({
            'any.required': 'ID User harus diisi',
            'number.base': 'ID User harus berupa angka'
        }),
        id_film: Joi.number().integer().required().messages({
            'any.required': 'ID Film harus diisi',
            'number.base': 'ID Film harus berupa angka'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "fail",
            message: "Validasi gagal",
            errors: error.details[0].message // Menampilkan pesan error pertama
        });
    }
    next();
};

module.exports = validateWatchlist;