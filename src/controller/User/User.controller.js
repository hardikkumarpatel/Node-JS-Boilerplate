import { StatusCodes } from "http-status-codes";
import { ApiAsyncHelper, ApiResponseHelper } from "@/helpers";

class UserController {
  constructor() {}

  static getUsersController = ApiAsyncHelper.AsyncHandlerHelper(async (req, res) => {
    return res
      .status(StatusCodes.OK)
      .json(new ApiResponseHelper(StatusCodes.OK, "Users fetched successfully", []));
  });
}

export default UserController;
