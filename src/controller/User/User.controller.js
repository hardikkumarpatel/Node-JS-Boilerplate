import { StatusCodes } from "http-status-codes";
import { ApiAsyncHelper } from "@/helpers";
import BaseController from "@/controller/Base/BaseController";

class UserController extends BaseController {
  static getUsersController = ApiAsyncHelper.AsyncHandler(async (req, res) => {
    return this.SuccessResponse(res, StatusCodes.OK, "Users fetched successfully", []);
  });
}

export default UserController;
