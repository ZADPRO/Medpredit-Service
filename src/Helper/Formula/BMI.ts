const logger = require("../../Helper/Logger");

export const BMI = (answers: any) => {
  answers.sort((a, b) => a.questionId - b.questionId);

  answers.forEach((element) => {
    logger.info(
      `answers (${element.answer}), questionId (${element.questionId})`
    );
  });

  console.log(answers);

  const height = parseFloat(answers[0].answer);
  const weight = parseFloat(answers[1].answer);
  const waistcircumference = parseFloat(answers[2].answer);
  const hipcircumference = parseFloat(answers[3].answer);

  const bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);

  const ratio = (waistcircumference / hipcircumference).toFixed(2);

  logger.info(
    `bmi (${bmi}), height (${height}), weight (${weight}), ratio(${ratio})`
  );

  return [bmi, height, weight, ratio];
};
