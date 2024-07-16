import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import { UserModel } from "../model/User.Model.js";
import { issueJWT } from "../config/jwtUtil.js";

dotenv.config();

export async function register(req, res) {
  try {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingUser = await UserModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new UserModel({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    const result = await user.save();

    if (result) {
      const tokenObject = issueJWT(result);
      return res.status(200).json({
        message: "Registration complete successfully",
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
        user: {
          id: result._id,
          fullName: result.fullName,
          email: result.email,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Cannot find user with this email",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const tokenObject = issueJWT(user);
    return res.status(200).json({
      message: "Log in successfull",
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
