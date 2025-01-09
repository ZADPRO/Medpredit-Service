export const SingleValues = (
  answers: any,
  previousValue: any,
  currentValue: any
) => {
  const data = answers.find((item) => item.questionId === previousValue);
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  let value = data.answer;

  value.push({
    date: isoDate,
    number: answers.find((item) => item.questionId === currentValue).answer,
    flag: "db",
  });

  return {
    score: [answers.find((item) => item.questionId === currentValue).answer],
    investigationData: value,
  };
};
