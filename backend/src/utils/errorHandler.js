const errorHandler = (res, error, statusCode = 500, customMessage = null) => {
  if (Array.isArray(error)) {
    return res.status(statusCode).json({
      success: false,
      message: customMessage || "Validasi gagal",
      errors: error
    });
  }

  if (typeof error === "string") {
    return res.status(statusCode).json({
      success: false,
      message: error
    });
  }

  const message = error?.message || customMessage || "Terjadi kesalahan server";
  
  return res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = errorHandler;