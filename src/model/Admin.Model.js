import mongoose from "mongoose";

const { Schema } = mongoose;

const AdminSchema = new Schema({
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
    default: "admin",
  },
});

export const AdminModel = mongoose.model("Admin", AdminSchema);
