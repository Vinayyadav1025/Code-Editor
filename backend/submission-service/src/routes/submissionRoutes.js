import express from 'express';
import { recordSubmission } from '../controllers/submissionController.js';

const router = express.Router();

router.post('/record', recordSubmission);

export default router;
