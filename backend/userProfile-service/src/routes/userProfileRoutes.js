import express from 'express';
import { getUserProfile, updateUserProfile, getLeaderboard } from '../controllers/userProfileController.js';

const router = express.Router();

router.get('/:userId', getUserProfile);
router.put('/:userId', updateUserProfile);
router.get('/leaderboard', getLeaderboard);

export default router;
