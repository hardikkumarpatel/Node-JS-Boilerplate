import StatusCodes, { getReasonPhrase } from "http-status-codes";
import { ApiErrorResponseHelper, ApiAsyncHelper, JWTHelper } from "@/helpers";
import { Config, IConfig } from "@/config";

class ApiAuthMiddleware {
  static use = ApiAsyncHelper.AsyncHandlerHelper(async (req, _res, next) => {
    const { cookies, headers } = req;
    if (!headers.authorization?.includes("Bearer")) {
      throw new ApiErrorResponseHelper(
        StatusCodes.UNAUTHORIZED,
        "Unauthorised request! access token is missing",
        getReasonPhrase(StatusCodes.UNAUTHORIZED)
      );
    }
    const token = cookies?.["token"] || headers.authorization?.replace("Bearer ", "");
    const decodeToken = await JWTHelper.verifyToken(token, Config.get(IConfig.ACCESS_TOKEN_SECRET));
    const { email } = decodeToken;
    /** Update the middleware logic as per the requirement */
    if (!email) {
      throw new ApiErrorResponseHelper(
        StatusCodes.UNAUTHORIZED,
        "Invalid user access token",
        getReasonPhrase(StatusCodes.UNAUTHORIZED)
      );
    }

    req.user = {};
    next();
  });
}

export default ApiAuthMiddleware;
