import dotenv from "dotenv";

import { DoctorModel } from "../model/DoctorModel.js";
import { issueJWT } from "../config/jwtUtil.js";
import { UserModel } from "../model/User.Model.js";

dotenv.config();

export async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const doctor = await DoctorModel.findOne({
      email,
    });

    if (!doctor) {
      return res.status(401).json({
        message: "Cannot find doctor with this email",
      });
    }

    if (req.body.password !== doctor.password) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const tokenObject = issueJWT(doctor);
    return res.status(200).json({
      message: "Log in successfull",
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
      doctor: {
        id: doctor._id,
        fullName: doctor.fullName,
        email: doctor.email,
        speciality: doctor.speciality,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function deleteAppointment(req, res) {
  try {
    const doctor = req.user;
    const commonId = req.body.commonId;
    const userId = req.body.userId;

    if (!doctor) {
      return res.status(400).json({
        message: "Doctor not found",
      });
    }

    const doctorResult = await DoctorModel.updateOne(
      { _id: doctor._id },
      { $pull: { appointments: { commonId: commonId } } }
    );

    const userResult = await UserModel.updateOne(
      { _id: userId },
      { $pull: { appointments: { commonId: commonId } } }
    );

    return res.status(200).json({
      message: "Appointments deleted successfully",
      doctorResult,
      userResult,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function updateAppointment(req, res) {
  try {
    const doctor = req.user;
    const commonId = req.body.commonId;
    const userId = req.body.userId;
    const appointmentAt = req.body.appointmentAt;
    const appointmentOn = req.body.appointmentOn;

    if (!doctor) {
      return res.status(400).json({
        message: "Doctor not found",
      });
    }

    let doctorResult = await DoctorModel.updateOne(
      { _id: doctor._id, "appointments.commonId": commonId },
      {
        $set: {
          "appointments.$.appointmentAt": appointmentAt,
          "appointments.$.appointmentOn": appointmentOn,
        },
      }
    );

    let userResult = await UserModel.updateOne(
      { _id: userId, "appointments.commonId": commonId },
      {
        $set: {
          "appointments.$.appointmentAt": appointmentAt,
          "appointments.$.appointmentOn": appointmentOn,
        },
      }
    );

    return res.status(200).json({
      message: "Appointments time slot updated successfully",
      doctorResult,
      userResult,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function updatePrescription(req, res) {
  try {
    const doctor = req.user;
    const commonId = req.body.commonId;
    const userId = req.body.userId;
    const prescription = req.body.prescription;

    if (!doctor) {
      return res.status(400).json({
        message: "Doctor not found",
      });
    }

    let doctorResult = await DoctorModel.updateOne(
      { _id: doctor._id, "appointments.commonId": commonId },
      {
        $set: {
          "appointments.$.prescription": prescription,
          "appointments.$.complete": true,
        },
      }
    );

    let userResult = await UserModel.updateOne(
      { _id: userId, "appointments.commonId": commonId },
      {
        $set: {
          "appointments.$.prescription": prescription,
          "appointments.$.complete": true,
        },
      }
    );

    return res.status(200).json({
      message: "Prescription updated successfully",
      doctorResult,
      userResult,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getAppointments(req, res) {
  try {
    const doctor = req.user;
    if (!doctor) {
      return res.status(400).json({
        message: "Doctor not found",
      });
    }
    // console.log("doctor in getApp: ", doctor);

    const result = await DoctorModel.findOne({ _id: doctor._id })
      .select({
        appointments: 1,
      })
      .exec();
    return res.status(200).json({
      message: "Appointments fetched Successfully",
      appointments: result.appointments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function DeleteDoctor(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({ message: "Doctor id is missing" });
    const result = await DoctorModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "Doctor deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function toggleDisableDoctor(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({ message: "Doctor id is missing" });
    let result = await DoctorModel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.status(200).json({
      message: "Doctor Disable Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
