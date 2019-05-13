import { Router } from 'express';
import { addNewTask, getTasks, deleteTask } from '../controllers/controllers';

const router = Router();

router.get('/tasks', getTasks);

router.post('/task', addNewTask);

router.delete('/task/:id', deleteTask);

export default router;
