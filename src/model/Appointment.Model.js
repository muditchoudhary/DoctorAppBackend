import mongoose from "mongoose";

const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  DoctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const AppointmentModel = mongoose.model(
  "Appointment",
  AppointmentSchema
);
