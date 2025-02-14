import { StatusCodes } from "http-status-codes";
import { ApiErrorResponseHelper, ApiResponseHelper } from "@/helpers";

class ApiCommonHelper {
  static useHealthHelper = (_, res) => {
    const {
      env: { NODE_ENV },
      platform,
      pid
    } = process;
    return res.status(StatusCodes.OK).json(
      new ApiResponseHelper(StatusCodes.OK, "Welcome to backend! Made in Node with ❤️", {
        mode: NODE_ENV,
        platfrom: platform,
        pid: pid,
        uptime: `${process.uptime()} seconds`,
        timestamp: Date.now()
      })
    );
  };

  static useNotFoundHelper = () => {
    throw new ApiErrorResponseHelper(
      StatusCodes.NOT_FOUND,
      "Request resource not found",
      "The route you are trying to access was not found"
    );
  };
}

export default ApiCommonHelper;
