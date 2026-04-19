const errorHandler = (
  res,
  error,
  status = 500,
  message = "Terjadi kesalahan",
) => {
  console.log(error);

  return res.status(status).json({
    success: false,
    message: message,
    errors: error?.message || error,
  });
};

module.exports = errorHandler;
