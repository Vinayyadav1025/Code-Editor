import express from 'express';

// Middleware function to validate the request data
const validateRequest = (req, res, next) => {
    const { code, language } = req.body;
    
    // Check if 'code' and 'language' are present, and 'language' is either 'python' or 'javascript'
    if (!code || !['python', 'javascript'].includes(language)) {
        return res.status(400).json({ error: 'Invalid request data.' });
    }
    // If valid, pass control to the next middleware or route handler
    next();
};

export default validateRequest;
