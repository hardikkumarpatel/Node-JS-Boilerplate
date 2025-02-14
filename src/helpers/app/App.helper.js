import HTTP from "node:http";
import { Config, IConfig } from "@/config";
import { Log } from "@/helpers";

class AppHelper {
  static async serverErrorListening(error) {
    if (error?.syscall !== "listen") {
      throw error;
    }

    switch (error?.code) {
      case "EACCES":
        Log.info("Requires privileges");
        return process.exit(1);

      case "EADDRINUSE":
        Log.error(`port ${Config.get(IConfig.PORT)} is already in use`);
        return process.exit(1);

      default:
        throw error;
    }
  }

  static async serverListening(server) {
    if (server instanceof HTTP.Server) {
      const address = server.address();
      Log.info(`Express engine is running on ${address.port} 🚀`);
    }
  }

  static signalListening(http) {
    process
      .on("SIGINT", async () => {
        try {
          if (http instanceof HTTP.Server) {
            http.close();
          }
        } catch (SIGINTError) {
          if (SIGINTError instanceof Error) {
            Log.error(`Error occurred during shutdown server`, SIGINTError);
          }
        } finally {
          Log.info(`Express engine shutdown successfully 🌱`);
          process.exit(1);
        }
      })
      .on("SIGHUP", () => {
        process.kill(process.pid, "SIGTERM");
      })
      .on("uncaughtException", (UncaughtError) => {
        Log.error(`Uncaught Exception thrown`, UncaughtError);
        if (http instanceof HTTP.Server) {
          http.close();
        }
        process.exit(1);
      })
      .on("unhandledRejection", async (UncaughtReason) => {
        Log.error(`Unhandled Rejection thrown`, UncaughtReason);
        if (http instanceof HTTP.Server) {
          http.close();
        }
        process.exit(1);
      });
  }

  static async validate() {
    if (!Config.get(IConfig.PORT) || !Config.get(IConfig.NODE_ENV)) {
      Log.error(
        "The node env or PORT mapping is missing! Please check the .env file for the correct mapping."
      );
      Log.error("x-----------------------------------------------x");
      Log.error("x==================== ERROR ====================x");
      Log.error("x-----------------------------------------------x");
      return false;
    }
    return true;
  }
}

export default AppHelper;
