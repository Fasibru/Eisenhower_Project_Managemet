import { Router } from 'express';
import {
  addNewTask,
  deleteTask,
  editTask,
  setFilters,
  getFilters,
  updateFilters,
  getInitialData,
} from '../controllers/controllers';

const router = Router();

// router.get('/tasks', getInitialData);

router.get('/getInitialData', getInitialData);

router.post('/newTask', addNewTask);

router.put('/editTask/:id', editTask);

router.delete('/deleteTask/:id', deleteTask);

router.post('/setFilters', setFilters);

router.put('/updateFilters', updateFilters);

router.get('/getFilters', getFilters);


export default router;
