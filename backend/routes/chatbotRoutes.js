import express from 'express';
import { handleChatbot } from '../controllers/chatbotController.js';

const router = express.Router();

router.post('/', handleChatbot);

export default router;
