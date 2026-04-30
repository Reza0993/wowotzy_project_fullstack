const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validate = (data) => {
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
  const { judul, deskripsi, video_url, foto_url, id_admin } = data;
  const errors = [];

  if (!judul) {
    errors.push("Judul film tidak boleh kosong.");
  } else if (judul.length < 3) {
    errors.push("Judul film minimal 3 karakter.");
  }

  if (!deskripsi) {
    errors.push("Deskripsi tidak boleh kosong.");
  } else if (deskripsi.length < 10) {
    errors.push("Deskripsi minimal 10 karakter.");
  }

  if (!video_url) {
    errors.push("Link video harus diisi.");
  }

  if (!foto_url) {
    errors.push("Link foto harus diisi.");
  }

  if (!id_admin) {
    errors.push("id_admin tidak boleh kosong");
  } else if (isNaN(id_admin)) {
    errors.push("id_admin harus berupa angka");
  }

  return errors;
};

const validateComment = (data) => {
  const { id_user, id_film, komentar } = data;
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

  if (!komentar) {
    errors.push("Komentar tidak boleh kosong.");
  } else if (komentar.length < 3) {
    errors.push("Komentar minimal 3 karakter.");
  }

  return errors;
};

const validateUser = (data, isUpdate = false) => {
  const { username, email, password, role } = data;
  const errors = [];

  if (!isUpdate || (isUpdate && username !== undefined)) {
    if (!username) {
      errors.push("Username wajib diisi.");
    } else if (username.length < 3) {
      errors.push("Username minimal 3 karakter.");
    } else if (username.length > 50) {
      errors.push("Username maksimal 50 karakter.");
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.push("Username hanya boleh berisi huruf, angka, dan underscore.");
    }
  }

  if (!isUpdate || (isUpdate && email !== undefined)) {
    if (!email) {
      errors.push("Email wajib diisi.");
    } else if (!isValidEmail(email)) {
      errors.push("Format email tidak valid.");
    } else if (email.length > 100) {
      errors.push("Email maksimal 100 karakter.");
    }
  }

  if (!isUpdate || (isUpdate && password !== undefined)) {
    if (!password && !isUpdate) {
      errors.push("Password wajib diisi.");
    } else if (password && password.length < 4) {
      errors.push("Password minimal 4 karakter.");
    } else if (password && password.length > 255) {
      errors.push("Password maksimal 255 karakter.");
    }
  }

  if (role !== undefined) {
    if (!["user", "admin"].includes(role)) {
      errors.push("Role hanya boleh 'user' atau 'admin'.");
    }
  }

  return errors;
};

const validateRegister = (data) => {
  const { username, email, password, role } = data;
  const errors = [];

  if (!username) {
    errors.push("Username wajib diisi.");
  } else if (username.length < 3) {
    errors.push("Username minimal 3 karakter.");
  } else if (username.length > 50) {
    errors.push("Username maksimal 50 karakter.");
  }

  if (!email) {
    errors.push("Email wajib diisi.");
  } else if (!isValidEmail(email)) {
    errors.push("Format email tidak valid.");
  } else if (email.length > 100) {
    errors.push("Email maksimal 100 karakter.");
  }

  if (!password) {
    errors.push("Password wajib diisi.");
  } else if (password.length < 4) {
    errors.push("Password minimal 4 karakter.");
  } else if (password.length > 255) {
    errors.push("Password maksimal 255 karakter.");
  }

  if (role && !["user", "admin"].includes(role)) {
    errors.push("Role hanya boleh 'user' atau 'admin'.");
  }

  return errors;
};

const validateLogin = (data) => {
  const { email, password } = data;
  const errors = [];

  if (!email) {
    errors.push("Email wajib diisi.");
  } else if (!isValidEmail(email)) {
    errors.push("Format email tidak valid.");
  }

  if (!password) {
    errors.push("Password wajib diisi.");
  } else if (password.length < 4) {
    errors.push("Password minimal 4 karakter.");
  }

  return errors;
};

const validateProfile = (data) => {
  const { username, email } = data;
  const errors = [];

  if (username !== undefined) {
    if (!username) {
      errors.push("Username tidak boleh kosong.");
    } else if (username.length < 3) {
      errors.push("Username minimal 3 karakter.");
    } else if (username.length > 50) {
      errors.push("Username maksimal 50 karakter.");
    }
  }

  if (email !== undefined) {
    if (!email) {
      errors.push("Email tidak boleh kosong.");
    } else if (!isValidEmail(email)) {
      errors.push("Format email tidak valid.");
    }
  }

  return errors;
};

const validateChangePassword = (data) => {
  const { old_password, new_password, confirm_password } = data;
  const errors = [];

  if (!old_password) {
    errors.push("Password lama wajib diisi.");
  }

  if (!new_password) {
    errors.push("Password baru wajib diisi.");
  } else if (new_password.length < 4) {
    errors.push("Password baru minimal 4 karakter.");
  }

  if (!confirm_password) {
    errors.push("Konfirmasi password wajib diisi.");
  } else if (new_password !== confirm_password) {
    errors.push("Konfirmasi password tidak sesuai.");
  }

  return errors;
};

module.exports = {
  validate,
  validateFilm,
  validateComment,
  validateUser,
  validateRegister,
  validateLogin,
  validateProfile,
  validateChangePassword
};