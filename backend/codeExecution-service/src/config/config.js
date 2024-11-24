import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT || 5003,
    TIMEOUT: parseInt(process.env.TIMEOUT) || 5000,
    SUPPORTED_LANGUAGES: ['javascript', 'python', 'cpp', 'c'], // Add more languages as needed
};
