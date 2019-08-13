import { Router } from 'express';
import {
  // getTasks,
  // getFilters,
  addNewTask,
  deleteTask,
  editTask,
  getUserFilters,
  getUserTasks,
  updateFilters,
} from '../controllers/apiControllers';

const router = Router();

// router.get('/tasks', getTasks);

router.get('/tasks/:userId', getUserTasks);

router.post('/task', addNewTask);

router.put('/task/:id', editTask);

router.delete('/task/:id', deleteTask);

// router.get('/filters', getFilters);

router.get('/filters/:userId', getUserFilters);

router.put('/filters/:userId', updateFilters);

export default router;
