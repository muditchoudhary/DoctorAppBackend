import express from 'express';

import { UserRegister } from '../controllers/Auth.controller';
import { DoctorRegiter } from '../controllers/Auth.controller';

const router = express.Router();

router.post('/UserRegister', UserRegister );
router.post('/DoctorRegister', DoctorRegiter);

export default router;
