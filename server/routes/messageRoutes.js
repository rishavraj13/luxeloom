import express from 'express';
import { addMessage, generateReply, listMessages, removeMessages } from '../controllers/messageController.js';
import adminAuth from '../middleware/adminAuth.js';

const messageRouter = express.Router();

messageRouter.post('/send', addMessage);
messageRouter.get('/list', adminAuth, listMessages)
messageRouter.post('/remove', adminAuth, removeMessages)
messageRouter.post('/reply', adminAuth, generateReply)


export default messageRouter;