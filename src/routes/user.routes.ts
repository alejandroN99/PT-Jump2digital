import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { authUser } from "../controllers/auth.controller";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";

export const routerUser = Router();

routerUser.post(
  "/register",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validarCampos,
  ],
  registerUser
);

routerUser.post(
  "/auth",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validarCampos,
  ],
  authUser
);
