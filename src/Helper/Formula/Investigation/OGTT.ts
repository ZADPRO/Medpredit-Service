export const OGTT = (answers: any) => {
  const data = answers.find((item) => item.questionId === 281);
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  let value = data.answer;

  value.push({
    date: isoDate,
    number: answers.find((item) => item.questionId === 278).answer,
    flag: "db",
  });

  return {
    score: [
      answers.find((item) => item.questionId === 278).answer,
      answers.find((item) => item.questionId === 279).answer,
      answers.find((item) => item.questionId === 280).answer,
    ],
    investigationData: value,
  };
};
