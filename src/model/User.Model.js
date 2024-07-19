import mongoose from "mongoose";

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  appointmentOn: {
    type: String,
    require: true,
  },
  appointmentAt: {
    type: String,
    require: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorSpeciality: {
    type: String,
    required: true,
  },
  prescription: {
    type: String,
    default: null,
  },
  commonId: {
    type: String,
    require: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

const UserSchema = new Schema({
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
  userType: {
    type: String,
    default: "user",
  },
  appointments: {
    type: [appointmentSchema],
    default: [],
  },
});

export const UserModel = mongoose.model("User", UserSchema);
