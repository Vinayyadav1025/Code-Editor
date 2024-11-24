import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  questionId: { type: String, required: true },
  status: { type: String, enum: ['Accepted', 'Wrong Answer', 'TLE', 'Runtime Error'], required: true },
  submissionTime: { type: Date, default: Date.now },
  code: { type: String, required: true },
  language: { type: String, required: true },
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
