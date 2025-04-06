import { version } from "../../package.json";

import { Config } from "@/config";
import { Env } from "@/constant";
const PORT = Config.getEnv(Env.PORT);

export const SWAGGER_OPTIONS = {
  definition: {
    openapi: "3.1.0",
    host: "",
    basePath: "",
    info: {
      title: "NODE REST API BOILERPLATE ENGINE",
      version,
      description: "Swagger API Documentation for Node Boilerplate Engine",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html"
      },
      contact: {
        name: "Fullstack Team",
        email: "info@email.com"
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Authorization required to access the apis routes",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`,
        description: "development server"
      },
      {
        url: `http://stage.api/api/v1`,
        description: "staging server"
      },
      {
        url: `http://prod.api/api/v1`,
        description: "production server"
      }
    ]
  },
  apis: ["./src/controller/**/*.swagger.yaml"]
};
