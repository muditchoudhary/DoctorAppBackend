import express from 'express';

import {DisableDoctor} from '../controllers/Disable.controller' 

const router = express.Router();

router.put('doctor/disable/:id',DisableDoctor);