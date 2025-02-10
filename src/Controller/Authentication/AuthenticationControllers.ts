import {
  addAssistantMapModels,
  changePasswordModel,
  getDoctorMapListModels,
  getUserListModel,
  handleUserSigninModel,
  postActiveStatus,
  signUpDoctorsModels,
  usersigninModel,
  verifyEnteruserDataModel,
} from "../../Models/Authentication/AuthenticationModels";
import { encrypt } from "../../Helper/Encryption";
import { CurrentTime } from "../../Helper/CurrentTime";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usersignin = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Hello");

    const result = await usersigninModel(username, password);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong", error);
    return res.status(500).json({ error: "Something went Wrong" + error });
  }
};

const handleUserSigninController = async (req, res) => {
  try {
    const { username, password, userId } = req.body;

    const result = await handleUserSigninModel(username, password, userId);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong", error);
    return res.status(500).json({ error: "Something went Wrong" + error });
  }
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(200).json({ message: "tokenformateinvalid" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status(200).json({ message: "timeexpired" });
    req.userData = user;
    next();
  });
};

const verifyEnteruserData = async (req, res) => {
  // console.log(req.userData.userid);

  const userId = req.userData.userid;

  try {
    const { roleType } = req.body;

    const result = await verifyEnteruserDataModel(roleType, userId);

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong --44" });
  }
};

const changePasswordController = async (req, res) => {
  try {
    const { pastPassword, currentPassword, roleId } = req.body;

    const result = await changePasswordModel(
      req.userData.userid,
      pastPassword,
      currentPassword,
      roleId
    );

    console.log(result);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong " });
  }
};

const getUserListController = async (req, res) => {
  try {
    const { roleId, hospitalId } = req.body;

    const result = await getUserListModel(roleId, hospitalId);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const signUpDoctorsControllers = async (req, res) => {
  try {
    const {
      refRoleId,
      refUserFname,
      refUserLname,
      refUserEmail,
      refUserPassword,
      refGender,
      refMaritalStatus,
      refDOB,
      refAddress,
      refDistrict,
      refPincode,
      refUserMobileno,
      allopathic,
      education,
      educationSpecialization,
      superSpecialization,
      supSpecialization,
      additionalDegree,
      degreeType,
      degreeSpecialization,
      medicalCouncil,
      mciRegisteredNo,
      typeHealthcare,
      instituteType,
      nameInstitute,
      designation,
      department,
      instituteAddress,
      previousWork,
      hospitalId,
      selectedUsers,
    } = req.body;

    const createdBy = req.userData.userid;
    const createdAt = CurrentTime();

    const hashedPassword = await bcrypt.hash(refUserPassword, 10);

    const values = {
      refRoleId: refRoleId,
      refUserFname: refUserFname,
      refUserLname: refUserLname,
      refUserEmail: refUserEmail,
      refUserPassword: refUserPassword,
      hashedPassword: hashedPassword,
      refGender: refGender,
      refMaritalStatus: refMaritalStatus,
      refDOB: refDOB,
      refAddress: refAddress,
      refDistrict: refDistrict,
      refPincode: refPincode,
      refUserMobileno: refUserMobileno,
      allopathic: allopathic,
      education: education,
      educationSpecialization: educationSpecialization,
      superSpecialization: superSpecialization,
      supSpecialization: supSpecialization,
      additionalDegree: additionalDegree,
      degreeType: degreeType,
      degreeSpecialization: degreeSpecialization,
      medicalCouncil: medicalCouncil,
      mciRegisteredNo: mciRegisteredNo,
      typeHealthcare: typeHealthcare,
      instituteType: instituteType,
      nameInstitute: nameInstitute,
      designation: designation,
      department: department,
      instituteAddress: instituteAddress,
      previousWork: previousWork,
      createdBy: createdBy,
      createdAt: createdAt,
      hospitalId: hospitalId,
      selectedUsers: selectedUsers,
    };

    const result = await signUpDoctorsModels(values);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getDoctorMapListControllers = async (req, res) => {
  try {
    const { hospitalId, assistantId } = req.body;

    const result = await getDoctorMapListModels(hospitalId, assistantId);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const addAssistantMapController = async (req, res) => {
  try {
    const createdAt = CurrentTime();
    const createdBy = req.userData.userid;

    const { doctorId, assistantId } = req.body;

    const result = await addAssistantMapModels(
      doctorId,
      assistantId,
      createdAt,
      createdBy
    );

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const postActiveStatusController = async (req, res) => {
  try {
    const updatedAt = CurrentTime();
    const updatedBy = req.userData.userid;

    const { doctorId, value } = req.body;

    const result = await postActiveStatus(
      doctorId,
      value,
      updatedAt,
      updatedBy
    );

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

module.exports = {
  usersignin,
  verifyToken,
  verifyEnteruserData,
  changePasswordController,
  signUpDoctorsControllers,
  getUserListController,
  getDoctorMapListControllers,
  addAssistantMapController,
  postActiveStatusController,
  handleUserSigninController,
};
