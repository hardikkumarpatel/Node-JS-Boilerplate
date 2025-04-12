import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import cookies from "cookie-parser";
import { ApiCommonHelper, AppHelper, Log, SocketServer } from "@/helpers";
import { ApiErrorMiddleware, MorganLogMiddleware } from "@/middleware";
import { Config } from "@/config";
import { SwaggerApp } from "@/swagger";
import { Env } from "@/constant";
import { LocaleService, I18n } from "@/i18n";
import Routes from "@/routes";
import { MongoDBConnection } from "@/database/mongodb";
import { SequelizeDBConnection } from "@/database/sql";

class App {
  constructor() {
    this.app = express();
    this.PORT = Config.getEnv(Env.PORT);
  }

  async run() {
    try {
      await this.startApp();
      await AppHelper.signalListening(this.server);
    } catch (error) {
      Log.exit("Error", new Error(error));
    }
  }

  async startApp() {
    this.server = http.createServer(this.app);
    this.app.set("port", this.PORT);
    this.server.on("error", AppHelper.serverErrorListening);
    this.server.on("close", Log.info.bind(Log));
    this.server.on("listening", async () => {
      await AppHelper.serverListening(this.server);
      await this.initialize();
    });
    this.server.listen(this.PORT);
    return this.server;
  }

  async initialize() {
    // await MongoDBConnection.connect();
    // await SequelizeDBConnection.connect();
    await this.initializeMiddleware();
    await this.initializeRoutes();
    await this.initializeSwaggerDocs();
    await this.initializeSocketApp();
    await this.initializeGlobalMiddleware();
  }

  async initializeMiddleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(new MorganLogMiddleware().success);
    this.app.use(new MorganLogMiddleware().error);
    this.app.use("/upload", express.static(path.resolve("src", "upload")));
    this.app.options("*");
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "HEAD", "PUT", "OPTIONS", "PATCH", "POST", "DELETE"]
      })
    );
    this.app.disable("x-powered-by");
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use(cookies());
  }

  async initializeRoutes() {
    this.app.use("/health", ApiCommonHelper.useHealthHelper);
    this.app.use(new LocaleService(new I18n().init()).middleware);
    this.app.use("/api/v1", Routes.getRoutes());
  }

  async initializeSwaggerDocs() {
    try {
      await new SwaggerApp(this.app).initialize();
      Log.info(`📘 Swagger docs available at: http://localhost:${Config.getEnv(Env.PORT)}/docs`);
    } catch (error) {
      Log.error("Swagger Error", new Error(error));
    }
  }

  async initializeSocketApp() {
    try {
      await new SocketServer(this.server).initialize();
      Log.info(`🔌 WebSocket engine initialized successfully`);
    } catch (error) {
      Log.error("Socket Error", new Error(error));
    }
  }

  async initializeGlobalMiddleware() {
    this.app.use("*", ApiCommonHelper.useNotFoundHelper);
    this.app.use(ApiErrorMiddleware.use);
  }
}

export default App;
