import { getReasonPhrase, StatusCodes } from "http-status-codes";

class ApiErrorResponseHelper extends Error {
  constructor(
    statusCode = 500,
    message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    errors = null,
    stack = null
  ) {
    super();
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = Date.now();
    this.data = null;
    this.errors = [
      {
        message: errors,
        extensions: {
          code: getReasonPhrase(this.statusCode),
          stacktrace: this.stack ? this.stack.split("\n").map((line) => line.trim()) : []
        }
      }
    ];
  }
}

export default ApiErrorResponseHelper;
