import { DoctorModel } from "../model/DoctorModel.js";

export async function DoctorRegiter(req, res) {
  try {
    const doctor = new DoctorModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      speciality: req.body.speciality,
    });
    const result = await doctor.save();
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
    // console.log(result);
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
