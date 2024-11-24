import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,  // Ensure unique email
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,  // Optional: createdAt and updatedAt fields
  }
);

// Create a model from the schema
const User = mongoose.model('User', userSchema);

export default User;
