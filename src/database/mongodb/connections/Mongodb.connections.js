import { Log } from "@/helpers";
import mongoose from "mongoose";

export default class MongoDBConnection {
  static async connect() {
    /* eslint-disable no-useless-catch */
    try {
      const connection = await mongoose.connect("");
      global.MongoDB = typeof connection;
      Log.info("MongoDB Database connected. 🌱");
    } catch (MongoDBConnectionException) {
      throw MongoDBConnectionException;
    }
  }
}
