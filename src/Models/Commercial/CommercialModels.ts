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
  postActiveQuery,
  userParticularSiginQuery,
  usersigninQuery,
} from "../Authentication/AuthenticationQuery";
import {
  changeHeadUserQuery,
  changeUserpostActiveQuery,
  communicationUpdateQuery,
  getAllValidPackageQuery,
  getUserQuery,
  userUpdateQuery,
} from "./CommercialQuery";

const DB = require("../../Helper/DBConncetion");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const logger = require("../../Helper/Logger");

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
            isDetails: result.rows[0].refOccupationLvl === "-" ? true : false,
            token: accessToken,
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
        "true",
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

export const getUserModel = async (userId: any) => {
  const connection = await DB();
  try {
    const values = [userId];
    // console.log("values", values);

    const result = await connection.query(getUserQuery, values);
    // console.log("result", result);

    return {
      status: true,
      result: result.rows,
    };
  } catch (error) {
    console.error("Error in DB:", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const userUpdateModel = async (id: any, values: any) => {
  const connection = await DB();

  try {
    const updateValues = [
      values.refUserFname,
      values.refUserLname,
      values.refDOB,
      values.refGender,
      values.refMaritalStatus,
      values.refEducation,
      values.refOccupationLvl,
      values.refSector,
      values.activeStatus,
      values.updatedBy,
      id,
    ];

    const updateCommuniction = [
      values.refUserEmail,
      values.refAddress,
      values.refDistrict,
      values.refPincode,
      id,
    ];
    console.log("updateValues", updateValues);
    await connection.query(userUpdateQuery, updateValues);
    // console.log('userupdate', userupdate)
    await connection.query(communicationUpdateQuery, updateCommuniction);
    // console.log('communicationUpdate', communicationUpdate)

    return {
      status: true,
      message: "update user Successfull",
      // userResult: userupdate.rows[0],
      // communicationResult: communicationUpdate.rows,
    };
  } catch (error) {
    logger.error(`User update failed for user ID: ${id}, Error: ${error}`);
    throw error;
  } finally {
    await connection.end();
  }
};

export const deleteMultipleUserModel = async (
  id: any,
  updatedAt: any,
  updatedBy: any
) => {
  const connection = await DB();

  try {
    await Promise.all(
      id.map((element: any) =>
        connection.query(postActiveQuery, [
          "inactive",
          updatedAt,
          updatedBy,
          element,
        ])
      )
    );

    return {
      status: true,
    };
  } catch (error) {
    logger.error(
      `All user Delete Fail (deleteMultipleUserModel) : ${id}, Error: ${error}`
    );
    throw error;
  } finally {
    await connection.end();
  }
};

export const changeUserIdModel = async (
  id: any,
  headUserId: any,
  updatedAt: any,
  updatedBy: any
) => {
  const connection = await DB();
  try {
    //Delete the User
    await connection.query(changeUserpostActiveQuery, [
      "inactive",
      updatedAt,
      updatedBy,
      "false",
      id,
    ]);

    // Change the Head User
    await connection.query(changeHeadUserQuery, [
      "true",
      updatedAt,
      updatedBy,
      headUserId,
    ]);

    return {
      status: true,
    };
  } catch (error) {
    logger.error(`Changr the User and Delete: ${id}, Error: ${error}`);
    throw error;
  } finally {
    await connection.end();
  }
};

export const getAllValidPackageModel = async (currentDate: any) => {
  const connection = await DB();
  try {
    const result = await connection.query(getAllValidPackageQuery, [
      currentDate,
    ]);

    return {
      result: result.rows,
      status: true,
    };
  } catch (error) {
    logger.error(`Getting the Package for user, Error: ${error}`);
    throw error;
  } finally {
    await connection.end();
  }
};
