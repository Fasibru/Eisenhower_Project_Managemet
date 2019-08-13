import { Router } from 'express';

import {
  deleteUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/accountControllers';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/user', getUser);

router.post('/logout', logoutUser);

router.delete('/user', deleteUser);

export default router;
