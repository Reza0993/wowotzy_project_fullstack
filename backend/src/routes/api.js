const express = require('express');
const router = express.Router();
const FilmController = require('../controllers/FilmController');

// Ubah '/' menjadi '/films'
router.get('/films', FilmController.index); 

module.exports = router;