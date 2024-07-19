import mongoose from "mongoose";

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  appointmentOn: {
    type: String,
    required: true,
  },
  appointmentAt: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  commonId: {
    type: String,
    required: true,
  },
  prescription: {
    type: String,
    default: null,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});
const DoctorSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    default: "doctor",
  },
  appointments: {
    type: [appointmentSchema],
    default: [],
  },
});

export const DoctorModel = mongoose.model("Doctor", DoctorSchema);
