import { Router } from 'express';
import {
  getTasks,
  addNewTask,
  deleteTask,
  editTask,
  setFilters,
  getFilters,
  updateFiltersOLD,
  updateFilters,
  getInitialData,
} from '../controllers/controllers';

const router = Router();

router.get('/tasks', getTasks);

router.get('/getInitialData', getInitialData); // deprecated

router.post('/newTask', addNewTask); // deprecated

router.post('/task', addNewTask);

router.put('/editTask/:id', editTask);

router.delete('/deleteTask/:id', deleteTask); // deprecated

router.delete('/task/:id', deleteTask);

router.post('/setFilters', setFilters);

router.put('/updateFilters', updateFiltersOLD); // deprecated

router.get('/filters', getFilters);

router.put('/filters', updateFilters);

router.get('/error', (req, res) => {
  res.send('Error');
});


export default router;
