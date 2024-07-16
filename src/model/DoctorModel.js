import mongoose from "mongoose";
import connectToDB from "../db/dbConfig.js";

const {Schema} = mongoose;
const DoctorSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    disable:{
        type:Boolean,
        default:false
    }

})

export const DoctorModel = mongoose.model("Doctor",DoctorSchema)