import morgan from "morgan";
import { Log } from "@/helpers";

class MorganLogMiddleware {
  constructor() {
    morgan.token("message", (_, res) => res.locals.message || "");
  }

  success = morgan("short", {
    skip: (_, res) => res.statusCode >= 400,
    stream: { write: Log.http.bind(Log) }
  });
  error = morgan("short", {
    skip: (_, res) => res.statusCode < 400,
    stream: { write: Log.error.bind(Log) }
  });
}

export default MorganLogMiddleware;
