import express from 'express';
import { addQuestion, getAllQuestions, getQuestionById } from '../controllers/questionController.js';

const router = express.Router();

// Route to add a new question
router.post('/', addQuestion);

// Route to get all questions
router.get('/', getAllQuestions);

// Route to get a question by ID
router.get('/:id', getQuestionById);

export default router;
