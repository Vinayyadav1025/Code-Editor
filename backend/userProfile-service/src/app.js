import express from 'express';
import bodyParser from 'body-parser';
import userProfileRoutes from './routes/userProfileRoutes.js';
import { handleError } from './utils/errorHandler.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/user-profile', userProfileRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

export default app;
