import express from 'express'; 
import { fetchEvents, AddNewEvents, deleteEvents, updateEvents} from '../controllers/eventController.js';

const router = express.Router();  

router.post('/add', AddNewEvents);

router.get('/', fetchEvents);

router.delete('/delete', deleteEvents);

router.post('/update', updateEvents);

export default router;