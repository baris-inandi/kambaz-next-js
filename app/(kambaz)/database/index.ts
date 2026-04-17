import assignmentsData from "./assignments.json";
import coursesData from "./courses.json";
import enrollmentsData from "./enrollments.json";
import modulesData from "./modules.json";
import usersData from "./users.json";

export type UserRole = "ADMIN" | "FACULTY" | "STUDENT" | "TA";

export interface Course {
  _id: string;
  number: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
}

export interface Lesson {
  _id: string;
  name: string;
}

export interface Module {
  _id: string;
  course: string;
  name: string;
  lessons: Lesson[];
  editing?: boolean;
}

export interface Assignment {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  assignmentGroup: string;
  displayGradeAs: string;
  submissionType: string;
  assignTo: string;
  availableFrom: string;
  dueDate: string;
  availableUntil: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  username: string;
  password: string;
  email: string;
  dob: string;
  section: string;
  role: UserRole;
  lastActivity: string;
  totalActivity: string;
}

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

export const courses = coursesData as Course[];
export const modules = modulesData as Module[];
export const assignments = assignmentsData as Assignment[];
export const users = usersData as User[];
export const enrollments = enrollmentsData as Enrollment[];
