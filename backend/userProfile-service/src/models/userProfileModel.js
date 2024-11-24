import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  solvedQuestions: { type: Number, default: 0 },
  attemptedSubmissions: { type: Number, default: 0 },
  rankings: { type: Number, default: null },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
