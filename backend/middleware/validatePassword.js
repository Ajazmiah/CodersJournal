import { check, body } from "express-validator";
export const validatePassword = [
  body(
    "password",
    "Make sure password is at least 8 characters long and contains only letters, numbers, and these special characters [!, &, @, _, ]"
  )
    .isLength({ min: 8 })
    .matches(/^[A-Za-z0-9 .,'!&@_]+$/),
];

export const validateEmail = [
  check("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
];

export const validateConfirmPassword = body("confirmPassword").custom(
  (value, { req }) => {
    if (value !== req.body.confirmPassword) {
      throw new Error("Password and confirm password must match");
    } else {
      return true;
    }
  }
);
