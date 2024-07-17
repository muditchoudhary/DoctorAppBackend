import express from "express";

import {
  DoctorRegiter,
  DeleteDoctor,
  toggleDisableDoctor,
} from "../controllers/Admin.controller.js";

const router = express.Router();

router.post("/doctor/register", DoctorRegiter);
router.delete("/doctor/delete/:id", DeleteDoctor);
router.put("/doctor/toggle/disable/:id", toggleDisableDoctor);

export default router;
