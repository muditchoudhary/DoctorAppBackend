import { DoctorModel } from "../model/DoctorModel.js";
import { issueJWT } from "../config/jwtUtil.js";
import { AdminModel } from "../model/Admin.Model.js";

export async function adminLogin(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const admin = await AdminModel.findOne({
      email,
    });

    if (!admin) {
      return res.status(401).json({
        message: "Cannot find admin with this email",
      });
    }

    if (admin.password !== req.body.password) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const tokenObject = issueJWT(admin);
    return res.status(200).json({
      message: "Log in successfull",
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
export async function adminRegister(req, res) {
  try {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingAdmin = await AdminModel.findOne({
      email,
    });

    if (existingAdmin) {
      return res.status(409).json({
        message: "Admin already exists with this email",
      });
    }

    const admin = new AdminModel({
      fullName: fullName,
      email: email,
      password: password,
    });

    const result = await admin.save();

    if (result) {
      return res.status(200).json({
        message: "Registration complete successfully",
        admin: {
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
export async function DoctorRegiter(req, res) {
  try {
    if (
      !req.body.fullName ||
      !req.body.email ||
      !req.body.password ||
      !req.body.speciality
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingDoctor = await DoctorModel.findOne({
      email: req.body.email,
    });

    if (existingDoctor) {
      return res.status(409).json({
        message: "Doctor already exists with this email",
      });
    }

    const doctor = new DoctorModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      speciality: req.body.speciality,
    });
    const result = await doctor.save();
    if (result) {
      const tokenObject = issueJWT(result);
      return res.status(200).json({
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
        message: "Doctor Registered Successfully",
        doctor: {
          id: result._id,
          fullName: result.fullName,
          email: result.email,
          speciality: result.speciality,
        },
      });
    }
    return res.status(200).json({
      message: "Doctor Registered Successfully",
      result,
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
      result,
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

export async function getAllDoctor(req, res) {
  try {
    const doctors = await DoctorModel.find({})
      .select({ _id: 1, fullName: 1, email: 1, speciality: 1, disable: 1 })
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
