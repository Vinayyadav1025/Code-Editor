import Question from '../models/questionModel.js';  // Import the Question model

// Add a new question
export const addQuestion = async (req, res) => {
  const { questionText, options, correctAnswer } = req.body;

  if (!questionText || !options || !correctAnswer) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const question = new Question({
      questionText,
      options,
      correctAnswer,
    });

    await question.save();
    res.status(201).json({ message: 'Question added successfully', question });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single question by ID
export const getQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
