const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const db = require('./config/database'); // Memanggil koneksi database

app.use(express.json());
app.use('/api', apiRouter);

// Point Sprint: Memastikan backend berjalan dan terhubung
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`Server PopTube Jalan di port ${PORT}`);
    console.log(`Cek di: http://localhost:${PORT}`);
    console.log(`=================================`);
});