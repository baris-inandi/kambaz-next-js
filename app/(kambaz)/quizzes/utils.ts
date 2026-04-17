import {
  FillInBlankQuestion,
  MultipleChoiceQuestion,
  QuizAttempt,
  QuizDetails,
  QuizQuestion,
  QuizSubmission,
  QuestionType,
  TrueFalseQuestion,
} from "./types";

const normalize = (value: string) => value.trim().toLowerCase();

export const calculateQuizPoints = (quiz: Pick<QuizDetails, "questions">) =>
  quiz.questions.reduce(
    (total, question) => total + Math.max(Number(question.points) || 0, 0),
    0,
  );

export const formatDate = (value: string) => {
  if (!value) {
    return "";
  }

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatTimestamp = (value: string) =>
  new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export const getAvailabilityLabel = (quiz: {
  availableFrom: string;
  availableUntil: string;
}) => {
  const now = new Date();
  const availableFrom = quiz.availableFrom
    ? new Date(`${quiz.availableFrom}T00:00:00`)
    : null;
  const availableUntil = quiz.availableUntil
    ? new Date(`${quiz.availableUntil}T23:59:59`)
    : null;

  if (availableFrom && now < availableFrom) {
    return `Not available until ${formatDate(quiz.availableFrom)}`;
  }

  if (availableUntil && now > availableUntil) {
    return "Closed";
  }

  return "Available";
};

export const createQuestion = (
  type: QuestionType = "MULTIPLE_CHOICE",
): QuizQuestion => {
  const base = {
    _id: crypto.randomUUID(),
    type,
    title: "New Question",
    points: 0,
    questionHtml: "",
    choices: [],
    blanks: [],
  };

  if (type === "TRUE_FALSE") {
    return {
      ...base,
      type,
      correctAnswer: true,
    } as TrueFalseQuestion;
  }

  if (type === "FILL_IN_BLANK") {
    return {
      ...base,
      type,
      blanks: [
        {
          _id: crypto.randomUUID(),
          label: "Blank 1",
          acceptedAnswers: [""],
        },
      ],
    } as FillInBlankQuestion;
  }

  return {
    ...base,
    type,
    choices: [
      { _id: crypto.randomUUID(), text: "", isCorrect: true },
      { _id: crypto.randomUUID(), text: "", isCorrect: false },
    ],
  } as MultipleChoiceQuestion;
};

const shuffle = <T>(items: T[]) => {
  const nextItems = [...items];
  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[swapIndex]] = [
      nextItems[swapIndex],
      nextItems[index],
    ];
  }
  return nextItems;
};

export const prepareQuizForRun = (quiz: QuizDetails) => ({
  ...quiz,
  questions: quiz.questions.map((question) =>
    question.type === "MULTIPLE_CHOICE" && quiz.shuffleAnswers
      ? { ...question, choices: shuffle(question.choices) }
      : question,
  ),
});

export const gradeQuizLocally = (
  quiz: QuizDetails,
  submission: QuizSubmission,
): QuizAttempt => {
  const answers = quiz.questions.map((question) => {
    const response = submission[question._id] ?? {};
    const points = Math.max(Number(question.points) || 0, 0);

    if (question.type === "TRUE_FALSE") {
      const selectedTrueFalse =
        response.selectedTrueFalse === true ||
        response.selectedTrueFalse === false
          ? response.selectedTrueFalse
          : null;
      const isCorrect =
        selectedTrueFalse !== null &&
        selectedTrueFalse === Boolean(question.correctAnswer);
      return {
        questionId: question._id,
        type: question.type,
        title: question.title,
        questionHtml: question.questionHtml,
        points,
        earnedPoints: isCorrect ? points : 0,
        isCorrect,
        choices: [],
        selectedChoiceId: "",
        selectedTrueFalse: selectedTrueFalse ?? false,
        correctTrueFalse: Boolean(question.correctAnswer),
        blankResponses: [],
      };
    }

    if (question.type === "FILL_IN_BLANK") {
      const blankResponses = question.blanks.map((blank) => {
        const answer = response.blankResponses?.[blank._id] ?? "";
        const acceptedAnswers = blank.acceptedAnswers ?? [];
        const isCorrect = acceptedAnswers.some(
          (acceptedAnswer) => normalize(acceptedAnswer) === normalize(answer),
        );
        return {
          _id: blank._id,
          label: blank.label,
          response: answer,
          acceptedAnswers,
          isCorrect,
        };
      });
      const isCorrect =
        blankResponses.length > 0 &&
        blankResponses.every((blank) => blank.isCorrect);
      return {
        questionId: question._id,
        type: question.type,
        title: question.title,
        questionHtml: question.questionHtml,
        points,
        earnedPoints: isCorrect ? points : 0,
        isCorrect,
        choices: [],
        selectedChoiceId: "",
        blankResponses,
      };
    }

    const correctChoice =
      question.choices.find((choice) => choice.isCorrect) ??
      question.choices[0];
    const selectedChoiceId = response.selectedChoiceId ?? "";
    const isCorrect = selectedChoiceId === correctChoice?._id;
    return {
      questionId: question._id,
      type: question.type,
      title: question.title,
      questionHtml: question.questionHtml,
      points,
      earnedPoints: isCorrect ? points : 0,
      isCorrect,
      choices: question.choices,
      selectedChoiceId,
      correctChoiceId: correctChoice?._id ?? "",
      blankResponses: [],
    };
  });

  return {
    _id: "preview",
    quiz: quiz._id,
    course: quiz.course ?? "",
    student: "preview",
    attemptNumber: 1,
    quizTitle: quiz.title,
    score: answers.reduce((total, answer) => total + answer.earnedPoints, 0),
    maxScore: calculateQuizPoints(quiz),
    submittedAt: new Date().toISOString(),
    answers,
  };
};
