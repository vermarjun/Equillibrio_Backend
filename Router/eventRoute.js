import express from 'express'; 
import { fetchEvents, AddNewEvents } from '../controllers/eventController.js';

const router = express.Router();  

router.post('/', AddNewEvents);

router.get('/', fetchEvents);

export default router;