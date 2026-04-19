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

module.exports = validateWatchlist;
