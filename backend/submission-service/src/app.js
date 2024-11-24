import express from 'express';
import bodyParser from 'body-parser';
import submissionRoutes from './routes/submissionRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { handleError } from './utils/errorHandler.js';
import connectToDatabase from './utils/database.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Database Connection
connectToDatabase();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/submissions', submissionRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Start Server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
