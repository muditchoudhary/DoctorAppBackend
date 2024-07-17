import express from "express";
import passport from "passport";

import {
  register,
  login,
  createNewAppointment,
  viewPrescription,
} from "../controllers/User.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post(
  "/appointment/new",
  passport.authenticate("jwt", { session: false }),
  createNewAppointment
);
router.get(
  "/prescriptions",
  passport.authenticate("jwt", { session: false }),
  viewPrescription
);

export default router;
