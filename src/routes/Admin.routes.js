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
router.post("/doctor/register", DoctorRegiter);
router.delete("/doctor/delete/:id", DeleteDoctor);
router.put("/doctor/toggle/disable/:id", toggleDisableDoctor);
router.get(
  "/doctor/all",
  passport.authenticate("jwt", { session: false }),
  getAllDoctor
);

export default router;
