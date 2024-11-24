import mongoose from 'mongoose';

// Define the schema for questions
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],  // Array of options
    required: true,
  },
  correctAnswer: {
    type: String,  // Correct option
    required: true,
  },
}, { timestamps: true });

// Create a model from the schema
const Question = mongoose.model('Question', questionSchema);

export default Question;
