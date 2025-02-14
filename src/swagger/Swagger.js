import swaggerUi from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";
import basicAuth from "express-basic-auth";
import { SWAGGER_OPTIONS } from "@/swagger/Swagger.options";
import { Config, IConfig } from "@/config";
import { ApiAsyncHelper } from "@/helpers";
class SwaggerApp {
  constructor(app) {
    this.app = app;
  }

  async initialize() {
    this.app.use(
      "/docs",
      basicAuth({
        users: {
          root: Config.get(IConfig.AUTH_PASSWORD)
        },
        challenge: true
      })
    );
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerJSDocs(SWAGGER_OPTIONS), {
        explorer: true,
        swaggerOptions: {
          docExpansion: "none"
        }
      })
    );
    this.app.get(
      "/docs.json",
      ApiAsyncHelper.AsyncHandlerHelper(async (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerJSDocs(SWAGGER_OPTIONS));
      })
    );
    return `Swagger docs available at http://localhost:${Config.get(IConfig.PORT)} 📗`;
  }
}

export default SwaggerApp;
