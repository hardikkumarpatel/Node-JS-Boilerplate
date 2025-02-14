import rateLimit from "express-rate-limit";
import { getReasonPhrase } from "http-status-codes";
import { ApiErrorResponseHelper } from "@/helpers";

class RateLimiterMiddleware {
  limiter = rateLimit({
    windowMs: 5 * 1000 /** in milliseconds */,
    max: 2, // Limit each IP to 2 requests per `window` (here, per 5 seconds)
    message: "You have exceeded the request! please try after some time",
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_, res, __, options) => {
      return res
        .status(options.statusCode)
        .send(
          new ApiErrorResponseHelper(
            options.statusCode,
            options.message,
            getReasonPhrase(options.statusCode)
          )
        );
    }
  });
}

export default RateLimiterMiddleware;
