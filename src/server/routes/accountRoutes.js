import { Router } from 'express';

import {
  registerUser,
  loginUser,
  getUserId,
  logoutUser,
} from '../controllers/accountControllers';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/login', getUserId);

router.post('/logout', logoutUser);

export default router;
