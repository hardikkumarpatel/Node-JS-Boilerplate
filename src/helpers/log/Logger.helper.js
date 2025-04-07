import * as winston from "winston";
import { date } from "@/utils";
class LoggerHelper {
  static init() {
    if (!this.logger) {
      this.logger = winston.createLogger({
        level: process.env.LOG_LEVEL,
        levels: winston.config.npm.levels,
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize({
            level: true,
            colors: { info: "green", error: "red", http: "blue" }
          }),
          winston.format.timestamp({ format: date() }),
          winston.format.printf(this.format)
        )
      });
    }
    return this.logger;
  }

  static format(info) {
    const message = `[${info.timestamp}][${info.level}]: ${info.message}`;
    if (!info.metadata) return message;

    if (info.metadata instanceof Error) {
      return `${message} ${JSON.stringify({ message: info.metadata.message, stacktrace: [info.metadata.stack] }, null, 2)}`;
    }

    return `${message} ${JSON.stringify(info.metadata, null, 2)}`;
  }

  static info(message, metadata) {
    this.init().info(`${message}`, metadata ? { metadata } : undefined);
  }

  static error(message, metadata) {
    this.init().error(message, metadata ? { metadata } : undefined);
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
