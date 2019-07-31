import { Router } from 'express';
import {
  // getTasks,
  getUserTasks,
  addNewTask,
  deleteTask,
  editTask,
  // getFilters,
  getUserFilters,
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

// router.put('/filters', updateFilters);

router.put('/filters/:userId', updateFilters);

// router.get('/error', (req, res) => {
//   res.send('Error');
// });


export default router;
