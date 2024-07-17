import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

import { UserModel } from "../model/User.Model.js";
import { DoctorModel } from "../model/DoctorModel.js";

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const initializePassport = (passport) => {
  passport.use(
    new JwtStrategy(jwtOptions, async function (jwt_payload, done) {
      try {
        // console.log("userType in password config: ", jwt_payload.userType);
        let user;
        if (jwt_payload.userType === "user") {
          user = await UserModel.findOne({
            _id: jwt_payload.sub,
          });
        } else if (jwt_payload.userType === "doctor") {
          user = await DoctorModel.findOne({
            _id: jwt_payload.sub,
          });
        }
        // console.log("User in password config: ", user);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        console.error(error);
        return done(error, false);
      }
    })
  );
};
