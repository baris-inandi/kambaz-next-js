import axios from "axios";

export interface LabAssignment {
  id?: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
  score: number;
}

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  editing?: boolean;
}

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;

export const fetchWelcome = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};

export const fetchAssignment = async () => {
  const response = await axios.get(ASSIGNMENT_API);
  return response.data;
};

export const fetchAssignmentTitle = async () => {
  const response = await axios.get(`${ASSIGNMENT_API}/title`);
  return response.data;
};

export const updateTitle = async (title: string) => {
  const response = await axios.put(`${ASSIGNMENT_API}/title`, { title });
  return response.data;
};

export const updateScore = async (score: number) => {
  const response = await axios.put(`${ASSIGNMENT_API}/score`, { score });
  return response.data;
};

export const updateCompleted = async (completed: boolean) => {
  const response = await axios.put(`${ASSIGNMENT_API}/completed`, {
    completed,
  });
  return response.data;
};

export const fetchTodos = async () => {
  const response = await axios.get(TODOS_API);
  return response.data;
};

export const fetchTodoById = async (id: string) => {
  const response = await axios.get(`${TODOS_API}/${id}`);
  return response.data;
};

export const fetchCompletedTodos = async () => {
  const response = await axios.get(`${TODOS_API}?completed=true`);
  return response.data;
};

export const createNewTodo = async () => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data;
};

export const postNewTodo = async (todo: Omit<Todo, "id">) => {
  const response = await axios.post(TODOS_API, todo);
  return response.data;
};

export const removeTodo = async (todo: Todo) => {
  const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
  return response.data;
};

export const deleteTodo = async (todo: Todo) => {
  const response = await axios.delete(`${TODOS_API}/${todo.id}`);
  return response.data;
};

export const updateTodo = async (todo: Todo) => {
  const response = await axios.put(`${TODOS_API}/${todo.id}`, todo);
  return response.data;
};
