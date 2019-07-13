import { Router } from 'express';

import { registerUser } from '../controllers/accountControllers';

const router = Router();

router.post('/register', registerUser);

export default router;
