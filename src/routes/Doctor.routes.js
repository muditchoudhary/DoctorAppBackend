import express from "express";
import passport from "passport";

import { login } from "../controllers/Doctor.controller.js";

const router = express.Router();

router.post("/login", login);

router.get(
  "/appointments/:docId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("my logic working");
  }
);
// router.get("/appointment/:apptId", getAppointment);

// router.delete("/appointment/:apptId", deleteAppointment);
// router.put("/appointment/edit/:apptId", updateAppointment);

export default router;
