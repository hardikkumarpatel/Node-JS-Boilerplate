import { MulterError } from "multer";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { ApiErrorResponseHelper, Log } from "@/helpers";
import ErrorHelper from "@/helpers/app/Error.helper";
import { Config } from "@/config";

class ApiErrorMiddleware {
  // eslint-disable-next-line no-unused-vars
  static use = (errors, _req, res, _next) => {
    if (errors instanceof MulterError) {
      return ErrorHelper.capture(errors, res);
    }

    let error = errors;
    if (!error.statusCode) {
      error = new ApiErrorResponseHelper(
        StatusCodes.INTERNAL_SERVER_ERROR,
        getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        errors.message,
        errors.stack
      );
    }
    if (Config.isDev()) {
      Log.error(error.message, error);
    }
    if (Config.isProduction()) {
      if (error.errors.extensions && error.errors.extensions.stacktrace) {
        error.errors.extensions.stacktrace = [];
      }
    }

    const response = {
      ...error
    };
    return res.status(error.statusCode).json(response);
  };
}

export default ApiErrorMiddleware;
