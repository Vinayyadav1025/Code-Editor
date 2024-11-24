import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import questionRoutes from './routes/questionRoutes.js';

dotenv.config(); // Load environment variables

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/questions', questionRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Question Service running on port ${PORT}`);
});
