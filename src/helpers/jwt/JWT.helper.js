import Jwt from "jsonwebtoken";
import { Config, IConfig } from "@/config";

class JWTHelper {
  constructor() {}

  static generateAccessToken = async (user) => {
    const { id, email } = user;
    return Jwt.sign(
      {
        id,
        email
      },
      Config.get(IConfig.ACCESS_TOKEN_SECRET),
      {
        expiresIn: Config.get(IConfig.ACCESS_TOKEN_EXPIRY)
      }
    );
  };

  static generateRefreshToken = async (user) => {
    const { id } = user;
    return Jwt.sign(
      {
        id
      },
      Config.get(IConfig.REFRESH_TOKEN_SECRET),
      { expiresIn: Config.get(IConfig.REFRESH_TOKEN_EXPIRY) }
    );
  };

  static generateResetPasswordToken = async (user) => {
    const { id, email } = user;
    return Jwt.sign(
      {
        id,
        email
      },
      Config.get(IConfig.RESET_PASSWORD_TOKEN_SECRET),
      {
        expiresIn: Config.get(IConfig.RESET_PASSWORD_TOKEN_EXPIRY)
      }
    );
  };

  static verifyToken = async (token, secret) => {
    return Jwt.verify(token, secret);
  };
}

export default JWTHelper;
