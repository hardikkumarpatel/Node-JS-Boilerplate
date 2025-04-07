import { Router } from "express";
const routes = Router();

class Routes {
  static getRoutes() {
    routes.use("/user", require("@/routes/User.routes").default);
    return routes;
  }
}

export default Routes;
