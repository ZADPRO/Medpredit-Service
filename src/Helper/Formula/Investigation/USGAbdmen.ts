export const USGAbdmen = (answers: any, mappedResult: any) => {
  answers.sort((a, b) => a.questionId - b.questionId);

  let kidneyright = "";
  let krvertical = "";
  let krhorizontal = "";
  let krpreviousvalue = [];

  let kidneyleft = "";
  let klvertical = "";
  let klhorizontal = "";
  let klpreviousvalue = [];

  let echogenicity = "";
  let echoCurrentVal = "";
  let echoInwhichside = "";
  let echopreviousvalue = [];

  let cortico = "";
  let corticoVal = "";
  let corticoInWhichside = "";
  let corticopreviousvalue = [];

  //Kidney Right
  let kidneyrightans = answers.find((element) => element.questionId === 325)
    ? answers.find((element) => element.questionId === 325)
    : 0;

  kidneyright = mappedResult
    .flat()
    .find(
      (option) => option.refOptionId === kidneyrightans.answer
    )?.refOptionLabel;

  if (kidneyright === "Yes") {
    krvertical = answers.find((element) => element.questionId === 328)
      ? answers.find((element) => element.questionId === 328).answer
      : "";

    krhorizontal = answers.find((element) => element.questionId === 329)
      ? answers.find((element) => element.questionId === 329).answer
      : "";

    krpreviousvalue = answers.find((element) => element.questionId === 330)
      ? answers.find((element) => element.questionId === 330)
      : "";
  }

  //Kidney Left
  let kidneyleftans = answers.find((element) => element.questionId === 331)
    ? answers.find((element) => element.questionId === 331)
    : 0;

  kidneyleft = mappedResult
    .flat()
    .find(
      (option) => option.refOptionId === kidneyleftans.answer
    )?.refOptionLabel;

  if (kidneyleft === "Yes") {
    klvertical = answers.find((element) => element.questionId === 334)
      ? answers.find((element) => element.questionId === 334).answer
      : "";

    klhorizontal = answers.find((element) => element.questionId === 335)
      ? answers.find((element) => element.questionId === 335).answer
      : "";

    klpreviousvalue = answers.find((element) => element.questionId === 336)
      ? answers.find((element) => element.questionId === 336)
      : "";
  }

  //Echogenicity
  let echogenicityans = answers.find((element) => element.questionId === 337)
    ? answers.find((element) => element.questionId === 337)
    : 0;

  echogenicity = mappedResult
    .flat()
    .find(
      (option) => option.refOptionId === echogenicityans.answer
    )?.refOptionLabel;

  if (echogenicity === "Yes") {
    let echoCurrentValans = answers.find(
      (element) => element.questionId === 338
    )
      ? answers.find((element) => element.questionId === 338)
      : 0;

    echoCurrentVal = mappedResult
      .flat()
      .find(
        (option) => option.refOptionId === echoCurrentValans.answer
      )?.refOptionLabel;

    if (echoCurrentVal === "Increased") {
      let echoInwhichsideans = answers.find(
        (element) => element.questionId === 339
      )
        ? answers.find((element) => element.questionId === 339)
        : 0;

      echoInwhichside =
        mappedResult
          .flat()
          .find((option) => option.refOptionId === echoInwhichsideans.answer)
          ?.refOptionLabel || "";
    }

    echopreviousvalue = answers.find((element) => element.questionId === 340)
      ? answers.find((element) => element.questionId === 340)
      : 0;
  }

  //Cortico Medulary Differentiation
  let corticoans = answers.find((element) => element.questionId === 341)
    ? answers.find((element) => element.questionId === 341)
    : 0;

  cortico = mappedResult
    .flat()
    .find((option) => option.refOptionId === corticoans.answer)?.refOptionLabel;

  if (cortico === "Yes") {
    let corticoValans = answers.find((element) => element.questionId === 342)
      ? answers.find((element) => element.questionId === 342)
      : 0;

    corticoVal = mappedResult
      .flat()
      .find(
        (option) => option.refOptionId === corticoValans.answer
      )?.refOptionLabel;

    if (corticoVal === "Distorted") {
      let corticoInWhichsideans = answers.find(
        (element) => element.questionId === 343
      )
        ? answers.find((element) => element.questionId === 343)
        : 0;

      corticoInWhichside = mappedResult
        .flat()
        .find(
          (option) => option.refOptionId === corticoInWhichsideans.answer
        )?.refOptionLabel;
    } else if (corticoVal === "Poorly Differentiated") {
      let corticoInWhichsideans = answers.find(
        (element) => element.questionId === 344
      )
        ? answers.find((element) => element.questionId === 344)
        : 0;

      corticoInWhichside = mappedResult
        .flat()
        .find(
          (option) => option.refOptionId === corticoInWhichsideans.answer
        )?.refOptionLabel;
    }

    corticopreviousvalue = answers.find((element) => element.questionId === 345)
      ? answers.find((element) => element.questionId === 345)
      : 0;
  }

  return {
    score: [
      "0",
      kidneyright,
      krvertical,
      krhorizontal,
      kidneyleft,
      klvertical,
      klhorizontal,
      echogenicity,
      echoCurrentVal,
      echoInwhichside,
      cortico,
      corticoVal,
      corticoInWhichside,
    ],
    investigationData: [
      krpreviousvalue,
      klpreviousvalue,
      echopreviousvalue,
      corticopreviousvalue,
    ],
    category: [""],
  };
};
