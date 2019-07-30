import { Router } from 'express';

import {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
} from '../controllers/accountControllers';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/user', getUser);

router.post('/logout', logoutUser);

export default router;
