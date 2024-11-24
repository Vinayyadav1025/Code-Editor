import UserProfile from '../models/userProfileModel.js';

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const userProfile = await UserProfile.findOne({ userId });
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found.' });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    const updatedProfile = await UserProfile.findOneAndUpdate({ userId }, updates, { new: true, upsert: true });
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user profile.' });
  }
};

// Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await UserProfile.find().sort({ solvedQuestions: -1 }).limit(10);
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard.' });
  }
};
