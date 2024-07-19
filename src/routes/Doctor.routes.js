import express from "express";
import passport from "passport";

import {
  login,
  getAppointments,
  deleteAppointment,
  updateAppointment,
  updatePrescription,
} from "../controllers/Doctor.controller.js";

const router = express.Router();

router.post("/login", login);

router.get(
  "/appointments/",
  passport.authenticate("jwt", { session: false }),
  getAppointments
);

router.delete(
  "/appointment",
  passport.authenticate("jwt", { session: false }),
  deleteAppointment
);
router.put(
  "/appointment/edit",
  passport.authenticate("jwt", { session: false }),
  updateAppointment
);
router.put(
  "/appointment/prescription",
  passport.authenticate("jwt", { session: false }),
  updatePrescription
);

export default router;
