import { Config } from "@/config";
import { Env } from "@/constant";
import { Log } from "@/helpers";
import { Sequelize } from "sequelize";

export default class SequelizeDBConnection {
  static connection = new Sequelize(
    Config.getEnv(Env.DB_NAME),
    Config.getEnv(Env.DB_USER),
    Config.getEnv(Env.DB_PASS),
    {
      host: Config.getEnv(Env.DB_HOST),
      logging: false,
      schema: "public",
      port: Config.getEnv(Env.DB_PORT),
      dialect: "postgres"
    }
  );

  static async sync() {
    await this.connection.sync({ alter: true });
  }

  static async connect() {
    /* eslint-disable no-useless-catch */
    try {
      await this.connection.authenticate();
      await this.sync();
      global.SQL = this.connection;
      Log.info("SQL Database connected. 🌱");
    } catch (SequelizeDBConnectionError) {
      throw SequelizeDBConnectionError;
    }
  }
}
