export const SingleSelectValues = (
  answers: any,
  mappedResult: any,
  previousValue: any,
  currentValue: any
) => {
  const data = answers.find((item) => item.questionId === previousValue);
  let value = data.answer;

  let answer = answers.find((item) => item.questionId === currentValue).answer;

  return {
    score: [
      mappedResult.flat().find((option) => option.refOptionId === answer)
        ?.refOptionLabel,
    ],
    investigationData: value,
  };
};
