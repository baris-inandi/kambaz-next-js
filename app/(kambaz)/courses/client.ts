import { Course, Module } from "../database";
import { axiosWithCredentials, HTTP_SERVER } from "../api";
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const findCourseById = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}`);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`,
  );
  return data;
};

export const createCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course,
  );
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course,
  );
  return data;
};

export const deleteCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}`,
  );
  return data;
};

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses/${courseId}`,
  );
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/current/courses/${courseId}`,
  );
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`,
  );
  return data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: Omit<Module, "_id">,
) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module,
  );
  return data;
};

export const updateModule = async (courseId: string, module: Module) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module,
  );
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`,
  );
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/users`,
  );
  return data;
};
