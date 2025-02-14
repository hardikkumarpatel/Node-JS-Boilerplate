import { Router } from "express";
const routes = Router();

routes.use("/api/v1", require("@/routes/api/index").default);
export default routes;
