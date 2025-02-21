import express from "express";

const {
  UserLoginController,
  UserSignUpController,
  handleMultipleUserSigninController,
} = require("../../Controller/Commercial/CommercialController");

const CommercialRoutes = express.Router();

CommercialRoutes.post("/usersignin", UserLoginController);

CommercialRoutes.post("/usersignup", UserSignUpController);

CommercialRoutes.post(
  "/handleMultipleUserSignin",
  handleMultipleUserSigninController
);

export default CommercialRoutes;
