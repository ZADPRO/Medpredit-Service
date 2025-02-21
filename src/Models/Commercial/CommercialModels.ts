import { CurrentTime } from "../../Helper/CurrentTime";
import { encrypt } from "../../Helper/Encryption";
import { postNewPatientModels } from "../Assistant/AssistantModels";
import {
  checkMobileNumberQuery,
  getUserId,
  nextUserId,
  overAllId,
  postnewCommunication,
  postNewUser,
  postnewUserDomain,
} from "../Assistant/AssistantQuery";
import {
  userParticularSiginQuery,
  usersigninQuery,
} from "../Authentication/AuthenticationQuery";

const DB = require("../../Helper/DBConncetion");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

export const UserLoginModel = async (username: string, password: string) => {
  const connection = await DB();

  try {
    const values = [username];

    const result = await connection.query(usersigninQuery, values);

    if (result.rows.length > 0) {
      const hashpass = result.rows[0].refUserHashedpass;

      const passStatus = await bcrypt.compare(password, hashpass);

      const accessToken = jwt.sign(
        {
          userid: result.rows[0].refUserId,
          branch: "commercial",
        },
        process.env.ACCESS_TOKEN
      );

      if (passStatus) {
        if (result.rows[0].refRoleId === 3) {
          return {
            status: true,
            message: "Signin Successfull",
            roleType: result.rows[0].refRoleId,
            users: result.rows,
            token: result.rows.length === 1 ? accessToken : null,
            action: result.rows.length === 1 ? "single" : "multiple",
          };
        } else
          return { status: false, message: "Invalid Username or Password" };
      } else {
        return { status: false, message: "Invalid Username or Password" };
      }
    } else {
      return { status: false, message: "Invalid Username or Password" };
    }
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const UserSignUpModel = async (values: any) => {
  const connection = await DB();
  try {
    const nextUserIdData = await connection.query(nextUserId);

    await connection.query("BEGIN;");

    const checkMobileNumber = await connection.query(checkMobileNumberQuery, [
      values.refUserMobileno,
    ]);

    if (checkMobileNumber.rows.length < 1) {
      const patientId =
        100000 +
        parseInt(
          nextUserIdData.rows[0].nextrefusercustid
            ? nextUserIdData.rows[0].nextrefusercustid
            : 1
        );

      const getOverallId = await connection.query(overAllId);

      const newUservaluesInsert = [
        getOverallId.rows[0].overAllId,
        "USER" + patientId,
        "3",
        values.refUserFname,
        values.refUserLname,
        values.refDOB,
        values.refGender,
        values.refMaritalStatus,
        values.refEducation,
        values.refProfession,
        values.refSector,
        "active",
        values.createdAt,
        values.createdBy,
      ];

      await connection.query(postNewUser, newUservaluesInsert);

      //   const getuseridVal = await connection.query(getUserId, [
      //     "USER" + patientId,
      //   ]);

      const newrefCommunicationValue = [
        getOverallId.rows[0].overAllId,
        values.refUserMobileno,
        values.refUserEmail,
        values.refAddress,
        values.refDistrict,
        values.refPincode,
        values.createdAt,
        values.createdBy,
      ];

      await connection.query(postnewCommunication, newrefCommunicationValue);

      const newUserDomainValue = [
        getOverallId.rows[0].overAllId,
        values.refUserPassword,
        values.hashedPassword,
        values.createdAt,
        values.createdBy,
      ];

      await connection.query(postnewUserDomain, newUserDomainValue);

      return {
        status: true,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    await connection.query("ROLLBACK;");
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.query("COMMIT;");
    await connection.end();
  }
};

export const handleMultipleUserSigninModel = async (
  username,
  password,
  userId
) => {
  const connection = await DB();

  try {
    const values = [username, userId];

    const result = await connection.query(userParticularSiginQuery, values);

    if (result.rows.length > 0) {
      const hashpass = result.rows[0].refUserHashedpass;

      const passStatus = await bcrypt.compare(password, hashpass);

      const accessToken = jwt.sign(
        {
          userid: result.rows[0].refUserId,
          branch: "commercial",
        },
        process.env.ACCESS_TOKEN
      );

      if (passStatus) {
        return {
          status: true,
          message: "Signin Successfull",
          roleType: result.rows[0].refRoleId,
          token: accessToken,
        };
      } else {
        return { status: false, message: "Invalid Username or Password" };
      }
    } else {
      return { status: false, message: "Invalid Username or Password" };
    }
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};
