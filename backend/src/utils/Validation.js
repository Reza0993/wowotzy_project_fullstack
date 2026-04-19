const validateWatchlist = (data) => {
  const { id_user, id_film } = data;
  const errors = [];

  if (!id_user) {
    errors.push("ID User wajib diisi.");
  } else if (isNaN(id_user)) {
    errors.push("ID User harus berupa angka.");
  }

  if (!id_film) {
    errors.push("ID Film wajib diisi.");
  } else if (isNaN(id_film)) {
    errors.push("ID Film harus berupa angka.");
  }

  return errors;
};

const validateFilm = (data) => {
  const { judul, deskripsi, video_url, id_admin } = data;
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

  // Validasi video_url
  if (!video_url) {
    errors.push("Link video harus diisi.");
  }

  // Validasi Rating (Jika ada input)
  if (!id_admin) {
    errors.push("id_admin tidak boleh kosong");
  } //else if (user.role !== "admin") {
  // errors.push("role id_admin harus admin ");
  //}

  // itu yang else if harus nunggu model user dl

  return errors;
};

module.exports = { validateWatchlist, validateFilm };
