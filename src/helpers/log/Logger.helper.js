import * as winston from "winston";
import { ApiErrorResponseHelper } from "@/helpers";
import { date } from "@/utils";

class LoggerHelper {
  static logger;

  static init() {
    if (!this.logger) {
      this.logger = winston.createLogger({
        level: process.env.LOG_LEVEL,
        levels: winston.config.npm.levels,
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize({ level: true, message: false }),
          winston.format.timestamp({ format: date() }),
          winston.format.printf(this.format)
        )
      });
    }
    return this.logger;
  }

  static format(info) {
    const message = `[${info.timestamp}] [${info.level}]: ${info.message}`;
    if (!info.metadata) return message;

    if (info.metadata instanceof ApiErrorResponseHelper) {
      const { errors } = info.metadata;
      const { message: errMessage, extensions: { stacktrace, code } = {} } = errors[0] || {};
      return `${message} | ${JSON.stringify({ code, message: errMessage, stacktrace }, null, 2)}`;
    }

    if (info.metadata instanceof Error) {
      return `${message} | ${JSON.stringify({ code: "Error", message: info.metadata.message, stacktrace: [info.metadata.stack] }, null, 2)}`;
    }

    return `${message} | ${JSON.stringify(info.metadata, null, 2)}`;
  }

  static info(message, metadata) {
    this.init().info(message, metadata ? { metadata } : undefined);
  }

  static debug(message, metadata) {
    this.init().debug(message, metadata ? { metadata } : undefined);
  }

  static error(message, metadata) {
    this.init().error(message, metadata ? { metadata } : undefined);
  }

  static warn(message, metadata) {
    this.init().warn(message, metadata ? { metadata } : undefined);
  }

  static http(message) {
    this.init().http(message);
  }

  static exit(message, metadata) {
    this.init().error(message, metadata ? { metadata } : undefined);
    process.exit(1);
  }
}

export default LoggerHelper;
