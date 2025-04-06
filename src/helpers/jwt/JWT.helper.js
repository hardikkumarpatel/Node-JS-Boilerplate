import Jwt from "jsonwebtoken";
import { Config } from "@/config";
import { Env } from "@/constant";

class JWTHelper {
  constructor() {}

  static generateAccessToken = async (user) => {
    const { id, email } = user;
    return Jwt.sign(
      {
        id,
        email
      },
      Config.getEnv(Env.ACCESS_TOKEN_SECRET),
      {
        expiresIn: Config.getEnv(Env.ACCESS_TOKEN_EXPIRY)
      }
    );
  };

  static generateRefreshToken = async (user) => {
    const { id } = user;
    return Jwt.sign(
      {
        id
      },
      Config.getEnv(Env.REFRESH_TOKEN_SECRET),
      { expiresIn: Config.getEnv(Env.REFRESH_TOKEN_EXPIRY) }
    );
  };

  static generateResetPasswordToken = async (user) => {
    const { id, email } = user;
    return Jwt.sign(
      {
        id,
        email
      },
      Config.getEnv(Env.RESET_PASSWORD_TOKEN_SECRET),
      {
        expiresIn: Config.getEnv(Env.RESET_PASSWORD_TOKEN_EXPIRY)
      }
    );
  };

  static verifyToken = async (token, secret) => {
    return Jwt.verify(token, secret);
  };
}

export default JWTHelper;
