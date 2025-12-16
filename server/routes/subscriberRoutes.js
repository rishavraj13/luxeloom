import express from 'express';
import { addSubscriber, listSubscribers, removeSubscriber } from '../controllers/subscriberController.js';
import adminAuth from '../middleware/adminAuth.js';

const subscriberRouter = express.Router();

subscriberRouter.post('/add', addSubscriber);
subscriberRouter.post('/remove', adminAuth, removeSubscriber);
subscriberRouter.get('/list', adminAuth, listSubscribers);

export default subscriberRouter;