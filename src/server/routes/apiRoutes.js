import { Router } from 'express';
import {
  getTasks,
  addNewTask,
  deleteTask,
  editTask,
  setFilters,
  getFilters,
  updateFilters,
} from '../controllers/apiControllers';

const router = Router();

router.get('/tasks', getTasks);

router.post('/task', addNewTask);

router.put('/task/:id', editTask);

router.delete('/task/:id', deleteTask);

router.post('/setFilters', setFilters);

router.get('/filters', getFilters);

router.put('/filters', updateFilters);

// router.get('/error', (req, res) => {
//   res.send('Error');
// });


export default router;
