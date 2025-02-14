import { MulterError } from "multer";
import { StatusCodes } from "http-status-codes";
import { ApiErrorResponseHelper } from "@/helpers";

class ErrorHelper {
  static json = (code, message, error, stack = null) => {
    return new ApiErrorResponseHelper(code, message, error, stack);
  };

  static capture(errors, res) {
    if (errors instanceof MulterError) {
      console.log("errors", errors);
      if (errors.code === "LIMIT_FILE_SIZE") {
        return res
          .status(StatusCodes.REQUEST_TOO_LONG)
          .send(
            ErrorHelper.json(
              StatusCodes.REQUEST_TOO_LONG,
              errors.code,
              "File size is too large. Max size is 1MB"
            )
          );
      } else if (errors.code === "LIMIT_UNEXPECTED_FILE") {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(
            ErrorHelper.json(
              StatusCodes.BAD_REQUEST,
              errors.code,
              `Unexpected field. ${errors.field}`
            )
          );
      } else if (errors.code === "INVALID_FILE_TYPE") {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(ErrorHelper.json(StatusCodes.BAD_REQUEST, errors.code, errors.field));
      } else {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(
            ErrorHelper.json(
              StatusCodes.INTERNAL_SERVER_ERROR,
              errors.code,
              "An unknown error occurred during the file upload"
            )
          );
      }
    }
  }
}

export default ErrorHelper;
