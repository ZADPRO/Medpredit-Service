import { log } from "console";
import { calculateAge, getDateOnly } from "../../Helper/CurrentTime";
import { Diabetes } from "../../Helper/Formula/Diagnosis/Diabetes";
import {
  addPatientTransactionQuery,
  addUserScoreDetailsQuery,
  getCurrentInvestigation,
  getLatestPTIdQuery,
  getPastInvestigation,
  getReportTreatmentDetails,
  getTreatmentDetails,
} from "../Assistant/AssistantQuery";
import {
  getAllCategoryFamilyHistory,
  getAllCategoryQuery,
  getAllScoreQuery,
  getAllScoreVerifyQuery,
  getDiagnosisQuery,
  getDiagnosisTreatmentQuery,
  getDoctorData,
  getDoctorDetailsReport,
  getParticualarScoreQuery,
  getPatientDetailsReport,
  getScoreReport,
  getScoreVerifyReport,
  getStressAnswerQuery,
  getTreatementDetails,
} from "./DoctorQuery";
import { Hypertension } from "../../Helper/Formula/Diagnosis/Hypertension";
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

    console.log("--->>>>-----", doctorId, patientId, hospitalId);

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

    console.log(hospitalID, doctorId);

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
    const patientIdResult = await connection.query(getPatientDetail, [
      patientId,
    ]);

    const patient = patientIdResult.rows[0];

    const getAllCategoryResult = await connection.query(getAllCategoryQuery);

    const getAllScoreResult = await connection.query(getAllScoreQuery, [
      patientId,
      refPTcreatedDate,
    ]);

    const doctorIdResult = await connection.query(getDoctorData, [
      getAllScoreResult.rows[getAllScoreResult.rows.length - 1].refPMId,
    ]);

    // const doctor = doctorIdResult.rows[0];

    // console.log("------->" + doctor);

    const getAllScoreVerify = await connection.query(getAllScoreVerifyQuery);

    const getStressAnswer = await connection.query(getStressAnswerQuery);

    const TreatmentDetails = await connection.query(getTreatmentDetails, [
      patientId,
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
      // doctorDetail: {
      //   doctorName: doctor.doctorname,
      //   doctorId: doctor.doctorid,
      //   hospital: doctor.hospital,
      //   hospitalAddress: doctor.hospitaladdress + ", " + doctor.hospitalpincode,
      // },
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

    // Diabetics Diagnosis
    const scoreResult = await connection.query(getDiagnosisQuery, [
      refPTcreatedDate,
      patientId,
    ]);

    const treatmentDetails = await connection.query(
      getDiagnosisTreatmentQuery,
      [refPTcreatedDate, patientId, "Anti-diabetic"]
    );

    const diabetesResult = Diabetes(
      scoreResult.rows,
      treatmentDetails.rows[0].treatementdetails
    );

    // Hypertension Diagnosis
    const hypertensiontreatmentDetails = await connection.query(
      getDiagnosisTreatmentQuery,
      [refPTcreatedDate, patientId, "Anti-hypertensive"]
    );

    const ageQuery = await connection.query(getPatientDetail, [patientId]);

    const age = calculateAge(ageQuery.rows[0].refDOB);

    const hypertensionResult = Hypertension(
      scoreResult.rows,
      hypertensiontreatmentDetails.rows[0].treatementdetails,
      treatmentDetails.rows[0].treatementdetails,
      age
    );

    console.log(diabetesResult, hypertensionResult);

    let score = [diabetesResult, hypertensionResult];
    let multiCategoryId = ["237", "238"];

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
  reportDate: any
) => {
  const connection = await DB();
  try {
    const patientIdResult = await connection.query(getPatientDetail, [
      patientId,
    ]);

    const patient = patientIdResult.rows[0];

    const getAllCategoryResult = await connection.query(getAllCategoryQuery);

    const getAllScoreResult = await connection.query(getParticualarScoreQuery, [
      patientId,
      reportDate,
    ]);

    const doctorIdResult = await connection.query(getDoctorData, [doctorId]);

    const doctor = doctorIdResult.rows[0];

    const getAllScoreVerify = await connection.query(getAllScoreVerifyQuery);

    const getStressAnswer = await connection.query(getStressAnswerQuery);

    const TreatmentDetails = await connection.query(getReportTreatmentDetails, [
      patientId,
      reportDate,
    ]);

    const rbs = await connection.query(getPastInvestigation, [
      patientId,
      "202",
      reportDate,
    ]);

    const fbs = await connection.query(getPastInvestigation, [
      patientId,
      "203",
      reportDate,
    ]);

    const ppbs = await connection.query(getPastInvestigation, [
      patientId,
      "204",
      reportDate,
    ]);

    const ogtt = await connection.query(getPastInvestigation, [
      patientId,
      "205",
      reportDate,
    ]);

    const gct = await connection.query(getPastInvestigation, [
      patientId,
      "206",
      reportDate,
    ]);

    const hba1c = await connection.query(getPastInvestigation, [
      patientId,
      "207",
      reportDate,
    ]);

    const fastingcholesterol = await connection.query(getPastInvestigation, [
      patientId,
      "213",
      reportDate,
    ]);

    const fastingtriglycerides = await connection.query(getPastInvestigation, [
      patientId,
      "214",
      reportDate,
    ]);

    const hdl = await connection.query(getPastInvestigation, [
      patientId,
      "215",
      reportDate,
    ]);

    const ldl = await connection.query(getPastInvestigation, [
      patientId,
      "216",
      reportDate,
    ]);

    const tchdl = await connection.query(getPastInvestigation, [
      patientId,
      "217",
      reportDate,
    ]);

    const kr = await connection.query(getPastInvestigation, [
      patientId,
      "225",
      reportDate,
    ]);

    const kl = await connection.query(getPastInvestigation, [
      patientId,
      "228",
      reportDate,
    ]);

    const echo = await connection.query(getPastInvestigation, [
      patientId,
      "231",
      reportDate,
    ]);

    const cortico = await connection.query(getPastInvestigation, [
      patientId,
      "234",
      reportDate,
    ]);

    const bloodurea = await connection.query(getPastInvestigation, [
      patientId,
      "218",
      reportDate,
    ]);

    const serum = await connection.query(getPastInvestigation, [
      patientId,
      "219",
      reportDate,
    ]);

    const egfr = await connection.query(getPastInvestigation, [
      patientId,
      "220",
      reportDate,
    ]);

    const urinesugar = await connection.query(getPastInvestigation, [
      patientId,
      "221",
      reportDate,
    ]);

    const urinealbumin = await connection.query(getPastInvestigation, [
      patientId,
      "222",
      reportDate,
    ]);

    const urineketones = await connection.query(getPastInvestigation, [
      patientId,
      "223",
      reportDate,
    ]);

    return {
      doctorDetail: {
        doctorName: doctor.doctorname,
        doctorId: doctor.doctorid,
        hospital: doctor.hospital,
        hospitalAddress: doctor.hospitaladdress + ", " + doctor.hospitalpincode,
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

const getValidateDuration = (questionId: any) => {
  switch (parseInt(questionId)) {
    case 94:
      return 1;
    case 6:
      return 1;
    case 8:
      return 14;
    case 9:
      return 14;
    case 10:
      return 14;
    case 11:
      return 14;
    case 12:
      return 14;
    case 13:
      return 14;
    case 43:
      return 14;
    case 51:
      return 14;
    case 202:
      return 1;
    case 203:
      return 1;
    case 204:
      return 1;
    case 205:
      return 1;
    case 206:
      return 1;
    case 207:
      return 1;
    case 213:
      return 1;
    case 214:
      return 1;
    case 215:
      return 1;
    case 216:
      return 1;
    case 217:
      return 1;
    case 218:
      return 1;
    case 219:
      return 1;
    case 220:
      return 1;
    case 221:
      return 1;
    case 222:
      return 1;
    case 223:
      return 1;
    case 224:
      return 1;
    case 237:
      return 1;
    case 238:
      return 1;
    case 22:
      return 14;
    case 23:
      return 14;
    case 24:
      return 14;
    default:
      return 0;
  }
};

function calculateDaysDifference(dateString: any, reportDate: any) {
  // Convert the given date string to a Date object
  const givenDate: any = new Date(dateString);

  // Get the current date and set time to midnight for accurate day difference
  const currentDate: any = new Date(reportDate);
  currentDate.setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds
  const diffInMs = givenDate - currentDate;

  // Convert milliseconds to days
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}

export const getCurrentReportPDFModel = async (
  patientId: any,
  reportDate: any,
  doctorId: any
) => {
  const connection = await DB();

  const createdAt = CurrentTime();

  console.log("====================================");
  console.log(reportDate, createdAt);
  console.log("====================================");

  try {
    const patientResult = await connection.query(getPatientDetail, [patientId]);

    const scoreResult = await connection.query(getAllScoreQuery, [
      patientId,
      reportDate,
    ]);

    const doctorResult = await connection.query(getDoctorDetailsReport, [
      doctorId,
    ]);

    const scoreVerifyResult = await connection.query(getScoreVerifyReport);

    const categoryResult = await connection.query(getAllCategoryFamilyHistory);

    const treatementDetails = await connection.query(getTreatementDetails, [
      patientId,
      createdAt,
    ]);

    const groupedData: Record<
      string,
      { category: string; doctorid: number }[]
    > = scoreResult.rows.reduce((acc, row: any) => {
      console.log(row.refQCategoryId);

      if (
        getValidateDuration(row.refQCategoryId) >
        -calculateDaysDifference(row.refPTcreatedDate, reportDate)
      ) {
        if (!acc[row.doctorname]) {
          acc[row.doctorname] = [];
        }
        acc[row.doctorname].push({
          category: row.refCategoryLabel,
          doctorid: row.doctorroleid,
        });
      }

      return acc; // Ensure the accumulator is always returned
    }, {});

    // Convert grouped data into the required string format
    const resultString = Object.entries(groupedData)
      .map(([doctorname, categories]) => {
        const doctorid =
          categories.length > 0 ? categories[0].doctorid : "Unknown"; // Get doctorid from first entry
        const categoryList = categories.map((c) => c.category).join(", ");
        return `[ ${categoryList} - ${doctorname} (${
          doctorid === 1 || doctorid === 4
            ? "Doctor"
            : doctorid === 2
            ? "Assistant"
            : doctorid === 3
            ? "Self"
            : null
        }) ]`;
      })
      .join(", ");

    console.log(resultString);

    return {
      status: true,
      doctorDetails: doctorResult.rows[0],
      patientDetails: patientResult.rows[0],
      scoreResult: scoreResult.rows,
      scoreVerifyResult: scoreVerifyResult.rows,
      generateDate: createdAt,
      categoryResult: categoryResult.rows,
      treatmentDetails: treatementDetails.rows,
      content: resultString,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const getPastReportPDFModel = async (
  patientId: any,
  refPMId: any,
  fromDate: any,
  toDate: any
) => {
  const connection = await DB();

  try {
    const patientResult = await connection.query(getPatientDetail, [patientId]);

    const scoreResult = await await connection.query(getParticualarScoreQuery, [
      patientId,
      fromDate,
      toDate === "0" ? fromDate.slice(0, 7) + "-31" : toDate,
    ]);

    const doctorResult = await connection.query(getDoctorDetailsReport, [
      refPMId,
    ]);

    const scoreVerifyResult = await connection.query(getScoreVerifyReport);

    const categoryResult = await connection.query(getAllCategoryFamilyHistory);

    const treatementDetails = await connection.query(
      getReportTreatmentDetails,
      [
        patientId,
        fromDate,
        toDate === "0" ? fromDate.slice(0, 7) + "-31" : toDate,
      ]
    );

    return {
      status: true,
      doctorDetails: doctorResult.rows[0],
      patientDetails: patientResult.rows[0],
      scoreResult: scoreResult.rows,
      scoreVerifyResult: scoreVerifyResult.rows,
      generateDate: fromDate,
      categoryResult: categoryResult.rows,
      treatmentDetails: treatementDetails.rows,
    };
  } catch (error) {
    console.error("Something went Wrong", error);
    throw error;
  } finally {
    await connection.end();
  }
};
