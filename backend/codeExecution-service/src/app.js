import express from 'express';
import { handleError } from './utils/errorHandler.js';
import codeRoutes from './routes/codeRoutes.js';

const app = express();
const PORT = process.env.PORT || 5003;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/code', codeRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
