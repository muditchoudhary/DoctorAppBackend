import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import { UserModel } from "../model/User.Model.js";
import { issueJWT } from "../config/jwtUtil.js";
import { DoctorModel } from "../model/DoctorModel.js";

dotenv.config();

export async function register(req, res) {
  try {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingUser = await UserModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new UserModel({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    const result = await user.save();

    if (result) {
      const tokenObject = issueJWT(result);
      return res.status(200).json({
        message: "Registration complete successfully",
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
        user: {
          id: result._id,
          fullName: result.fullName,
          email: result.email,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Cannot find user with this email",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const tokenObject = issueJWT(user);
    return res.status(200).json({
      message: "Log in successfull",
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function createNewAppointment(req, res) {
  try {
    const user = req.user;
    if (!req.body.doctorId) {
      return res.status(400).json({
        message: "Doctor id is missing",
      });
    }

    const doctor = await DoctorModel.findOne({
      _id: req.body.doctorId,
    });
    if (!doctor)
      return res
        .status(404)
        .json({ message: "Doctor not found with the given id" });

    const commonId = uuidv4();
    const userModelresult = await UserModel.updateOne(
      { _id: user._id },
      {
        $push: {
          appointments: {
            appointmentOn: req.body.appointmentOn,
            appointmentAt: req.body.appointmentAt,
            doctorName: doctor.fullName,
            doctorSpeciality: doctor.speciality,
            commonId,
          },
        },
      }
    );
    const doctorModelResult = await DoctorModel.updateOne(
      { _id: doctor._id },
      {
        $push: {
          appointments: {
            appointmentOn: req.body.appointmentOn,
            appointmentAt: req.body.appointmentAt,
            userId: user._id,
            userName: user.fullName,
            commonId,
          },
        },
      }
    );
    if (userModelresult.acknowledged && doctorModelResult.acknowledged) {
      return res.status(200).json({
        message: "Appointment created",
        userModelresult,
        doctorModelResult,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function viewPrescription(req, res) {
  try {
    const user = req.user;
    const result = await UserModel.findOne({ _id: user._id }).select({
      "appointments.doctorName": 1,
      "appointments.doctorSpeciality": 1,
      "appointments.prescription": 1,
      "appointments.appointmentOn": 1,
      "appointments.appointmentAt": 1,
    });
    return res.status(200).json({
      message: "Prescriptions fetched",
      appointments: result.appointments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getAllDoctor(req, res) {
  try {
    const doctors = await DoctorModel.find({ disable: false })
      .select({ _id: 1, fullName: 1, email: 1, speciality: 1 })
      .exec();

    if (!doctors)
      return res.status(404).json({ message: "No doctor are present" });
    return res.status(200).json({
      message: "Doctors fetched",
      doctors,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
