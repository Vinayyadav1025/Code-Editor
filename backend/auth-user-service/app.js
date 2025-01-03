import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/connectDB.js'; // Ensure this is correctly pointing to the DB connection file
import authRoutes from './src/routes/authRoutes.js'; // Ensure this is correctly pointing to the route file
import userRoutes from './src/routes/userRoutes.js'; // Ensure this is correctly pointing to the route file
import cors from 'cors';

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
// Middleware for find complixity 
app.use(
  cors({
    origin: 'http://localhost:3000', // explicitly allow only frontend from localhost:3000
    credentials: true, // allow cookies and other credentials
  })
);

//Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
