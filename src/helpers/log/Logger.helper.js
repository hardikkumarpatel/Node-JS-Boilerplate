import winston from "winston";

const date = () => {
  return new Date(Date.now()).toISOString();
};
class LoggerHelper {
  static print() {
    return winston.createLogger({
      level: process.env.LOG_LEVEL,
      levels: winston.config.npm.levels,
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize({
          level: true,
          message: false,
          colors: {
            error: "red",
            info: "green",
            debug: "green",
            http: "blue"
          }
        }),
        winston.format.timestamp({
          format: date()
        }),
        winston.format.simple(),
        winston.format.printf((info) => {
          const printMessage = `[${info.timestamp}] [${info.level}]: ${info.message}`;
          if (info.metadata) {
            if (info.metadata instanceof Error) {
              const { message, stack } = info.metadata;
              const errorMessage = JSON.stringify({ message, stack }, null, 2);
              return `${printMessage} | ${errorMessage}`;
            }
            if (typeof info.metadata === "object") {
              const message = JSON.stringify(info.metadata, null, 2);
              return `${printMessage} | ${message}`;
            }
            if (typeof info.metadata === "number") {
              return `${printMessage} | ${info.metadata}`;
            }
            return `${printMessage} | ${info.metadata}`;
          }
          return printMessage;
        })
      )
    });
  }

  static async info(message) {
    LoggerHelper.print().info(message);
  }

  static async info(message, metadata) {
    LoggerHelper.print().info(message, { metadata });
  }

  static async debug(message) {
    LoggerHelper.print().debug(message);
  }

  static async debug(message, metadata) {
    LoggerHelper.print().debug(message, { metadata });
  }

  static async error(message) {
    LoggerHelper.print().error(message);
  }

  static async error(message, metadata) {
    LoggerHelper.print().error(message, { metadata });
  }

  static async http(message) {
    LoggerHelper.print().http(message);
  }
}

export default LoggerHelper;
