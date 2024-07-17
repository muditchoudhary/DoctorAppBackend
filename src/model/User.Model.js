import mongoose from "mongoose";

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  appointmentOn: {
    type: Date,
    default: Date.now,
  },
  appointmentAt: {
    type: String,
    default: () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
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
});

const UserSchema = new Schema({
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
