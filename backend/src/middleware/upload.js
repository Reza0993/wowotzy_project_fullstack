const multer = require("multer");
const path = require("path");

// =======================
// CONFIG STORAGE
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },

  filename: (req, file, cb) => {
    // ambil ekstensi file
    const ext = path.extname(file.originalname);

    // buat nama unik (timestamp)
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;

    cb(null, uniqueName);
  },
});

// =======================
// VALIDASI FILE TYPE
// =======================
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Hanya file gambar (JPG, JPEG, PNG) yang diperbolehkan"),
      false,
    );
  }
};

// =======================
// LIMIT FILE SIZE
// =======================
const limits = {
  fileSize: 10 * 1024 * 1024, // 2MB
};

// =======================
// INIT MULTER
// =======================
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

module.exports = upload;
