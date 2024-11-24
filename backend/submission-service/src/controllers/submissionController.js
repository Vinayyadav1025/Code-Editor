import Submission from '../models/submissionModel.js';

// Record a submission
export const recordSubmission = async (req, res) => {
  const { userId, questionId, status, code, language } = req.body;
  try {
    const submission = await Submission.create({
      userId,
      questionId,
      status,
      code,
      language,
    });
    res.status(201).json({ message: 'Submission recorded.', submission });
  } catch (error) {
    res.status(400).json({ error: `Failed to record submission: ${error.message}` });
  }
};
