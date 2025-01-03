import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    collegeName: {
        type: String,
    },
    course: {
        type: String,
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
