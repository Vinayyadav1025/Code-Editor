import Submission from '../models/submissionModel.js';

// Get user performance
export const getUserPerformance = async (req, res) => {
  const { userId } = req.params;
  try {
    const submissions = await Submission.find({ userId });
    res.status(200).json({ userId, submissions });
  } catch (error) {
    res.status(400).json({ error: `Failed to retrieve user performance: ${error.message}` });
  }
};
