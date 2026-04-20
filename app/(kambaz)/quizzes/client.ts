import { QuizAttempt, QuizDetails, QuizSummary } from "./types";
import { axiosWithCredentials, HTTP_SERVER } from "../api";
const COURSES_API = `${HTTP_SERVER}/api/courses`;

const quizzesApi = (courseId: string) => `${COURSES_API}/${courseId}/quizzes`;

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get<QuizSummary[]>(
    quizzesApi(courseId),
  );
  return data;
};

export const createQuizForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post<QuizDetails>(
    quizzesApi(courseId),
  );
  return data;
};

export const findQuizById = async (courseId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.get<QuizDetails>(
    `${quizzesApi(courseId)}/${quizId}`,
  );
  return data;
};

export const updateQuiz = async (
  courseId: string,
  quizId: string,
  quiz: QuizDetails,
) => {
  const { data } = await axiosWithCredentials.put<QuizDetails>(
    `${quizzesApi(courseId)}/${quizId}`,
    quiz,
  );
  return data;
};

export const deleteQuiz = async (courseId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${quizzesApi(courseId)}/${quizId}`,
  );
  return data;
};

export const publishQuiz = async (courseId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.post<QuizDetails>(
    `${quizzesApi(courseId)}/${quizId}/publish`,
  );
  return data;
};

export const unpublishQuiz = async (courseId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.post<QuizDetails>(
    `${quizzesApi(courseId)}/${quizId}/unpublish`,
  );
  return data;
};

export const findLatestAttempt = async (courseId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.get<QuizAttempt>(
    `${quizzesApi(courseId)}/${quizId}/attempts/latest`,
  );
  return data;
};

export const validateQuizAccessCode = async (
  courseId: string,
  quizId: string,
  accessCode: string,
) => {
  const { data } = await axiosWithCredentials.post(
    `${quizzesApi(courseId)}/${quizId}/access`,
    { accessCode },
  );
  return data;
};

export const submitQuizAttempt = async (
  courseId: string,
  quizId: string,
  payload: {
    accessCode?: string;
    answers: Record<string, unknown>;
  },
) => {
  const { data } = await axiosWithCredentials.post<QuizAttempt>(
    `${quizzesApi(courseId)}/${quizId}/attempts`,
    payload,
  );
  return data;
};
