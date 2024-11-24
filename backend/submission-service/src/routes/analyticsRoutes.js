import express from 'express';
import { getUserPerformance } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/user/:userId', getUserPerformance);

export default router;
