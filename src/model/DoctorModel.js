import mongoose from "mongoose";

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  appointmentOn: {
    type: Date,
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
});
const DoctorSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  appointments: {
    type: [appointmentSchema],
    default: [],
  },
});

export const DoctorModel = mongoose.model("Doctor", DoctorSchema);
