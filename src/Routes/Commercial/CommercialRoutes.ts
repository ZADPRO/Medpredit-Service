import express from "express";

const {
  UserLoginController,
  UserSignUpController,
  handleMultipleUserSigninController,
  getUserController,
  userUpdateController
} = require("../../Controller/Commercial/CommercialController");

const CommercialRoutes = express.Router();

CommercialRoutes.post("/usersignin", UserLoginController);

CommercialRoutes.post("/usersignup", UserSignUpController);

CommercialRoutes.post(
  "/handleMultipleUserSignin",
  handleMultipleUserSigninController
);

CommercialRoutes.post("/getUsers", getUserController);

CommercialRoutes.post("/userupdate", userUpdateController);


export default CommercialRoutes;