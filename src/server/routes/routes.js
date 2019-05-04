import { Router } from 'express';
import { addNewTask, getTasks } from '../controllers/controllers';

const router = Router();

router.get('/tasks', getTasks);

router.post('/task', addNewTask);

export default router;
