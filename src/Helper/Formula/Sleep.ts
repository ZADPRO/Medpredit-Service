const logger = require("../../Helper/Logger");

function timeDifference(payload) {
  const { startTime, endTime, timeToSubtract } = payload;

  // Helper function to convert time (HH:MM AM/PM) to minutes
  function timeToMinutes(time) {
    const [timeString, period] = time.split(" ");
    let [hours, minutes] = timeString.split(":").map(Number);

    if (period === "pm" && hours !== 12) hours += 12;
    if (period === "am" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  // Convert both start and end time to minutes
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  // Calculate difference in minutes
  let diffMinutes = endMinutes - startMinutes;

  // If the end time is earlier in the day (crosses midnight)
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60; // Add 24 hours worth of minutes
  }

  // Subtract the provided minutes
  diffMinutes -= timeToSubtract;

  // Convert the result back to hours and minutes
  const resultHours = Math.floor(diffMinutes / 60);
  const resultMinutes = diffMinutes % 60;

  return {
    hours: resultHours,
    minutes: resultMinutes,
  };
}

export const Sleep = (answers: any, mappedResult: any) => {
  answers.sort((a, b) => a.questionId - b.questionId);

  let comp1 = 0;
  let comp2 = 0;
  let comp3 = 0;
  let comp4 = 0;
  let comp5 = 0;
  let comp6 = 0;
  let comp7 = 0;
  let global = 0;

  const q9 = answers.find((element) => element.questionId === 95)
    ? answers.find((element) => element.questionId === 95)
    : 0;

  const q9ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q9.answer);

  const q1 = answers.find((element) => element.questionId === 85)
    ? answers.find((element) => element.questionId === 85)
    : 0;

  const q3 = answers.find((element) => element.questionId === 87)
    ? answers.find((element) => element.questionId === 87)
    : 0;

  const q2 = answers.find((element) => element.questionId === 86)
    ? answers.find((element) => element.questionId === 86)
    : 0;

  const result = timeDifference({
    startTime: q1.answer,
    endTime: q3.answer,
    timeToSubtract: q2.answer,
  });

  const q4 = result.hours + ":" + result.minutes;

  const q5_1 = answers.find((element) => element.questionId === 90)
    ? answers.find((element) => element.questionId === 90)
    : 0;

  const q5_1ans = mappedResult
    .flat()
    .find((option) => option.refOptionId === q5_1.answer);

  const q5_2 = answers.find((element) => element.questionId === 91)
    ? answers.find((element) => element.questionId === 91)
    : 0;

  const q5_2ans =
    mappedResult.flat().find((option) => option.refOptionId === q5_2.answer)
      ?.refOptionMark || 0;

  const q5_3 = answers.find((element) => element.questionId === 92)
    ? answers.find((element) => element.questionId === 92)
    : 0;

  const q5_3ans =
    mappedResult.flat().find((option) => option.refOptionId === q5_3.answer)
      ?.refOptionMark || 0;

  const q5_4 = answers.find((element) => element.questionId === 93)
    ? answers.find((element) => element.questionId === 93)
    : 0;

  const q5_4ans =
    mappedResult.flat().find((option) => option.refOptionId === q5_4.answer)
      ?.refOptionMark || 0;

  const q5_5 = answers.find((element) => element.questionId === 94)
    ? answers.find((element) => element.questionId === 94)
    : 0;

  const q5_5ans =
    mappedResult.flat().find((option) => option.refOptionId === q5_5.answer)
      ?.refOptionMark || 0;

  const q5_6 = answers.find((element) => element.questionId === 95)
    ? answers.find((element) => element.questionId === 95)
    : 0;

  const q5_6ans =
    mappedResult.flat().find((option) => option.refOptionId === q5_6.answer)
      ?.refOptionMark || 0;

  const q5_7 = answers.find((element) => element.questionId === 96)
    ? answers.find((element) => element.questionId === 96)
    : 0;

  const q5_7ans =
    mappedResult.flat().find((option) => option.refOptionId === q5_7.answer)
      ?.refOptionMark || 0;

  const q5_8 = answers.find((element) => element.questionId === 97)
    ? answers.find((element) => element.questionId === 97)
    : 0;

  const q5_8ans =
    mappedResult.flat().find((option) => option.refOptionId === q5_8.answer)
      ?.refOptionMark || 0;

  const q5_9 = answers.find((element) => element.questionId === 98)
    ? answers.find((element) => element.questionId === 98)
    : 0;

  const q5_9ans =
    mappedResult.flat().find((option) => option.refOptionId === q5_9.answer)
      ?.refOptionMark || 0;

  const q5_10 = answers.find((element) => element.questionId === 101)
    ? answers.find((element) => element.questionId === 101)
    : 0;

  const q5_10ans =
    mappedResult.flat().find((option) => option.refOptionId === q5_10.answer)
      ?.refOptionMark || 0;

  const q6 = answers.find((element) => element.questionId === 102)
    ? answers.find((element) => element.questionId === 102)
    : 0;

  const q6ans =
    mappedResult.flat().find((option) => option.refOptionId === q6.answer)
      ?.refOptionMark || 0;

  const q7 = answers.find((element) => element.questionId === 103)
    ? answers.find((element) => element.questionId === 103)
    : 0;

  const q7ans =
    mappedResult.flat().find((option) => option.refOptionId === q7.answer)
      ?.refOptionMark || 0;

  const q8 = answers.find((element) => element.questionId === 104)
    ? answers.find((element) => element.questionId === 104)
    : 0;

  const q8ans =
    mappedResult.flat().find((option) => option.refOptionId === q8.answer)
      ?.refOptionMark || 0;

  //Component 1

  comp1 = parseInt(q9ans ? q9ans.refOptionMark : 0);

  //Component 2

  let a = 0;
  let b = 0;

  if (q2.answer <= 15) a = 0;
  else if (q2.answer >= 16 && q2.answer <= 30) a = 1;
  else if (q2.answer >= 31 && q2.answer <= 60) a = 2;
  else if (q2.answer >= 61) a = 3;

  b = parseInt(q5_1ans ? q5_1ans.refOptionMark : 0);

  comp2 = a + b;

  //Component 3
  let hourslept = parseInt(q4.split(":")[0]) + parseInt(q4.split(":")[1]) / 60;

  if (hourslept > 7) comp3 = 0;
  else if (hourslept > 6 && hourslept <= 7) comp3 = 1;
  else if (hourslept > 5 && hourslept <= 6) comp3 = 2;
  else if (hourslept <= 5) comp3 = 3;

  //Component 4

  let hoursbed = timeDifference({
    startTime: q1.answer,
    endTime: q3.answer,
    timeToSubtract: 0,
  });
  result.hours + ":" + result.minutes;

  let hoursbedResult = hoursbed.hours + hoursbed.minutes / 60;

  comp4 = (hourslept / hoursbedResult) * 100;

  const sleepefficiency = (hourslept / hoursbedResult) * 100;

  if (sleepefficiency >= 85) comp4 = 0;
  else if (sleepefficiency >= 75 && sleepefficiency <= 84) comp4 = 1;
  else if (sleepefficiency >= 65 && sleepefficiency <= 74) comp4 = 2;
  else if (sleepefficiency <= 64) comp4 = 3;

  //Component 5

  const comval =
    parseInt(q5_2ans) +
    parseInt(q5_3ans) +
    parseInt(q5_4ans) +
    parseInt(q5_5ans) +
    parseInt(q5_6ans) +
    parseInt(q5_7ans) +
    parseInt(q5_8ans) +
    parseInt(q5_9ans) +
    parseInt(q5_10ans);

  if (comval === 0) comp5 = 0;
  else if (comval >= 1 && comval <= 9) comp5 = 1;
  else if (comval >= 10 && comval <= 18) comp5 = 2;
  else if (comval >= 19 && comval <= 27) comp5 = 3;

  //Component 6
  comp6 = parseInt(q6ans);

  //Component 7
  const com7val = parseInt(q7ans) + parseInt(q8ans);

  if (com7val === 0) comp7 = 0;
  else if (com7val >= 1 && com7val <= 2) comp7 = 1;
  else if (com7val >= 3 && com7val <= 4) comp7 = 2;
  else if (com7val >= 5 && com7val <= 6) comp7 = 3;

  global = comp1 + comp2 + comp3 + comp4 + comp5 + comp6 + comp7;

  console.log(
    global,
    comp1,
    comp2,
    comp3,
    parseFloat(sleepefficiency.toFixed(2)),
    comp5,
    comp6,
    comp7
  );

  logger.info(
    `${global} ${comp1} ${comp2} ${comp3} ${parseFloat(
      sleepefficiency.toFixed(2)
    )} ${comp5} ${comp6} ${comp7}`
  );

  return [
    global,
    comp1,
    comp2,
    comp3,
    parseFloat(sleepefficiency.toFixed(2)),
    comp5,
    comp6,
    comp7,
  ];
};
