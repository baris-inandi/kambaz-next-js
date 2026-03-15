"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export interface ContextTodo {
  id: string;
  title: string;
}

interface TodosContextValue {
  todos: ContextTodo[];
  todo: ContextTodo;
  setTodo: (todo: ContextTodo) => void;
  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
}

const TodosContext = createContext<TodosContextValue | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<ContextTodo[]>([
    { id: "1", title: "Learn Context" },
    { id: "2", title: "Share state" },
  ]);
  const [todo, setTodo] = useState<ContextTodo>({
    id: "-1",
    title: "Build Todo App",
  });

  const addTodo = () => {
    setTodos([...todos, { ...todo, id: Date.now().toString() }]);
    setTodo({ id: "-1", title: "" });
  };

  const updateTodo = () => {
    setTodos(todos.map((item) => (item.id === todo.id ? todo : item)));
    setTodo({ id: "-1", title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <TodosContext.Provider
      value={{ todos, todo, setTodo, addTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("useTodos must be used within TodosProvider");
  }

  return context;
}
