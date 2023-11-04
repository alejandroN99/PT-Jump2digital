import express from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import {
  getAllSkins,
  buySkin,
  mySkins,
  otherColor,
  deleteSkin,
  getSkin,
} from "../controllers/skin.controller";
import { validarToken } from "../middlewares/validar_token";

export const router = express.Router();

router.get("/available", validarToken, getAllSkins);

router.post("/buy", validarToken, buySkin);

router.get("/myskins", validarToken, mySkins);

router.put(
  "/color",
  [
    validarToken,
    check("color", "The color is required").not().isEmpty(),
    check("name", "The color is required").not().isEmpty(),
    validarCampos,
  ],
  otherColor
);

router.delete(
  "/delete/:id",
  [
    validarToken,
    check("id", "The mongo id is required").isMongoId(),
    validarCampos,
  ],
  deleteSkin
);

router.get(
  "/getskin/:id",
  [
    validarToken,
    check("id", "The mongo id is required").isMongoId(),
    validarCampos,
  ],
  getSkin
);
