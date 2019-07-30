import { Router } from 'express';

import {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  deleteUser,
} from '../controllers/accountControllers';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/user', getUser);

router.post('/logout', logoutUser);

router.delete('/user/:userId', deleteUser);

export default router;
