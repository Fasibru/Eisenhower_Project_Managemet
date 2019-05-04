import { Router } from 'express';
import { addNewDummy, getDummies } from '../controllers/controllers';

const router = Router();

router.get('/dummy', getDummies);

router.post('/dummy', addNewDummy);

export default router;
