import { Router } from 'express';
import {
  getTasks,
  getUserTasks,
  addNewTask,
  deleteTask,
  editTask,
  getFilters,
  updateFilters,
} from '../controllers/apiControllers';

const router = Router();

router.get('/tasks', getTasks);

router.get('/tasks/:userId', getUserTasks);

router.post('/task', addNewTask);

router.put('/task/:id', editTask);

router.delete('/task/:id', deleteTask);

router.get('/filters', getFilters);

router.put('/filters', updateFilters);

// router.get('/error', (req, res) => {
//   res.send('Error');
// });


export default router;
