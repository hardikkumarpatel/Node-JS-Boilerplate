import { body } from "express-validator";

class UserValidator {
  constructor() {}

  static loginUserValidator = () => {
    return [
      body("email")
        .trim()
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email please use the correct email format: mailto:user@example.com"),
      body("password").trim().notEmpty().withMessage("password is required")
    ];
  };
}

export default UserValidator;
