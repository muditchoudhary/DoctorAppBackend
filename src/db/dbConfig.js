import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DOCTOR_APP_DB_URI = process.env.DOCTOR_APP_DB_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(DOCTOR_APP_DB_URI, {
      autoIndex: true,
    });
    console.log("Connected to Mongodb Atlas");
  } catch (error) {
    console.error(error);
  }
};

export default connectToDB;
