import { log } from "console";
import { calculateAge, getDateOnly } from "../../Helper/CurrentTime";
import { Diabetes } from "../../Helper/Formula/Diagnosis/Diabetes";
import {
  addPatientTransactionQuery,
  addUserScoreDetailsQuery,
  getCurrentInvestigation,
  getLatestPTIdQuery,
  getTreatmentDetails,
} from "../Assistant/AssistantQuery";
import {
  getAllCategoryFamilyHistory,
  getAllCategoryQuery,
  getAllScoreQuery,
  getAllScoreVerifyQuery,
  getDiagnosisQuery,
  getDiagnosisTreatmentQuery,
  getDoctorDetailsReport,
  getParticualarScoreQuery,
  getPatientDetailsReport,
  getScoreReport,
  getScoreVerifyReport,
  getStressAnswerQuery,
} from "./DoctorQuery";
const DB = require("../../Helper/DBConncetion");

const {
  checkPatientMapQuery,
  addPatientMapQuery,
  getDoctorMap,
  getPatientDetail,
  getDoctorPatientMapQuery,
} = require("./DoctorQuery");

const { CurrentTime } = require("../../Helper/CurrentTime");

export const checkPatientMapModel = async (
  doctorId: any,
  patientId: any,
  hospitalId: any
) => {
  const connection = await DB();

  try {
    const values = [doctorId, patientId, hospitalId];

    const result = await connection.query(checkPatientMapQuery, values);

    return {
      status: result.rows.length > 0 ? true : false,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const addPatientMapModel = async (
  doctorId: any,
  patientId: any,
  hospitalId: any
) => {
  const connection = await DB();

  try {
    const createdAt = CurrentTime();

    const hospitalID = hospitalId;

    const getDoctorHospitalMap = await connection.query(getDoctorMap, [
      hospitalID,
      doctorId,
    ]);

    const values = [
      getDoctorHospitalMap.rows[0].refDMId,
      patientId,
      createdAt,
      doctorId,
    ];

    await connection.query(addPatientMapQuery, values);

    return {
      status: true,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const getCurrentReportDataModel = async (
  doctorId: any,
  patientId: any,
  hospitalId: any
) => {
  const connection = await DB();

  const refPTcreatedDate = getDateOnly();

  try {
    const doctorIdResult = await connection.query(getDoctorMap, [
      hospitalId,
      doctorId,
    ]);

    const patientIdResult = await connection.query(getPatientDetail, [
      patientId,
    ]);

    const doctor = doctorIdResult.rows[0];

    const patient = patientIdResult.rows[0];

    const getAllCategoryResult = await connection.query(getAllCategoryQuery);

    const getAllScoreResult = await connection.query(getAllScoreQuery, [
      patientId,
      doctorId,
    ]);

    const getAllScoreVerify = await connection.query(getAllScoreVerifyQuery);

    const getStressAnswer = await connection.query(getStressAnswerQuery);

    const TreatmentDetails = await connection.query(getTreatmentDetails, [
      patientId,
      doctorId,
      refPTcreatedDate,
    ]);

    const rbs = await connection.query(getCurrentInvestigation, [
      patientId,
      "202",
      refPTcreatedDate,
    ]);

    const fbs = await connection.query(getCurrentInvestigation, [
      patientId,
      "203",
      refPTcreatedDate,
    ]);

    const ppbs = await connection.query(getCurrentInvestigation, [
      patientId,
      "204",
      refPTcreatedDate,
    ]);

    const ogtt = await connection.query(getCurrentInvestigation, [
      patientId,
      "205",
      refPTcreatedDate,
    ]);

    const gct = await connection.query(getCurrentInvestigation, [
      patientId,
      "206",
      refPTcreatedDate,
    ]);

    const hba1c = await connection.query(getCurrentInvestigation, [
      patientId,
      "207",
      refPTcreatedDate,
    ]);

    const fastingcholesterol = await connection.query(getCurrentInvestigation, [
      patientId,
      "213",
      refPTcreatedDate,
    ]);

    const fastingtriglycerides = await connection.query(
      getCurrentInvestigation,
      [patientId, "214", refPTcreatedDate]
    );

    const hdl = await connection.query(getCurrentInvestigation, [
      patientId,
      "215",
      refPTcreatedDate,
    ]);

    const ldl = await connection.query(getCurrentInvestigation, [
      patientId,
      "216",
      refPTcreatedDate,
    ]);

    const tchdl = await connection.query(getCurrentInvestigation, [
      patientId,
      "217",
      refPTcreatedDate,
    ]);

    const kr = await connection.query(getCurrentInvestigation, [
      patientId,
      "225",
      refPTcreatedDate,
    ]);

    const kl = await connection.query(getCurrentInvestigation, [
      patientId,
      "228",
      refPTcreatedDate,
    ]);

    const echo = await connection.query(getCurrentInvestigation, [
      patientId,
      "231",
      refPTcreatedDate,
    ]);

    const cortico = await connection.query(getCurrentInvestigation, [
      patientId,
      "234",
      refPTcreatedDate,
    ]);

    const bloodurea = await connection.query(getCurrentInvestigation, [
      patientId,
      "218",
      refPTcreatedDate,
    ]);

    const serum = await connection.query(getCurrentInvestigation, [
      patientId,
      "219",
      refPTcreatedDate,
    ]);

    const egfr = await connection.query(getCurrentInvestigation, [
      patientId,
      "220",
      refPTcreatedDate,
    ]);

    const urinesugar = await connection.query(getCurrentInvestigation, [
      patientId,
      "221",
      refPTcreatedDate,
    ]);

    const urinealbumin = await connection.query(getCurrentInvestigation, [
      patientId,
      "222",
      refPTcreatedDate,
    ]);

    const urineketones = await connection.query(getCurrentInvestigation, [
      patientId,
      "223",
      refPTcreatedDate,
    ]);

    return {
      doctorDetail: {
        doctorName: doctor.refUserFname + " " + doctor.refUserLname,
        doctorId: doctor.refUserCustId,
        hospital: doctor.refHospitalName,
        hospitalAddress:
          doctor.refHospitalAddress + ", " + doctor.refHospitalPincode,
      },
      patientDetail: {
        patientName: patient.refUserFname + " " + patient.refUserLname,
        patientId: patient.refUserCustId,
        gender: patient.refGender,
        age: calculateAge(patient.refDOB),
        address1: patient.refAddress,
        address2: patient.refDistrict + ", " + patient.refPincode,
      },
      allCategory: getAllCategoryResult.rows,
      allScore: getAllScoreResult.rows,
      allScoreVerify: getAllScoreVerify.rows,
      stressAnswer: getStressAnswer.rows,
      treatmentDetails: TreatmentDetails.rows,
      rbs: rbs.rows,
      fbs: fbs.rows,
      ppbs: ppbs.rows,
      ogtt: ogtt.rows,
      gct: gct.rows,
      hba1c: hba1c.rows,
      fastingcholesterol: fastingcholesterol.rows,
      fastingtriglycerides: fastingtriglycerides.rows,
      hdl: hdl.rows,
      ldl: ldl.rows,
      tchdl: tchdl.rows,
      kr: kr.rows,
      kl: kl.rows,
      echo: echo.rows,
      cortico: cortico.rows,
      bloodurea: bloodurea.rows,
      serum: serum.rows,
      egfr: egfr.rows,
      urinesugar: urinesugar.rows,
      urinealbumin: urinealbumin.rows,
      urineketones: urineketones.rows,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const createReportModel = async (
  patientId: any,
  doctorId: any,
  hospitalId: any,
  employee: any
) => {
  const connection = await DB();
  try {
    const refPTcreatedDate = getDateOnly();

    const scoreResult = await connection.query(getDiagnosisQuery, [
      refPTcreatedDate,
      patientId,
    ]);

    const treatmentDetails = await connection.query(
      getDiagnosisTreatmentQuery,
      [refPTcreatedDate, patientId]
    );

    const diabetesResult = Diabetes(
      scoreResult.rows,
      treatmentDetails.rows[0].treatementdetails
    );

    let score = [diabetesResult];
    let multiCategoryId = ["237"];

    const createdAt = CurrentTime();

    const map = await connection.query(checkPatientMapQuery, [
      doctorId,
      patientId,
      hospitalId,
    ]);

    const mapId = map.rows[0].refPMId;

    const getlatestPTId = await connection.query(getLatestPTIdQuery);

    let lastestPTId = 1;

    if (getlatestPTId.rows.length > 0) {
      lastestPTId = parseInt(getlatestPTId.rows[0].refPTId) + 1;
    }

    let latestval = lastestPTId;

    await Promise.all(
      score.map(async (element, index) => {
        console.log(lastestPTId + index, element, multiCategoryId[index]);

        await connection.query(addPatientTransactionQuery, [
          lastestPTId + index,
          mapId,
          element,
          "1",
          refPTcreatedDate,
          createdAt,
          employee,
        ]);

        await connection.query(addUserScoreDetailsQuery, [
          lastestPTId + index,
          multiCategoryId[index],
          createdAt,
          employee,
        ]);

        latestval += 1;
      })
    );

    const patientMapId = await connection.query(getDoctorPatientMapQuery, [
      patientId,
      doctorId,
      hospitalId,
    ]);

    const PTcreatedDate = getDateOnly();

    const createdBy = employee;

    await connection.query(addPatientTransactionQuery, [
      latestval,
      patientMapId.rows[0].refPMId,
      "0",
      "1",
      PTcreatedDate,
      createdAt,
      createdBy,
    ]);

    await connection.query(addUserScoreDetailsQuery, [
      latestval,
      "0",
      createdAt,
      createdBy,
    ]);

    return {
      status: true,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const getPastReportDataModel = async (
  patientId: any,
  doctorId: any,
  hospitalId: any,
  reportDate: any
) => {
  const connection = await DB();
  try {
    const doctorIdResult = await connection.query(getDoctorMap, [
      hospitalId,
      doctorId,
    ]);

    const patientIdResult = await connection.query(getPatientDetail, [
      patientId,
    ]);

    const doctor = doctorIdResult.rows[0];

    const patient = patientIdResult.rows[0];

    const getAllCategoryResult = await connection.query(getAllCategoryQuery);

    console.log(patientId, doctorId, hospitalId, reportDate);
    const getAllScoreResult = await connection.query(getParticualarScoreQuery, [
      patientId,
      doctorId,
      hospitalId,
      reportDate,
    ]);

    const getAllScoreVerify = await connection.query(getAllScoreVerifyQuery);

    const getStressAnswer = await connection.query(getStressAnswerQuery);

    const TreatmentDetails = await connection.query(getTreatmentDetails, [
      patientId,
      doctorId,
      reportDate,
    ]);

    let refPTcreatedDate = reportDate;

    const rbs = await connection.query(getCurrentInvestigation, [
      patientId,
      "202",
      refPTcreatedDate,
    ]);

    const fbs = await connection.query(getCurrentInvestigation, [
      patientId,
      "203",
      refPTcreatedDate,
    ]);

    const ppbs = await connection.query(getCurrentInvestigation, [
      patientId,
      "204",
      refPTcreatedDate,
    ]);

    const ogtt = await connection.query(getCurrentInvestigation, [
      patientId,
      "205",
      refPTcreatedDate,
    ]);

    const gct = await connection.query(getCurrentInvestigation, [
      patientId,
      "206",
      refPTcreatedDate,
    ]);

    const hba1c = await connection.query(getCurrentInvestigation, [
      patientId,
      "207",
      refPTcreatedDate,
    ]);

    const fastingcholesterol = await connection.query(getCurrentInvestigation, [
      patientId,
      "213",
      refPTcreatedDate,
    ]);

    const fastingtriglycerides = await connection.query(
      getCurrentInvestigation,
      [patientId, "214", refPTcreatedDate]
    );

    const hdl = await connection.query(getCurrentInvestigation, [
      patientId,
      "215",
      refPTcreatedDate,
    ]);

    const ldl = await connection.query(getCurrentInvestigation, [
      patientId,
      "216",
      refPTcreatedDate,
    ]);

    const tchdl = await connection.query(getCurrentInvestigation, [
      patientId,
      "217",
      refPTcreatedDate,
    ]);

    const kr = await connection.query(getCurrentInvestigation, [
      patientId,
      "225",
      refPTcreatedDate,
    ]);

    const kl = await connection.query(getCurrentInvestigation, [
      patientId,
      "228",
      refPTcreatedDate,
    ]);

    const echo = await connection.query(getCurrentInvestigation, [
      patientId,
      "231",
      refPTcreatedDate,
    ]);

    const cortico = await connection.query(getCurrentInvestigation, [
      patientId,
      "234",
      refPTcreatedDate,
    ]);

    const bloodurea = await connection.query(getCurrentInvestigation, [
      patientId,
      "218",
      refPTcreatedDate,
    ]);

    const serum = await connection.query(getCurrentInvestigation, [
      patientId,
      "219",
      refPTcreatedDate,
    ]);

    const egfr = await connection.query(getCurrentInvestigation, [
      patientId,
      "220",
      refPTcreatedDate,
    ]);

    const urinesugar = await connection.query(getCurrentInvestigation, [
      patientId,
      "221",
      refPTcreatedDate,
    ]);

    const urinealbumin = await connection.query(getCurrentInvestigation, [
      patientId,
      "222",
      refPTcreatedDate,
    ]);

    const urineketones = await connection.query(getCurrentInvestigation, [
      patientId,
      "223",
      refPTcreatedDate,
    ]);

    return {
      doctorDetail: {
        doctorName: doctor.refUserFname + " " + doctor.refUserLname,
        doctorId: doctor.refUserCustId,
        hospital: doctor.refHospitalName,
        hospitalAddress:
          doctor.refHospitalAddress + ", " + doctor.refHospitalPincode,
      },
      patientDetail: {
        patientName: patient.refUserFname + " " + patient.refUserLname,
        patientId: patient.refUserCustId,
        gender: patient.refGender,
        age: calculateAge(patient.refDOB),
        address1: patient.refAddress,
        address2: patient.refDistrict + ", " + patient.refPincode,
      },
      allCategory: getAllCategoryResult.rows,
      allScore: getAllScoreResult.rows,
      allScoreVerify: getAllScoreVerify.rows,
      stressAnswer: getStressAnswer.rows,
      treatmentDetails: TreatmentDetails.rows,
      rbs: rbs.rows,
      fbs: fbs.rows,
      ppbs: ppbs.rows,
      ogtt: ogtt.rows,
      gct: gct.rows,
      hba1c: hba1c.rows,
      fastingcholesterol: fastingcholesterol.rows,
      fastingtriglycerides: fastingtriglycerides.rows,
      hdl: hdl.rows,
      ldl: ldl.rows,
      tchdl: tchdl.rows,
      kr: kr.rows,
      kl: kl.rows,
      echo: echo.rows,
      cortico: cortico.rows,
      bloodurea: bloodurea.rows,
      serum: serum.rows,
      egfr: egfr.rows,
      urinesugar: urinesugar.rows,
      urinealbumin: urinealbumin.rows,
      urineketones: urineketones.rows,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const getReportPDFModel = async (patientId: any, reportDate: any) => {
  const connection = await DB();
  try {
    console.log(patientId, reportDate);

    const doctorResult = await connection.query(getDoctorDetailsReport, [
      reportDate,
      patientId,
    ]);

    const patientResult = await connection.query(getPatientDetailsReport, [
      reportDate,
      patientId,
    ]);

    const scoreResult = await connection.query(getScoreReport, [
      reportDate,
      patientId,
    ]);

    const scoreVerifyResult = await connection.query(getScoreVerifyReport);

    const categoryResult = await connection.query(getAllCategoryFamilyHistory);

    return {
      status: true,
      doctorDetails: doctorResult.rows[0],
      patientDetails: patientResult.rows[0],
      scoreResult: scoreResult.rows,
      scoreVerifyResult: scoreVerifyResult.rows,
      generateDate: scoreResult.rows[0].refPTcreatedDate,
      categoryResult: categoryResult.rows,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};
