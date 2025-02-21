import { encrypt } from "../../Helper/Encryption";
import { CurrentTime } from "../../Helper/CurrentTime";
import {
  handleMultipleUserSigninModel,
  UserLoginModel,
  UserSignUpModel,
} from "../../Models/Commercial/CommercialModels";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../../Helper/Logger");

const UserLoginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Hello");

    const result = await UserLoginModel(username, password);

    logger.info(`User Signed In (${username})`);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong", error);

    logger.error(`User Signed In Error: (${error})`);
    return res.status(500).json({ error: "Something went Wrong" + error });
  }
};

const UserSignUpController = async (req, res) => {
  try {
    const {
      refUserFname,
      refUserLname,
      refUserEmail,
      refUserPassword,
      refDOB,
      refMaritalStatus,
      refEducation,
      refProfession,
      refSector,
      refAddress,
      refDistrict,
      refPincode,
      refUserMobileno,
      refGender,
    } = req.body;

    const salt = 10;

    const hashedPassword = await bcrypt.hash(refUserPassword, salt);

    // const HigherUser = req.userData.userid;
    // const hospitalId = req.userData ? req.userData.hospitalid : "self";

    const createdBy = req.userData ? req.userData.userid : "self";
    const createdAt = CurrentTime();

    const values = {
      refUserFname,
      refUserLname,
      refUserEmail,
      refUserPassword,
      hashedPassword,
      refDOB,
      refMaritalStatus,
      refEducation,
      refProfession,
      refSector,
      refAddress,
      refDistrict,
      refPincode,
      refUserMobileno,
      createdBy,
      createdAt,
      refGender,
    };

    if (!refUserPassword) {
      console.error("Password is missing in the request body");
      return res.status(400).json({ error: "Password is required" });
    }

    const result = await UserSignUpModel(values);

    logger.info(`New User (${refUserMobileno}) Created by : (self)`);
    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    logger.error(
      `New Patient Create (postNewPatientController) Error: (${error})`
    );
    console.error("Something went Wrong", error);
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const handleMultipleUserSigninController = async (req, res) => {
  try {
    const { username, password, userId } = req.body;

    const result = await handleMultipleUserSigninModel(
      username,
      password,
      userId
    );

    logger.info(`User Signed In (${username})`);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    logger.error(`User Signed In Error: (${error})`);
    console.error("Something went Wrong", error);
    return res.status(500).json({ error: "Something went Wrong" + error });
  }
};

module.exports = {
  UserLoginController,
  UserSignUpController,
  handleMultipleUserSigninController,
};
