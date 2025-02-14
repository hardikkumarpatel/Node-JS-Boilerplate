import { Router } from "express";
import { UserController } from "@/controller";
import { ApiAuthMiddleware, ApiRoleMiddleware } from "@/middleware";
import { Permissions } from "@/config/role/Roles.config";
import UploadMiddleware from "@/middleware/common/Upload.middleware";
const UserRoutes = Router();

UserRoutes.use(ApiAuthMiddleware.use);
UserRoutes.route("/create").get(
  ApiRoleMiddleware.role(Permissions.READ),
  UploadMiddleware.upload.single("file"),
  UserController.getUsersController
);
export default UserRoutes;
