import { encrypt } from "../../Helper/Encryption";
const bcrypt = require("bcrypt");
const { CurrentTime } = require("../../Helper/CurrentTime");

import {
  checkPatientMapModel,
  addPatientMapModel,
  getCurrentReportDataModel,
  createReportModel,
  getPastReportDataModel,
  getCurrentReportPDFModel,
  getPastReportPDFModel,
} from "../../Models/Doctor/DoctorModel";

const checkPatientMapController = async (req, res) => {
  try {
    const { patientId, employeeId, hospitalId } = req.body;

    let doctorId = req.userData.userid;

    if (employeeId) {
      doctorId = employeeId;
    }

    const result = await checkPatientMapModel(doctorId, patientId, hospitalId);

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    logger.error(
      `Check Paitnet Map (checkPatientMapController) Error: (${error})`
    );
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const addPatientMapController = async (req, res) => {
  try {
    const { patientId, employeeId, hospitalId } = req.body;

    let doctorId = req.userData.userid;

    if (employeeId) {
      doctorId = employeeId;
    }

    const result = await addPatientMapModel(doctorId, patientId, hospitalId);
    logger.info(`Add Patient (${patientId}) Map for (${doctorId})`);
    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    logger.error(`Add Patient (addPatientMapController) Error: (${error})`);
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getCurrentReportDataController = async (req, res) => {
  try {
    const { employeeId, patientId, hospitalId } = req.body;

    let doctorId = employeeId;

    if (!doctorId) {
      doctorId = req.userData.userid;
    }

    const result = await getCurrentReportDataModel(
      doctorId,
      patientId,
      hospitalId
    );

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    logger.error(
      `Get Current Report (getCurrentReportDataController) Error: (${error})`
    );
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" + error });
  }
};

const createReportController = async (req, res) => {
  try {
    const { patientId, employeeId, hospitalId } = req.body;

    let doctorId = employeeId;

    if (!employeeId) {
      doctorId = req.userData.userid;
    }

    const result = await createReportModel(
      patientId,
      doctorId,
      hospitalId,
      req.userData.userid
    );

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

const getPastReportDataController = async (req, res) => {
  try {
    const { patientId, employeeId, reportDate } = req.body;

    let doctorId = employeeId;

    if (!employeeId) {
      doctorId = req.userData.userid;
    }

    console.log(patientId, doctorId, reportDate);

    const result = await getPastReportDataModel(
      patientId,
      doctorId,
      reportDate
    );

    return res.status(200).json(encrypt(result, true));
  } catch (error) {
    logger.error(
      `Get Past Report (getPastReportDataController) Error: (${error})`
    );
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" + error });
  }
};

const getReportPDFController = async (req, res) => {
  try {
    const { patientId, roleType, reportDate } = req.body;

    let doctorId = "0";

    if (roleType === "4" || "1") {
      doctorId = req.userData.userid;
    }

    // if (type === "currentReport") {
    const result = await getCurrentReportPDFModel(
      patientId,
      reportDate,
      doctorId
    );

    return res.status(200).json(encrypt(result, true));
    // } else if (type === "pastReport") {
    //   const result = await getPastReportPDFModel(
    //     patientId,
    //     refPMId,
    //     fromDate,
    //     toDate
    //   );

    //   return res.status(200).json(encrypt(result, true));
    // }
  } catch (error) {
    logger.error(`Get Report PDF (getReportPDFController) Error: (${error})`);
    console.error("Something went Wrong");
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

module.exports = {
  checkPatientMapController,
  addPatientMapController,
  getCurrentReportDataController,
  createReportController,
  getPastReportDataController,
  getReportPDFController,
};
