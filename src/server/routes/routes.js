import { Router } from 'express';
import {
  addNewTask,
  getFilteredTasks,
  deleteTask,
  editTask,
  setFilters,
  getFilters,
} from '../controllers/controllers';

const router = Router();

router.get('/tasks', getFilteredTasks);

router.post('/newTask', addNewTask);

router.put('/editTask/:id', editTask);

router.delete('/deleteTask/:id', deleteTask);

router.post('/setFilters', setFilters);

router.get('/getFilters', getFilters);

export default router;
