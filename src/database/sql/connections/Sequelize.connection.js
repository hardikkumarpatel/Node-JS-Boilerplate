import { Config, IConfig } from "@/config";
import { Log } from "@/helpers";
import { Sequelize } from "sequelize";

export default class SequelizeDBConnection {
  static connection = new Sequelize(
    Config.get(IConfig.DB_NAME),
    Config.get(IConfig.DB_USER),
    Config.get(IConfig.DB_PASS),
    {
      host: Config.get(IConfig.DB_HOST),
      logging: false,
      schema: "public",
      port: Config.get(IConfig.DB_PORT),
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
