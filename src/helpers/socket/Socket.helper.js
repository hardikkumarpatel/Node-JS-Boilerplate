import { Server, Socket } from "socket.io";
import { Log } from "@/helpers";

class SocketServer {
  constructor(http) {
    this.IO = new Server(http, {
      cors: {
        origin: "*"
      },
      connectionStateRecovery: {},
      allowEIO3: true
    });
    global.IO = this.IO;
  }

  async initialize() {
    this.IO.on("connection", async (socket) => {
      try {
        if (socket instanceof Socket) {
          Log.info(`Socket is connected ${socket.id}`);

          socket.on("disconnect", (reason) => {
            Log.error(`socket ${socket.id} disconnected due to`, reason);
          });
        }
      } catch (SocketException) {
        if (SocketException instanceof Error) {
          Log.error("Error ocurred in socket app", SocketException);
        }
      }
    });
  }

  static async emitSocketEvents(req, room, event, payload) {
    const IO = req.app.get("IO");
    IO.in(room).emit(event, payload);
  }

  static acknowledgment(callback) {
    if (callback && typeof callback === "function") {
      callback({ status: "OK" });
    }
  }
}

export default SocketServer;
