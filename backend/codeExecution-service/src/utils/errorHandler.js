export const handleError = (error, res) => {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  };
  