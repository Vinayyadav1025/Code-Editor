import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; // Correct the import to authController.js
import { protect } from '../middleware/authMiddleware.js';  // Import the protect middleware

const router = express.Router();

// Register user route
router.post('/register', registerUser);

// Login user route
router.post('/login', loginUser);

// Protected route example (you can create more routes as needed)
router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    message: 'This is a protected route',
    userId: req.user,
  });
});

export default router;
