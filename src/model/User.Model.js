import mongoose from "mongoose";

import connectToDB from '../db/dbConfig.js';

const { Schema } = mongoose;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});



export const UserModel =  mongoose.model("User", UserSchema);
