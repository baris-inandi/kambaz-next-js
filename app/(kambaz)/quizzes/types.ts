export type QuizType =
  | "GRADED_QUIZ"
  | "PRACTICE_QUIZ"
  | "GRADED_SURVEY"
  | "UNGRADED_SURVEY";

export type AssignmentGroup = "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";

export type ShowCorrectAnswers = "NEVER" | "AFTER_SUBMISSION";

export type QuestionType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";

export interface QuizChoice {
  _id: string;
  text: string;
  isCorrect?: boolean;
}

export interface QuizBlank {
  _id: string;
  label: string;
  acceptedAnswers?: string[];
}

export interface BaseQuizQuestion {
  _id: string;
  type: QuestionType;
  title: string;
  points: number;
  questionHtml: string;
}

export interface MultipleChoiceQuestion extends BaseQuizQuestion {
  type: "MULTIPLE_CHOICE";
  choices: QuizChoice[];
  correctAnswer?: boolean;
  blanks: QuizBlank[];
}

export interface TrueFalseQuestion extends BaseQuizQuestion {
  type: "TRUE_FALSE";
  choices: QuizChoice[];
  correctAnswer: boolean;
  blanks: QuizBlank[];
}

export interface FillInBlankQuestion extends BaseQuizQuestion {
  type: "FILL_IN_BLANK";
  choices: QuizChoice[];
  correctAnswer?: boolean;
  blanks: QuizBlank[];
}

export type QuizQuestion =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillInBlankQuestion;

export interface QuizSummary {
  _id: string;
  title: string;
  quizType: QuizType;
  assignmentGroup: AssignmentGroup;
  published: boolean;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  questionCount: number;
  points: number;
  lastScore: number | null;
  lastMaxScore: number | null;
}

export interface QuizDetails extends QuizSummary {
  course: string;
  description: string;
  shuffleAnswers: boolean;
  hasTimeLimit: boolean;
  timeLimitMinutes: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: ShowCorrectAnswers;
  accessCode?: string;
  requiresAccessCode?: boolean;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  questions: QuizQuestion[];
  attemptsAllowed?: number;
  attemptsUsed?: number;
  attemptsRemaining?: number;
  canTake?: boolean;
  takeBlockedReason?: string | null;
  latestAttemptSummary?: {
    attemptNumber: number;
    score: number;
    maxScore: number;
    submittedAt: string;
  } | null;
}

export interface QuizBlankResponse {
  _id: string;
  label: string;
  response: string;
  acceptedAnswers?: string[];
  isCorrect: boolean;
}

export interface QuizAttemptAnswer {
  questionId: string;
  type: QuestionType;
  title: string;
  questionHtml: string;
  points: number;
  earnedPoints: number;
  isCorrect: boolean;
  choices: QuizChoice[];
  selectedChoiceId: string;
  correctChoiceId?: string;
  selectedTrueFalse?: boolean;
  correctTrueFalse?: boolean;
  blankResponses: QuizBlankResponse[];
}

export interface QuizAttempt {
  _id: string;
  quiz: string;
  course: string;
  student: string;
  attemptNumber: number;
  quizTitle: string;
  score: number;
  maxScore: number;
  submittedAt: string;
  answers: QuizAttemptAnswer[];
}

export interface QuizSubmissionAnswer {
  selectedChoiceId?: string;
  selectedTrueFalse?: boolean;
  blankResponses?: Record<string, string>;
}

export type QuizSubmission = Record<string, QuizSubmissionAnswer>;
