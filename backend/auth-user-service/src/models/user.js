import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    otp: {
        type: String,
    },
    otpExpiration: {
        type: Date,
    },
    resetToken: {
        type: String,
    },
    resetTokenExpire: {
        type: Date,
    },
    solvedQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
