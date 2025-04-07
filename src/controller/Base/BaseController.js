import { ApiErrorResponseHelper, ApiResponseHelper } from "@/helpers";
import { StatusCodes } from "http-status-codes";

class BaseController {
  static SuccessResponse(res, statusCode = StatusCodes.OK, message, data = null) {
    return res.status(statusCode).json(new ApiResponseHelper(statusCode, message, data));
  }

  static ErrorResponse(res, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, message, errors) {
    return res.status(statusCode).json(new ApiErrorResponseHelper(statusCode, message, errors));
  }
}

export default BaseController;
