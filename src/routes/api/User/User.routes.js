import { Router } from "express";
import { UserController } from "@/controller";
import { ApiAuthMiddleware, ApiRoleMiddleware } from "@/middleware";
import UploadMiddleware from "@/middleware/common/Upload.middleware";
import { Permissions } from "@/constant";
const UserRoutes = Router();

UserRoutes.use(ApiAuthMiddleware.use);
UserRoutes.route("/create").get(
  ApiRoleMiddleware.role(Permissions.READ),
  UploadMiddleware.upload.single("file"),
  UserController.getUsersController
);
export default UserRoutes;
