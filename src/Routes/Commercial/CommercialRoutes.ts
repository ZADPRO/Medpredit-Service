import express from "express";

const {
  verifyToken,
} = require("../../Controller/Authentication/AuthenticationControllers");

const {
  UserLoginController,
  UserSignUpController,
  handleMultipleUserSigninController,
  getUserController,
  userUpdateController,
  deleteMultipleUserController,
  changeUserIdController,
  getAllValidPackageController,
} = require("../../Controller/Commercial/CommercialController");

const CommercialRoutes = express.Router();

CommercialRoutes.post("/usersignin", UserLoginController);

CommercialRoutes.post("/usersignup", UserSignUpController);

CommercialRoutes.post(
  "/handleMultipleUserSignin",
  verifyToken,
  handleMultipleUserSigninController
);

CommercialRoutes.post("/getUsers", verifyToken, getUserController);

CommercialRoutes.post("/userupdate", verifyToken, userUpdateController);

CommercialRoutes.post(
  "/deleteMultipleUser",
  verifyToken,
  deleteMultipleUserController
);

CommercialRoutes.post("/changeUserId", verifyToken, changeUserIdController);

CommercialRoutes.post(
  "/getAllValidPackage",
  verifyToken,
  getAllValidPackageController
);

export default CommercialRoutes;
