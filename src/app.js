import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";

import connectToDB from "./db/dbConfig.js";
import { UserModel } from "./model/User.Model.js";
import UserRoutes from "./routes/User.routes.js";
import AdminRoutes from "./routes/Admin.routes.js";
import DoctorRoutes from "./routes/Doctor.routes.js";
import { initializePassport } from "./config/passport.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

initializePassport(passport);
app.use(passport.initialize());

connectToDB();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/mudit", (req, res) => res.send("Hi Mudit what's up bro"));

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }
);

app.use("/user", UserRoutes);
app.use("/admin", AdminRoutes);
app.use("/doctor", DoctorRoutes);

app.post("/user/new", async (req, res) => {
  try {
    const user = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await user.save();
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
