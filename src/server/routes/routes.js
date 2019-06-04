import { Router } from 'express';
import {
  getTasks,
  addNewTask,
  deleteTask,
  editTask,
  setFilters,
  getFilters,
  updateFilters,
  getInitialData,
} from '../controllers/controllers';

const router = Router();

router.get('/tasks', getTasks);

router.get('/getInitialData', getInitialData);

router.post('/newTask', addNewTask);

router.put('/editTask/:id', editTask);

router.delete('/deleteTask/:id', deleteTask);

router.post('/setFilters', setFilters);

router.put('/updateFilters', updateFilters);

router.get('/filters', getFilters);

router.get('/error', (req, res) => {
  res.send('Error');
});


export default router;
