import express from "express";
import passport from "passport";

import {
  DoctorRegiter,
  DeleteDoctor,
  toggleDisableDoctor,
  adminRegister,
  adminLogin,
  getAllDoctor,
} from "../controllers/Admin.controller.js";

const router = express.Router();

router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.post(
  "/doctor/register",
  passport.authenticate("jwt", { session: false }),
  DoctorRegiter
);
router.delete(
  "/doctor/delete/:id",
  passport.authenticate("jwt", { session: false }),
  DeleteDoctor
);
router.put(
  "/doctor/toggle/disable/:id",
  passport.authenticate("jwt", { session: false }),
  toggleDisableDoctor
);
router.get(
  "/doctor/all",
  passport.authenticate("jwt", { session: false }),
  getAllDoctor
);

export default router;
