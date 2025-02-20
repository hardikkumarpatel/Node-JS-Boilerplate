import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import cookies from "cookie-parser";
import { ApiCommonHelper, AppHelper, Log, SocketAppHelper } from "@/helpers";
import { ApiErrorMiddleware, MorganLogMiddleware } from "@/middleware";
import routes from "@/routes";
import { Config, IConfig } from "@/config";
import { SwaggerApp } from "@/swagger";
import { MongoDBConnection } from "@/database/mongodb";
import { SequelizeDBConnection } from "@/database/sql";
class ExpressEngine {
  constructor() {
    this.app = express();
    this.PORT = Config.get(IConfig.PORT);
  }

  async run() {
    await this.startApp().then(AppHelper.signalListening).catch(Log.error);
  }

  async startApp() {
    this.server = http.createServer(this.app);
    this.app.set("port", this.PORT);
    this.server.on("error", AppHelper.serverErrorListening);
    this.server.on("close", Log.info);
    this.server.on("listening", async () => {
      await AppHelper.serverListening(this.server).then(this.initialize());
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
    this.app.use(express.json({ limit: "6kb" }));
    this.app.use(new MorganLogMiddleware().success);
    this.app.use(new MorganLogMiddleware().error);
    this.app.use("/upload", express.static(path.resolve("src", "upload")));
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "HEAD", "PUT", "OPTIONS", "PATCH", "POST", "DELETE"]
      })
    );
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use(cookies());
  }

  async initializeRoutes() {
    this.app.use("/health", ApiCommonHelper.useHealthHelper);
    this.app.use(routes);
  }

  async initializeSwaggerDocs() {
    await new SwaggerApp(this.app).initialize().then(Log.info).catch(Log.error);
  }

  async initializeSocketApp() {
    await new SocketAppHelper(this.server).initialize().then(Log.info).catch(Log.error);
  }

  async initializeGlobalMiddleware() {
    this.app.use("*", ApiCommonHelper.useNotFoundHelper);
    this.app.use(ApiErrorMiddleware.use);
  }
}

export default ExpressEngine;
