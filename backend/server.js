const app = require("./src/app");

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`Server PopTube Jalan di port ${PORT}`);
  console.log(`Cek di: http://localhost:${PORT}`);
  console.log(`=================================`);
});
