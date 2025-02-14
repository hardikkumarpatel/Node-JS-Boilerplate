import { ApiAsyncHelper, ApiErrorResponseHelper, PermissionsHelper } from "@/helpers";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

class ApiRoleMiddleware {
  static role = (permission) =>
    ApiAsyncHelper.AsyncHandlerHelper(async (req, res, next) => {
      const role = req?.entity?.user ? "bold" : "ANONYMOUES";
      const permissions = await new PermissionsHelper().getPermissionsByRoleName(role);
      if (permissions.includes(permission)) {
        return next();
      }

      return res
        .status(StatusCodes.FORBIDDEN)
        .json(
          new ApiErrorResponseHelper(
            StatusCodes.FORBIDDEN,
            "Access denied! you don't have permission to access this route",
            getReasonPhrase(StatusCodes.FORBIDDEN)
          )
        );
    });
}

export default ApiRoleMiddleware;
