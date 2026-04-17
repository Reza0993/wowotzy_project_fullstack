const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'poptube_db'
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi Database Gagal: ' + err.message);
        return;
    }
    console.log('HASIL: Database PopTube Berhasil Terhubung!');
});

module.exports = db;