export const handleError = (err, res) => {
    const { statusCode = 500, message } = err;
    res.status(statusCode).json({
      error: message || 'Internal Server Error',
    });
  };
  