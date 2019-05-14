import { Router } from 'express';
import {
  addNewTask,
  getTasks,
  deleteTask,
  editTask,
} from '../controllers/controllers';

const router = Router();

router.get('/tasks', getTasks);

router.post('/newTask', addNewTask);

router.put('/editTask/:id', editTask);

router.delete('/task/:id', deleteTask);

export default router;
