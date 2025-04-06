import swaggerUi from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";
import basicAuth from "express-basic-auth";
import { SWAGGER_OPTIONS } from "@/swagger/Swagger.options";
import { Config } from "@/config";
import { ApiAsyncHelper } from "@/helpers";
import { Env } from "@/constant";
class SwaggerApp {
  constructor(app) {
    this.app = app;
  }

  async initialize() {
    this.app.use(
      "/docs",
      basicAuth({
        users: {
          root: Config.getEnv(Env.AUTH_PASSWORD)
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
      ApiAsyncHelper.AsyncHandler(async (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerJSDocs(SWAGGER_OPTIONS));
      })
    );
    return `📘 Swagger docs available at: http://localhost:${Config.getEnv(Env.PORT)}`;
  }
}

export default SwaggerApp;
