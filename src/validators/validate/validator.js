import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { ApiErrorResponseHelper } from "@/helpers";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(({ msg }) => extractedErrors.push(msg));

  throw new ApiErrorResponseHelper(
    StatusCodes.UNPROCESSABLE_ENTITY,
    "Validation Error",
    extractedErrors
  );
};
