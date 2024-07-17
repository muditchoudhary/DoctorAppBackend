import express from 'express';

import {DeleteDoctor} from "../controllers/Remove.controller"

const router = express.Router();

router.delete('/dcotor/delete/:id',DeleteDoctor);
