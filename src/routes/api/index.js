import { Router } from "express";
const routes = Router();

routes.use("/user", require("@/routes/api/User/User.routes").default);
export default routes;
