import express from 'express';
import { executeCode, submitCode } from '../controllers/codeController.js';
import validateRequest from '../middleware/validateRequest.js'; // Import the middleware

const router = express.Router();

// Use the middleware to validate the request before the controller method
router.post('/execute', validateRequest, executeCode);
router.post('/submit', validateRequest, submitCode);

export default router;
